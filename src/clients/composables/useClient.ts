import { computed, ref, watch } from "vue";
import type { Client, Datum } from "../interfaces/client";
import { useMutation, useQuery , useQueryClient} from "@tanstack/vue-query";
import clientsApi from "@/api/Clients-api";


const getClient = async ( id : number ):Promise<Datum>=>{
    //await new Promise( resolve => setTimeout(resolve,3000)) 
    const { data } = await clientsApi.get<Datum>( `/clients/${ id }`)
    return data
}

const useClient = ( id:number)=>{
    const client = ref<Datum>();
    const queryClient = useQueryClient()

    const { isLoading , data, isError } = useQuery( { queryKey : ['client', id ] , queryFn :()=> getClient(id),staleTime : 1000 * 2 , retry: false })

    const updateClient = async( client:Datum):Promise<Datum> =>{
        // await new Promise( resolve => setTimeout(resolve,2000)) 
        const { data } =  await clientsApi.patch<Datum>(`/clients/${ client.id }` , client );
        //const queries = queryClient.getQueryCache().clear();
        const queries = queryClient.getQueryCache().findAll({queryKey:['clients?page='],exact: false })
        queries.forEach( query => query.invalidate());  // invalida las queries
        return data;
    }

    const clientMutation = useMutation({ mutationFn : updateClient , onSuccess : ( data:Datum )=>{console.log('Ok')} })
    // Cache time en 0 para siempre volver a hacer la peticion

    watch(data, ()=>{
        if(data.value)
            client.value = { ...data.value };  // porque el data.value es only read entonces toca desetructurarlo envez de sobrescribirlo
    },{ immediate: true })

    watch(clientMutation.isSuccess , ()=>{
        setTimeout(()=>{
            clientMutation.reset(); //queda en estado Inicial
        },2000)
    })
   
    return {
        client, 
        isError,
        isLoading,
        clientMutation,
        updateClient : clientMutation.mutate,
        isUpdateSuccess : computed(()=> clientMutation.isSuccess.value),
        isUpdateLoading : computed(()=> clientMutation.isPending.value )
   }
}

export default useClient;
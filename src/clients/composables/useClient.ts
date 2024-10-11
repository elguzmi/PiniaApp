import { ref, watch } from "vue";
import type { Client, Datum } from "../interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import clientsApi from "@/api/Clients-api";


const getClient = async ( id : number ):Promise<Datum>=>{
    //await new Promise( resolve => setTimeout(resolve,3000)) 
    const { data } = await clientsApi.get<Datum>( `/clients/${ id }`)
    return data
}

const useClient = ( id:number)=>{
    const client = ref<Datum>();

    const { isLoading , data } = useQuery( { queryKey : ['client', id ] , queryFn :()=> getClient(id),
         staleTime : 1000 * 2
    })

    // Cache time en 0 para siempre volver a hacer la peticion

    watch(data, ()=>{
        if(data.value)
            client.value = { ...data.value };  // porque el data.value es only read entonces toca desetructurarlo envez de sobrescribirlo
    },{ immediate: true })
   
    return {
        isLoading,
        client
   }
}

export default useClient;
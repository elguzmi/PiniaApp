import { useQuery } from "@tanstack/vue-query";
import type { Client, Datum } from "@/clients/interfaces/client";
import clientsApi from "@/api/Clients-api";
import { useClientsStore } from "@/store/clients";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";

const getClients = async ( page : number ):Promise<Client>=>{
    
    await new Promise( resolve => setTimeout(resolve,3000)) 

    const { data } = await clientsApi.get<Client>( `/clients?_page=${ page }`)
    return data
}

const UseClients = ()=>{
    // el composable es el que interactua con el store
    const clientStore = useClientsStore();
    const { clients , currentPage , totalPages } = storeToRefs( clientStore );
    
    // Use query tiene en cache la data , pero igual hace la peticion para actualizarla
    const { isLoading , data } = useQuery( { queryKey : ['clients?page=', currentPage ] , queryFn :()=> getClients(currentPage.value),
        staleTime : 1000 * 6
    } )

    // stale time significa que no volver a hcaer la peticion basada en los segundos



    // , staleTime : 1000 * 60 
    //     ,select(data) {console.log('Nuevos Clientes Cargados') 
    //         clientStore.setClients( data );
    // },

    // cuando cambie la data se va a actualizar
    watch(data , clients =>{
        if(clients){
            console.log("🚀 ~ UseClients ~ guardando en pinia store:", totalPages.value)
            clientStore.setClients(clients)
            
        }
    })

    return {
        // Properties
        clients,
        currentPage, 
        isLoading ,
        totalPages,

        //METHODS
        getPage( page : number){
            clientStore.setPage( page )
        },

        //Getters [1,2,3,4,5]
        totalPageNumber :computed(
            ()=> [ ... new Array(totalPages.value)].map( (value, index) => index +1)
        ),
    }
} 

export default UseClients; 
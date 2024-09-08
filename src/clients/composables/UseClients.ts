import { useQuery } from "@tanstack/vue-query";
import type { Client } from "@/clients/interfaces/client";
import clientsApi from "@/api/Clients-api";
import { useClientsStore } from "@/store/clients";
import { storeToRefs } from "pinia";

const getClients = async ():Promise<Client[]>=>{
    console.log(import.meta.env)
    const { data } = await clientsApi.get<Client[]>('/clients?_page=1')
    return data
}
const UseClients = ()=>{
    const clientStore = useClientsStore();
    const { clients , currentPage , totalPages } = storeToRefs( clientStore );
    
    
    const {isLoading } = useQuery( { queryKey : ['clients?page=', 1] , queryFn : getClients , staleTime : 1000 * 60 ,select(data) {
        console.log('Nuevos Clientes Cargados')
        clientStore.setClients( data );
    },})

    return {
        // Properties
        isLoading , clients 
    }
} 

export default UseClients;
<script setup lang="ts">
import LoadingModal from '@/shared/components/LoadingModal.vue';
import useClient from '../composables/useClient';
import { useRoute } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { Datum } from '../interfaces/client';
import clientsApi from '@/api/Clients-api';
import { watch } from 'vue';

const route = useRoute();
const queryClient = useQueryClient()
console.log("🚀 ~ queryClient:", queryClient)

const { client, isLoading } = useClient(+route.params.id); // colocar un + atras los convierte en numero

const updateClient = async( client:Datum):Promise<Datum> =>{
    await new Promise( resolve => setTimeout(resolve,2000)) 

    const { data } =  await clientsApi.patch<Datum>(`/clients/${ client.id }` , client );
    //const queries = queryClient.getQueryCache().clear();
    const queries = queryClient.getQueryCache().findAll({queryKey:['clients?page='],exact: false })
    queries.forEach( query => query.reset());
    console.log("🚀 ~ updateClient ~ queries:", queries)
    return data;
}

const clientMutation = useMutation({ mutationFn : updateClient , onSuccess : ( data:Datum )=>{console.log('Ok')} })

watch(clientMutation.isSuccess , ()=>{
    setTimeout(()=>{
        clientMutation.reset(); //queda en estado Inicial
    },2000)
})

</script>
<template>
    <h3 v-if="clientMutation.isPending.value">Guardando...</h3>
    <h3 v-if="clientMutation.isSuccess.value">Guardado</h3>
    <LoadingModal v-if="isLoading" />

    <div v-if="client" >
        <h1>{{ client.name }}</h1>
        <form @submit.prevent="clientMutation.mutate(client!)">
            <input type="text" placeholder="nombre cliente" v-model="client.name">
            <br>
            <input type="text" placeholder="Direccion" v-model="client.address">
            <br>
            <input :disabled="clientMutation.isPending.value" type="submit" value="Guardar">
        </form>
    </div>

    <code>
        {{ client }}
    </code>
</template>



<style scoped>
input{
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
}

</style>
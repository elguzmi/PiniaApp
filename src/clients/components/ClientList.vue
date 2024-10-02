<script setup lang="ts">
//import UseClients from '../composables/UseClients';
// va renderizar la lista de clientes que tenemos en el store
// Pensar en composables function
// const  { clients } = UseClients()
import type { Client } from './../interfaces/client'


interface Props {
    clients: Client
}

defineProps<Props>();


</script>

<template>
    <ul>
        <li v-for="client of $props.clients?.data" :key="client.id" >
            <router-link :to="{ name : 'client-id' , params:{ id: client.id } }"> {{ client.name }}</router-link>
        </li>
        <!-- 
        <li>
            <router-link :to="{ name : 'client-id' , params:{ id:2 } }"> Cliente 2 </router-link>
        </li> -->
    </ul>
</template>

<style scoped>

</style>
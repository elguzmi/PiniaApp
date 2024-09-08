<script setup lang="ts">
import UseClients from '../composables/UseClients';

// va renderizar la lista de clientes que tenemos en el store
// Pensar en composables function

const  { clients } = UseClients()

</script>

<template>
    <ul>
        <li>
            <router-link :to="{ name : 'client-id' , params:{ id:1 } }"> Cliente 1 </router-link>
        </li>
        <li>
            <router-link :to="{ name : 'client-id' , params:{ id:2 } }"> Cliente 2 </router-link>
        </li>
    </ul>
</template>

<style scoped>

</style>
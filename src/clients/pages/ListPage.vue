<script setup lang="ts">
import UseClients from '@/clients/composables/UseClients';

UseClients();


</script>

<template>
    <div>
        <h1>Listado de clientes</h1>

        <!-- Client List -->
        <ClientList />


        <!-- PaginationNumber    - paginacion -->

        <!-- Loading Modal   -->

    </div>
</template>



<style scoped>
</style>
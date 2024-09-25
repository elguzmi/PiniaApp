<script setup lang="ts">
import UseClients from '@/clients/composables/UseClients';
import ClientList from '@/clients/components/ClientList.vue';
import PaginationNumber from '../components/PaginationNumber.vue';
import LoadingModal from '@/shared/components/LoadingModal.vue';

const { isLoading } = UseClients();


</script>

<template>
    <div>
        <h1>Listado de clientes</h1>

        <!-- Client List -->
        <ClientList />

        <!-- PaginationNumber    - paginacion -->
        <PaginationNumber></PaginationNumber>

        <!-- Loading Modal -->
        <LoadingModal  v-if="isLoading" ></LoadingModal>

    </div>
</template>



<style scoped>
</style>
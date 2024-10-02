<script setup lang="ts">
import UseClients from '@/clients/composables/UseClients';
import ClientList from '@/clients/components/ClientList.vue';
import PaginationNumber from '../components/PaginationNumber.vue';
import LoadingModal from '@/shared/components/LoadingModal.vue';

const { isLoading, clients , getPage  , totalPages , currentPage } = UseClients();


</script>

<template>
    <div>
        <h1>Listado de clientes</h1>
        <!-- Client List -->
        <ClientList  v-if="clients" :clients="clients" />

        <!-- PaginationNumber    - paginacion -->
        <PaginationNumber :total-pages="totalPages"  :current-page="currentPage"  @page-changed="getPage" ></PaginationNumber>

        <!-- Loading Modal -->
        <LoadingModal  v-if="isLoading" ></LoadingModal>
    </div>
</template>



<style scoped>
</style>
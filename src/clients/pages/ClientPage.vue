<script setup lang="ts">
import LoadingModal from '@/shared/components/LoadingModal.vue';
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';
import useClient from '../composables/useClient';

const route = useRoute();
const router = useRouter()


const { isError ,client, isLoading , isUpdateLoading , isUpdateSuccess , updateClient} = useClient(+route.params.id)

watch(isError , ()=>{
    if(isError.value)
        router.replace('/clients')
})

</script>
<template>
    <h3 v-if="isUpdateLoading">Guardando...</h3>
    <h3 v-if="isUpdateSuccess">Guardado</h3>
    <LoadingModal v-if="isLoading" />

    <div v-if="client" >
        <h1>{{ client.name }}</h1>
        <form @submit.prevent="updateClient(client!)">
            <input type="text" placeholder="nombre cliente" v-model="client.name">
            <br>
            <input type="text" placeholder="Direccion" v-model="client.address">
            <br>
            <input :disabled="isUpdateLoading" type="submit" value="Guardar">
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
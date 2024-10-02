<script setup lang="ts">
import { ref, toRef, watch } from 'vue';


interface Props {
    totalPages :number,
    currentPage : number,
}
interface Emits{
    (e: 'pageChanged' , page:number):void
}

const props = defineProps<Props>();
defineEmits<Emits>();


const currentPage = toRef( props , 'currentPage')
const totalPages = toRef( props , 'totalPages')
const  totalPageNumber = ref<number[]>([]);

watch( totalPages , ()=>{totalPageNumber
    totalPageNumber.value = [ ... new Array(totalPages.value)].map( (value, index) => index +1)
}, {immediate: true}) // lo va a llamar apenas se cree , si se deja en false esperara a que cambie


</script>
<template>
    <div>
        <button :disabled="currentPage === 1" @click="$emit( 'pageChanged' ,  currentPage - 1 )">Anterior</button>
        <button v-for="number of totalPageNumber" :key="number"
            @click="$emit( 'pageChanged' ,  number )" 
            :class="{ active : currentPage === number}"
        >{{  number }}</button>
        <button :disabled="totalPages === currentPage" @click="$emit( 'pageChanged' ,  currentPage + 1 ) "  >Siguiente</button>
    </div>
</template>

<style scoped>

div{
    margin-top: 10px;
}

button {
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid var(--color-border);
    color: var(--color-text);
    cursor: pointer;
    margin-right: 5px ;
    padding: 10px;
    transition: all .5s;
}

button:hover{
    background-color: hsla(160, 100%, 35%, 0.2);
    transition: all 0.5s;
}

button:disabled {
    cursor: not-allowed;
}

.active{
    background-color: hsla(160, 100%, 35%, 0.2);
}
</style>
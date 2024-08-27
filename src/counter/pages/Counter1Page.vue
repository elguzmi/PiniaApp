<script setup lang="ts">
import { useCounterOptionsStore } from '@/store/counter-options';
import { storeToRefs } from 'pinia';
import CounterOptionsValue from '../components/CounterOptionsValue.vue';

// si se desestructura  -> rompe la reactividad , si se pueden desestructurar los metodos, pero setter y propperties pierden reactividad
const counterOption = useCounterOptionsStore()
const { count , squareCount } = storeToRefs(counterOption)
const { increment , incrementBy } = counterOption

</script>

<template>
    <div>
        <h1>pinia </h1>
        <h4>counter 1 page : {{ count }}</h4>
        <h4>Square : {{  squareCount  }}</h4>

        <br>

        <button @click="increment()">+1</button>
        <button @click="incrementBy(2)">+2</button>
        <button @click="incrementBy(5)">+5</button>

        <!-- Regresa al estado inicial -->
        <button @click="counterOption.$reset()">reset</button>

        <CounterOptionsValue></CounterOptionsValue>

    </div>
</template>

<style scoped>
    button{
        margin-right: 5px;
    }

</style>
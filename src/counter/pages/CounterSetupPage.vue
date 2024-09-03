<script setup lang="ts">
import { useCounterSetupStore } from '@/store/counter-setup';
import { storeToRefs } from 'pinia';
import CounterSetupValue from '@/counter/components/CounterSetupValue.vue';

// si se desestructura  -> rompe la reactividad , si se pueden desestructurar los metodos, pero setter y propperties pierden reactividad
const counterSetup = useCounterSetupStore()
const { count , squareCount } = storeToRefs(counterSetup)
const { increment , incrementBy } = counterSetup

</script>

<template>
    <div> 
        <h1>pinia Setup </h1>
        <h4>counter 1 page : {{ count }}</h4>
        <h4>Square : {{  squareCount  }}</h4>

        <br>

        <button @click="increment()">+1</button>
        <button @click="incrementBy(2)">+2</button>
        <button @click="incrementBy(5)">+5</button>

        <!-- Regresa al estado inicial -->
        <button @click="counterSetup.$reset()">reset</button>

        <CounterSetupValue></CounterSetupValue>

    </div>
</template>

<style scoped>
    button{
        margin-right: 5px;
    }

</style>
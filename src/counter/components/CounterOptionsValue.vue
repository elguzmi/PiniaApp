<script setup lang="ts">
import { useCounterOptionsStore } from '@/store/counter-options';


const counter = useCounterOptionsStore()
</script>

<template>
    <div>
        <h1>El valor es : {{  counter.count }}</h1>
        <h4>ultimo cambio : {{  counter.lastChanged }}</h4>
    </div>
</template>

<style scoped>

</style>
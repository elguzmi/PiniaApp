import { defineStore } from "pinia";


interface CounterOptionState {
    count : number;
    lastChanged? : Date
}

// pinia es cargado bajo demanda
export const useCounterOptionsStore = defineStore('counterOptions', {
    // estado de pinia
    state : ()=>({
        count : 0,
        lastChanged : undefined
    } as CounterOptionState ),
    //getter es una forma de tener computadas ciertas tareas frecuentes
    getters : {
        squareCount : (state)=> state.count * state.count
    },
    // funciones u acciones
    actions:{
        incrementBy( value :number){
            this.count = this.count + value;
            this.lastChanged = new Date();
        },

        increment(){
            this.incrementBy(1);
        }
    }
})
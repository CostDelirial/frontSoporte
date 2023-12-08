<template>
<v-card>
    <v-toolbar>
        Nuevo empleado
    </v-toolbar>
    <v-card-text>
        <FormEmpleado/>
    </v-card-text>
</v-card>
</template>
<script>
import FormEmpleado from '../forms/nuevoEmpleado.vue'
export default {
    comments:{
        FormEmpleado
    }
}
</script>
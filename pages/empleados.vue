<template>
<v-card>
    <v-toolbar>
        Empleados
        <v-spacer></v-spacer>
        <v-btn color="yellow accent-4">NUEVO</v-btn>
    </v-toolbar>
    <v-card-text>
        <Empleado/>
    </v-card-text>
</v-card>
<!--//////////////////////////////////////////////////// modal para empleado nuevo


///////////////////////////////////////////////////////-->
</template>
<script>
import Empleado from '../components/empleado/empleadoModul.vue'
export default{
components:{
    Empleado
}
}
</script>
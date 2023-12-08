<template>
    <v-container>
        <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="20"
        class="elevation-1"
        >
        <template v-slot:item.actions="{item}">
            <v-btn
            :href="`${base}${item.documento }`" target="_blank">
            <v-icon
            small
            >
                mdi-eye
            </v-icon>
    
            </v-btn>
                
            </template>
    </v-data-table>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            url: this.$axios.defaults.baseURL,
            base: "http://localhost:4000/api/servicio/Alta/",
            headers:[
                /*{text: 'Ficha', aling: 'start', value:'ficha'},
                {text: 'vigencia', value:'vigencia'},
                {text: 'Nombre', value: 'nombre'},
                {text: 'Nivel', value: 'nivel'},
                {text:'Situación', value: 'situacion'},
                {text: 'Área', value: 'area' },
                {text: 'Documento', value:'doc'}*/
                {text: 'Usuario', aling: 'start', value:'ficha.nombre'},
                {text: 'Vigencia', value:'ficha.vigencia'},
                {text: 'Nivel', value: 'ficha.nivel'},
                {text: 'Situacion', value: 'ficha.situacion'},
                {text: 'Gerencia', value: 'ficha.area'},
                { text: 'Acciones', value:'actions'}
            ],
            desserts: []
        }
    },
    mounted(){
        this.Altas()
    },
    methods:{
        async Altas(){
            try{
                const res = await this.$axios.get(`${this.url}/api/servicio/Alta`)
                this.desserts = res.data.servicio
            }catch(error){
                console.log(error)
            }
        }/*,
        async DatosEmpleados(){
            try{
                const resp = await this.$axios.get(`${this.url}/api/usuarios`)
                this.desserts = resp.data.usuario
               
            }catch(error){
                console.log(error)
            }
        }*/
    }
}
</script>
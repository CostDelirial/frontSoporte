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
            base: "http://localhost:4000/api/servicio/Baja/",
            headers:[
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
        this.Bajas()
    },
    methods:{
        async Bajas(){
            try{
                const res = await this.$axios.get(`${this.url}/api/servicio/Baja`)
                this.desserts = res.data.servicio
            }catch(error){
                console.log(error)
            }
        }
    }
}
</script>
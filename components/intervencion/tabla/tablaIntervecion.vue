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
            base: "http://localhost:4000/api/servicio/Intervencion/",
            headers:[
                {text: 'Ficha usuario', aling: 'start', value:'ficha.nombre'},
                {text: 'Hostname', value:'nombreHost'},
                {text: 'Serie de PC', value: 'seriePC'},
                { text: 'Acciones', value:'actions'}
            ],
            desserts: []
        }
    },
    mounted(){
        this.Intervencion()
    },
    methods:{
        async Intervencion(){
            try{
                const res = await this.$axios.get(`${this.url}/api/servicio/Intervencion`)
                this.desserts = res.data.servicio
            }catch(error){
                console.log(error)
            }
        }
    }
}
</script>
<template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
    >
     
    </v-data-table>
  </template>


<script>
    export default {
        data: () => ({
            
            dialog: false,
            dialogDelete: false,
            headers: [
                    {
                    text: 'Ficha',
                    align: 'start',
                    sortable: false,
                    value: 'ficha',
                    },
                    { text: 'Nombre', value: 'nombre' },
                    { text: 'Nivel', value: 'nivel' },
                    { text: 'Situaciòn Contractual', value: 'situacion' },
                    { text: 'Gerencia', value: 'area' }
                ],
            desserts: [],
        }),
        created () {
        this.initialize()
        },

        methods: {
        async initialize () {
                try{
                    const resp = await this.$axios.get(`/api/usuarios`)
                    console.log(resp)
                    this.desserts = resp.data.usuario
                    console.log(this.desserts)
                }catch(error){
                    console.log(error)
                    }
            },
        },    
    }
</script>
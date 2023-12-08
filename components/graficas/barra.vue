<template>
    
        <v-card>
            <v-card-text>
                <label class="block mb-2 font-bold"> Servicios Totales 2023</label>
                <client-only>
                    <BarChart :data="chartData" />
                </client-only>
            </v-card-text>
        </v-card>
    
    
      
  </template>
  
  <script>
  export default {
    data() {
      return {
        url: this.$axios.defaults.baseURL,
        datas: []
      }
    },
    created(){
            this.Datos()
        },
    methods:{
        async Datos(){
          try{
            const res = await this.$axios.get(`${this.url}/api/servicio/tipos/servicios`)
           
            this.datas = res.data.numero
            consoel.log(this.datas.map())
          }catch(error){
            console.log(error)
          }
        }
    },
    computed: {
        
      chartData() {
        return {
            
            labels: '',
            datasets: [
                {
                label: '',
                data: [],
                backgroundColor: ['rgba(200, 255, 0, 0.3)','rgba(100, 255, 0, 0.3)','rgba(20, 0, 0, 0.3)','rgba(20, 255, 255, 0.3)','rgba(20, 255, 100, 0.3)'],
                borderColor: ['rgba(200, 255, 0, 0.3)','rgba(100, 255, 0, 0.3)','rgba(20, 0, 0, 0.3)','rgba(20, 255, 255, 0.3)','rgba(20, 255, 100, 0.3)'],
                borderWidth: 0,
                },
            ],
        }
      },
    },

    
  }
  </script>
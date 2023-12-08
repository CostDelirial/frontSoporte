<template>
<v-container>
    <v-card>
<v-btn @click="verModal" > ver modal</v-btn>
    </v-card>
    <v-dialog v-model="dialogService" max-width="700px">
        <v-card>
            <v-toolbar class="yellow accent-4">
                Formato TI-SSCC
                <v-spacer></v-spacer>
                <v-btn color="primary" small fab text @click="closeDialog"><v-icon>mdi-close-thick</v-icon></v-btn>
            </v-toolbar>
            <v-card-text>
                <!--/////////////////////////////// popup //////////////////////////////////////-->
            <NuevoServicio />
                <!--/////////////////////////////// Fin popup //////////////////////////////////////-->
        </v-card-text>
        </v-card>
        
    </v-dialog>
</v-container>
</template>
<script>
import NuevoServicio from '../modales/altaBajaServicio.vue'
export default{
    name: 'altaServices',
    components:{
        NuevoServicio
    },
    data() {
        return {
            dialogService: false
        }
    },
    methods:{
        verModal(){
            this.dialogService = true
        },
        closeDialog(){
            this.dialogService = false
        }
    }
    }
</script>

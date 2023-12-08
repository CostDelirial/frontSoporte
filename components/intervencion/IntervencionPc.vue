<template>
    <v-container>
        <v-row>
           <botnesEMSER/>
        </v-row>
        <v-row>
            <v-col colw="12">
                <v-card>
                    <TablaIntervecion />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import botnesEMSER from '../modal/botnesEMSER.vue';
import TablaIntervecion from './tabla/tablaIntervecion.vue';
export default {
    data () {
        return {
            
        }
    },
    components: {
        TablaIntervecion,
        botnesEMSER,
    },
    
}</script>
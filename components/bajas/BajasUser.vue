


<template>
    <v-container>
        <v-row>
           <botnesEMSER/>
        </v-row>
        <v-row>
            <v-col colw="12">
                <v-card>
                    <TablaBaja  />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import botnesEMSER from '../modal/botnesEMSER.vue';
import TablaBaja from './tabla/tablaBaja.vue'
export default {
    data () {
        return {
        }
    },
    components: {
        TablaBaja ,
        botnesEMSER,
    },
    
}</script>
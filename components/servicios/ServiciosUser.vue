<template>
    <v-container>
        <v-row>
           <botnesEMSER/>
        </v-row>
        <v-row>
            <v-col colw="12">
                <v-card>
                    <TablaServicio />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import botnesEMSER from '../modal/botnesEMSER.vue';
import TablaServicio from './tabla/tablaServicio.vue';
export default {
    data () {
        return {
        }
    },
    components: {
        TablaServicio,
        botnesEMSER,
    },
    
}</script>
<template>
    <v-container>
        <v-row>
           <botnesEMSER/>
        </v-row>
        <v-row>
            <v-col colw="12">
                <v-card>
                    <TablaCarptea />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import botnesEMSER from '../modal/botnesEMSER.vue';
import TablaCarptea from './tabla/tablaCarpeta.vue';
export default {
    data () {
        return {
        }
    },
    components: {
        TablaCarptea,
        botnesEMSER,
    },
    
}</script>
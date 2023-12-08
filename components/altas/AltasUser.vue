<template>
    <v-container>
        <v-row>
           <botnesEMSER/>
        </v-row>
        <v-row>
            <v-col colw="12">
                <v-card>
                    <TablaAlta />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import botnesEMSER from '../modal/botnesEMSER.vue';
import TablaAlta from './tabla/tablaAltas.vue';
export default {
    data () {
        return {
        }
    },
    components: {
        TablaAlta,
        botnesEMSER,
    },
    
}
</script>
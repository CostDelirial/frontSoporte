<template>
    <v-container>
        <v-row>
            <v-col cols="2">
                <v-card>
                    <v-btn  @click="nuevoServicio = true" block class="mt-2" color="primary"><v-icon>mdi-format-line-style</v-icon>Soporte</v-btn>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card>
                    <v-btn  @click="carpetaCompartida = true" block class="mt-2" color="primary"><v-icon>mdi-format-line-style</v-icon>Compartida</v-btn>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card>
                    <v-btn  @click="intervencionPc = true" block class="mt-2" color="primary"><v-icon>mdi-format-line-style</v-icon>Intervención</v-btn>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card>
                    <v-btn  @click="AltaBaja=true" block class="mt-2" color="primary">Alta o Baja de cuenta</v-btn>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card>
                    <v-btn  @click="nuevoEmpleado=true" block class="mt-2" color="primary"> <v-icon>mdi-account-plus</v-icon>Nuevo</v-btn>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
        v-model="nuevoEmpleado"
        width="600px">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-icon>mdi-account</v-icon>Nuevo Empleado
                    <v-spacer></v-spacer>
                    <v-icon @click="nuevoEmpleado = false">mdi-close</v-icon>
                </v-toolbar>
                <v-card-text>
                    <modalEmpleado />
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="AltaBaja"
        width="800px">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-icon>mdi-account</v-icon>Alta ó Baja de cuenta
                    <v-spacer></v-spacer>
                    <v-icon @click="AltaBaja = false">mdi-close</v-icon>
                </v-toolbar>
                <v-card-text>
                    <modalAltaBaja />
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="carpetaCompartida"
        width="800px">
            <v-card>
                <v-toolbar dark color="primary">
                    Carpeta compartida
                    <v-spacer></v-spacer>
                    <v-icon @click="carpetaCompartida = false">mdi-close</v-icon>
                </v-toolbar>
                <v-card-text>
                    <modalCarpeta />
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="intervencionPc"
        width="800px">
            <v-card>
                <v-toolbar dark color="primary">
                    Intervención de equipo de computo
                    <v-spacer></v-spacer>
                    <v-icon @click="intervencionPc = false">mdi-close</v-icon>
                </v-toolbar>
                <v-card-text>
                    <modalIntervencion/>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="nuevoServicio"
        width="800px">
            <v-card>
                <v-toolbar dark color="primary">
                    Nuevo Servicio
                    <v-spacer></v-spacer>
                    <v-icon @click="nuevoServicio = false">mdi-close</v-icon>
                </v-toolbar>
                <v-card-text>
                    <modalServicio />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import modalEmpleado from './modalEmpleado'
import modalAltaBaja from './modalAltaBaja'
import modalServicio from './modalServicio';
import modalCarpeta from './modalCarpeta';
import modalIntervencion from './modalIntervencion';
export default {
    data () {
        return {
            nuevoEmpleado: false,
            AltaBaja: false,
            nuevoServicio: false,
            carpetaCompartida: false,
            intervencionPc: false,
        }
    },
    components: {
        modalEmpleado,
        modalAltaBaja,
        modalServicio,
        modalCarpeta,
        modalIntervencion
    },
    
}</script>
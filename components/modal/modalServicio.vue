<template>
    <v-container>
        <v-form ref="form">
            <v-row>
                <v-col cols="8" >
                    <v-autocomplete
                    label="Tipo de soporte"
                    :items="soporte"
                    v-model="tipo"
                    :rules="ruleTipo"
                    chips
                    small-chips
                    multiple
                    ></v-autocomplete>
                </v-col>
                <v-col cols="4">
                    <v-autocomplete
                    label="Ficha del usuario"
                    :items="fichas"
                    v-model="ficha"
                    :rules="ruleFicha"
                    item-value="uid"
                    item-text="ficha"
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                    label="Observaciones"
                    v-model="observaciones"
                    :rules="ruleObs"
                    row-height="15"
                    auto-grow
                    no-resize
                    dense
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="9">
                    <v-file-input
                    v-model="documento"
                    label="Formato IT-SSCC o de soporte en formato PDF"
                    
                    truncate-length="15"
                    ></v-file-input>
                </v-col>
                <v-col cols="3">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Fecha realizacion"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        :active-picker.sync="activePicker"
                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                        min="2020-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-btn  block class="mt-2" :disabled="!valid" @click="validate" color="primary">Registrar</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
<script>
import alerta from '@/services/sweet'
export default {
data(){
    return {
        url: this.$axios.defaults.baseURL,
        valid: true,
        soporte:[
            'Soporte de equipo de cómputo',
            'Petición de toner',
            'Cambio de nombr en el display',
            'Asesoría en el uso de software',
            'Soporte para impresion',
            'Configuración de equipo'
        ],
        tipo: [],
        ruleTipo:[
                    (v) => !!v || "El tipo de soporte es obligatoria",
                ],
        ficha: '',
        ruleFicha:[
                    (v) => !!v || "La ficha es obligatoria",
                ],
        observaciones: '',
        ruleObs:[
                    (v) => !!v || "Las observaciones son obligatorias",
                ],
        documento:[],
        fichas:[],
        servicios:[],
        activePicker: null,
        date: null,
        menu: false
    }
},
watch: {
            menu (val) {
                val && setTimeout(() => (this.activePicker = 'YEAR'))
            },
        },
created(){
    this.servicio()
    this.fichasEmpleados()
},
methods:{
    save (date) {
                this.$refs.menu.save(date)
            },
    //carga de tipos de servicio
    async servicio () {
        try{
            const resp = await this.$axios.get(`${this.url}/api/tipo`) 
            this.servicios = resp.data.tipoServicio
            console.log(this.servicios)
        }
        catch(error){
            console.log(error)
        }
    },

    //cargar fichas del usuario
    async fichasEmpleados() {
        try{
            const resp = await this.$axios.get(`${this.url}/api/usuarios/`)
            this.fichas = resp.data.usuario
        }catch(error){
            console.log(error)
        }    
    },
    async Servicio(){
        try{

            let form = new FormData()
                form.append('fechaSolicitud', this.date)
                form.append('tipo', "Soporte")
                form.append('tipoSoporte',this.tipo)
                form.append('ficha', this.ficha)
                form.append('observaciones', this.observaciones)
                form.append('documento', this.documento)
        
                const res = await this.$axios.post(`${this.url}/api/servicio`, form, {header:{'content-type': 'multipart/form-data'}})
                alerta({
                tipo: 'success',
                    mensaje: res.data.msg,
                    posicion: 'center',
                    tiempo: 1500,
                    largo: 350
            })

            this.resetForm()
        }catch(error){
            console.log(error)
        }
    },
    validate(){
        if(this.$refs.form.validate()){
            this.Servicio()
        }else{
            console.log(error)
        }
    },
    resetForm(){
        this.$refs.form.reset()
    }
}
}
</script>
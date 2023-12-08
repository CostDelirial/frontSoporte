<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
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
                <v-col cols="4">
                    <v-text-field
                    label="Hostname"
                    v-model="nombreHost"
                    :rules="ruleHost"
                    required
                ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        label="Nombre carpeta"
                        v-model="nombreCarpeta"
                        :rules="ruleCarpeta"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-autocomplete
                        label="Fichas a compartir carpeta"
                        :items="fichas"
                        v-model="comparteCon"
                        :rules="ruleCon"
                        item-value="ficha"
                        item-text="ficha"
                        multiple
                        ></v-autocomplete>
                </v-col>
                <v-col cols="4">
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
                        <v-file-input
                        label="Evidencia"
                        v-model="documento"
                        truncate-length="15"
                        ></v-file-input>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn block class="mt-2" :disabled="!valid" @click="validate" color="primary">Registrar Empleado</v-btn>
                    </v-col>
                </v-row>
        </v-form>
    </v-container>
    </template>
    <script>
import alerta from '@/services/sweet'
import FormData from 'Form-data'
    
    export default{
        data(){
            return {
                url: this.$axios.defaults.baseURL,
                valid: true,
                ficha: '',
                ruleFicha:[
                    (v) => !!v || "La ficha es obligatoria",
                ],
                documento:[],
                nombreHost:'',
                ruleHost:[
                    (v) => !!v || "El nombre dle host es obligatorio",
                ],
                nombreCarpeta:'',
                ruleCarpeta:[
                    (v) => !!v || "El nombre de la carpeta es obligatorio",
                ],
                comparteCon:[],
                ruleCon:[
                    (v) => !!v || "Las fichas con quien comparte son obligatorios",
                ],
                fichas:[],
                
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
            this.datosUserCarpetas()

        },
        methods:{
            save (date) {
                this.$refs.menu.save(date)
            },
            async datosUserCarpetas(){
                try{
                    const resp = await this.$axios.get(`${this.url}/api/usuarios/`)
                    this.fichas = resp.data.usuario
                }catch(error){
                    console.log(error)
                }
            },
            async Carpeta(){
                try{
                    let form = new FormData()
                        form.append('fechaSolicitud', this.date)
                        form.append('tipo',"Carpeta")
                        form.append('ficha', this.ficha)
                        form.append('nombreHost', this.nombreHost)
                        form.append('nombreCarpeta', this.nombreCarpeta)
                        form.append('comparteCon', this.comparteCon)
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
                    this.Carpeta()
                }else{
                    console.log('Error')
                }
            },
            resetForm(){
                this.$refs.form.reset()
            }
        }
    }
    </script>
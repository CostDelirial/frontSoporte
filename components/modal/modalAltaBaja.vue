<template>
   <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
            <v-col cols="4">
                <v-autocomplete
                label="Ficha del usuario"
                :items="fichas"
                :rules="ruleFicha"
                v-model="ficha"
                item-value="uid"
                item-text="ficha"
            ></v-autocomplete>
            </v-col>
            <v-col cols="4">
                <v-autocomplete
                label="Tipo"
                :items="tic"
                v-model="tipo"
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
            <v-col>
                <v-autocomplete
                label="Tipos de servicio requerido"
                v-model="tipoService"
                :items="tipoServicio"
                required
                dense
                multiple
                ></v-autocomplete>
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
                <v-btn block class="mt-2" :disabled="!valid" @click="validate" color="primary">Registrar </v-btn>
            </v-col>
        </v-row>
    </v-form>
   </v-container>
</template>

<script>
import alerta from '@/services/sweet'
export default {
    data() {
        return {
            url: this.$axios.defaults.baseURL,
            valid: true,
            tipo:'',
            fichas:[],
            documento:[],
            ficha:'',
            ruleFicha:[
                    (v) => !!v || "La ficha es obligatoria",
                ],
            
            fechaSol:'',
            ruleFechaSol: [
                (v) => !!v || "La vigencia es obligatoria",
                (v) => (v && v.length === 10) || "solo 10 caracteres",
                (v) => /([0-9]{2}[-]{1}[0-9]{2}[-]{1}[0-9]{4}\b)/.test(v) || "El formato es dd-mm-aaaa"
            ],
           tic:[
            'Alta','Baja'
           ],
            tipoServicio:[
                'ALTA CUENTA','ALTA CORREO','ALTA INTERNET','ALTA RED ALAMBRICA','ALTA EXTENSION TELEFONICA',
                'BAJA CUENTA','BAJA CORREO','BAJA INTERNET','BAJA RED ALAMBRICA','BAJA EXTENSION TELEFONICA',
                'MODIFICAR CUENTA','MODIFICAR CORREO','CAMBIO EXTENSION TELEFONICA'
            ],
            tipoService: [],
            
            activePicker: null,
            date: null,
            menu: false
        };
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },

    mounted() {
        this.fichasU()
    },

    methods: {
        save (date) {
        this.$refs.menu.save(date)
      },
        async  fichasU(){
            try{
                    const resp = await this.$axios.get(`${this.url}/api/usuarios/`)
                    this.fichas = resp.data.usuario
                }catch(error){
                    console.log(error)
                }
        },
        async registraDoc(){
            try{
                
                let form = new FormData()
                 form.append('ficha', this.ficha)
                 form.append('tipo', this.tipo)
                 form.append('fechaSolicitud', this.date)
                 form.append('nombreAltaBaja', this.tipoService)
                  form.append('documento', this.documento)
                console.log(form)
                const res = await this.$axios.post(`${this.url}/api/servicio/`, form, {header:{'content-type': 'multipart/form-data'}})
                alerta({
                    tipo: 'success',
                    mensaje: res.data.msg,
                    posicion: 'center',
                    tiempo: 1500,
                    largo: 350
                })
                this.resetForm()
            }catch(error){
                
                alerta({
                    tipo: 'error',
                    mensaje: 'El susuario ya cuneta con una baja de cuenta',
                    posicion: 'center',
                    tiempo: 1500,
                    largo: 350
                })
               
            }
        },
        validate(){
            if(this.$refs.form.validate()){
                this.registraDoc()
            }else{
                console.log('Error')
            }
        },
        resetForm(){
            this.$refs.form.reset()
        }
        
    },
};
</script>

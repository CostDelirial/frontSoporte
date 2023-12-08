<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="9">
                    <v-text-field
                        label="Nombre completo"
                        required
                        v-model="nombre"
                        :rules="ruleNombre"
                    ></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-autocomplete
                    label="Contractual"
                    :items="contractual"
                    v-model="situacion"
                    :rules="ruleSitua"
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field
                        label="Ficha"
                        required
                        v-model="ficha"
                        :rules="ruleFicha"
                    ></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        label="Nivel"
                        required
                        v-model="nivel"
                        :rules="ruleNivel"
                    ></v-text-field>
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
                        min="2020-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-autocomplete
                    label="Gerencia de adscripción"
                    :items="gerencias"
                    v-model="area"
                    :rules="ruelAre"
                    dense
                    ></v-autocomplete>
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
export default {
data () {
    return {
        url: this.$axios.defaults.baseURL,
        valid: true,
        ficha: null,
        ruleFicha:[
            (v) => !!v || "La ficha es obligatoria",
            (v) => (v && v.length === 6) || "solo seis digitos",
            (v) => /([0-9]{6}\b)/.test(v) || "solo numeros"
        ],
        nombre: '',
        ruleNombre:[
            (v) => !!v || "El nombre es obligatoria"
        ],
        nivel: '',
        ruleNivel:[
            (v) => !!v || "El nivel es obligatoria"
        ],
        
        situacion: '',
        ruleSitua:[
            (v) => !!v || "La situación es obligatoria"
        ],
        area: '',
        ruelAre:[
            (v) => !!v || "El área es obligatoria"
        ],
        gerencias:['GERENCIA DE ESTRATEGIA Y SISTEMAS DE SEGURIDAD Y MONITOREO',
                    'GERENCIA DE SEGURIDAD FÍSICA',
                    'GERENCIA DE GESTION TECNICA Y SALVAGUARDIA',
                    'UNIDAD DE CORDINACIÓN TECNICA'],
        contractual:['PC','TC'],
        close: false,

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
methods: {
    save (date) {
        this.$refs.menu.save(date)
      },
    async nuevoUsuario(){
        try{
            const formData = {
                ficha: this.ficha,
                nombre: this.nombre,
                nivel: this.nivel,
                vigencia: this.date,
                situacion: this.situacion,
                area: this.area,
            }
            console.log(this.url)
            const resp = await this.$axios.post(`${this.url}/api/usuarios/`, formData)
            
            alerta({
                    tipo: 'success',
                    mensaje: resp.data.mensaje,
                    posicion: 'center',
                    tiempo: 1500,
                    largo: 350
                })
                
            this.resetForm()
        }catch(error){
            alerta({
                    tipo: 'error',
                    mensaje: 'EL empleado que decea registrar ya existe con esa ficha',
                    posicion: 'center',
                    tiempo: 2000,
                    largo: 550
                })
        }
    },
    validate(){
        if(this.$refs.form.validate()){
            this.nuevoUsuario()
        }
        else{
            console.log('Error')
        }
    },
    resetForm(){
        this.$refs.form.reset()
    }
},
}
</script>
<template>
<v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
            <v-col cols="3">
                <v-autocomplete label="Ficha del usuario" :items="ficha" v-model="fichaU" :rules="rulefichaU" item-value="uid" item-text="ficha"></v-autocomplete>
            </v-col>
            <v-col cols="3">
                <v-text-field label="Hostname" v-model="nombreHost" :rules="ruleHost" required></v-text-field>
            </v-col>
            <v-col cols="3">
                <v-text-field label="Serie PC" v-model="seriePC" :rules="ruleSerie" required></v-text-field>
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
                <v-file-input label="Evidencia" v-model="documento" truncate-length="15"></v-file-input>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn block class="mt-2" :disabled="!valid" @click="validate" color="primary">Registrar</v-btn>
            </v-col>
        </v-row>
    </v-form>
</v-container>
</template>

    
<script>
import alerta from '@/services/sweet'
import FormData from 'Form-data'
export default {
    data() {
        return {
            url: this.$axios.defaults.baseURL,
            documento: [],
            fichaU: '',
            rulefichaU: [
                (v) => !!v || "La ficha es obligatoria",
            ],
            ficha: [],
            nombreHost: '',
            ruleHost: [
                (v) => !!v || "El hostname es obligatorio",
            ],
            seriePC: '',
            ruleSerie: [
                (v) => !!v || "Laserie es obligatoria",
            ],
            valid: true,
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
    created() {
        this.fichas()
    },
    methods: {
        save (date) {
                this.$refs.menu.save(date)
            },
        async fichas() {
            try {
                const resp = await this.$axios.get(`${this.url}/api/usuarios/`)
                this.ficha = resp.data.usuario
            } catch (error) {
                console.log(error)
            }
        },
        async Intervencion() {
            try {
                let form = new FormData()
                form.append('fechaSolicitud', this.date)
                form.append('tipo', "Intervencion")
                form.append('ficha', this.fichaU)
                form.append('nombreHost', this.nombreHost)
                form.append('seriePC', this.seriePC)
                form.append('documento', this.documento)
                console.log(form)
                const res = this.$axios.post(`${this.url}/api/servicio`, form, {headers : {'content-type': 'multipart/form-data'}})
                alerta({
                    tipo: 'success',
                    mensaje: res.data.msg,
                    posicion: 'center',
                    tiempo: 1500,
                    largo: 350
                })
                this.resetForm()
                
            } catch (error) {
                console.log(error)
            }
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.Intervencion()
            } else {
                console.log('Error')
            }
        },
        resetForm() {
            this.$refs.form.reset()
        }

    }

}
</script>

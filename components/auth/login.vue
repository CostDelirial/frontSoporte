<template>
   <v-app>
    <v-main class="bg-img">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex md4 sm8 >
                    <v-card ><!-- <v-card dark color="grey darken-3">-->
                        <v-toolbar color="primary" dark>
                            <v-toolbar-title >SOPORTE A SISTEMAS S.S.E.</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field 
                                prepend-icon="mdi-account"
                                label="FICHA"
                                type="text"
                                v-model="ficha"
                                :rules="ruleFicha"
                                ></v-text-field>
                            </v-form>
                            <v-form>
                                <v-text-field 
                                prepend-icon="mdi-lock"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                label="CONTRASEÑA"
                                @click:append="show = !show"
                                @keyup.enter="validate"
                                v-model="password"
                                :rules="rulePass"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text  :disabled="!valid" @click="validate" >Acceder</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
           </v-container>
       
        </v-main>
    </v-app>

        </template>

<script>
import alerta from '@/services/sweet'
export default {
    name: 'FrontSoporteLogin',

    data() {
        return {
            show: false,
            valid: true,
            ficha: null,
            ruleFicha: [
                (v) => !!v || "La ficha es obligatoria",
                (v) => (v && v.length === 6) || "solo seis digitos",
                (v) => /([0-9]{6}\b)/.test(v) || "Ingresa solo numeros"
            ],
            password: "",
            rulePass:[
                (v) => !!v || "La contraseña es obligatoria",
                (v) => (v && v.length >= 8 ) || "Mayor a 8 digitos",
                (v) => /([A-Z])/.test(v) || "Debe contener almenos una mayuscula",
                (v) => /([a-z])/.test(v) || "Debe contener almenos una minuscula",
                (v) => /([$%&#@.])/.test(v) || "Debe contener almenos un caracter especial ($ % & # @ .)",
                (v) => /([0-9])/.test(v) || "Debe contener almenos un numero"
            ]
        };
    },

    mounted() {
       
    },

    methods: {
        async userLogin(){
            if(this.ficha === null ||  this.password === ""){
                alerta({
                    tipo: 'error',
                    mensaje: 'Ingresa tus credenciales',
                    posicion: 'center',
                    tiempo: 1500,
                    largo: 500
                })
                return;
            }
            const formData = {
                ficha: this.ficha,
                password: this.password
            }
            try{
                const resp = await this.$auth.loginWith('local', { data: formData} )
                console.log(resp)                
            }catch(error){
                alerta({
                    tipo: 'error',
                    mensaje: 'Enrro en el login',
                    posicion: 'center',
                    tiempo: 1500,
                    largo: 500
                })
            }


        },

        validate() {
            if(this.$refs.form.validate()){
                this.userLogin()
            }
            else{
                alerta({
                    tipo: 'error',
                    mensaje: 'Revisa el formulario',
                    posicion: 'center',
                    tiempo: 1500,
                    largo: 500
                })
            }
        }
    },
};
</script>

<style lang="scss" scope>
  .bg-img {
    background-image: url(~/static/14622.jpg);
    background-position: center center;
    background-size: cover;
  }
</style>
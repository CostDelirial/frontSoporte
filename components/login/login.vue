<template>
    <v-card >
        <v-card-title class="yellow accent-4">
            PORTAL SOPORTE A SISTEMAS
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-col cols="12">
                    <v-text-field
                        prepend-icon="mdi-account"
                        name="ficha"
                        label="Ficha"
                        type="number"
                        v-model="ficha">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        prepend-icon="mdi-lock"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        name="password"
                        label="Contraseña"
                        @click:append="$event => show = !show"
                        v-model="password"
                        @keyup.enter="Login">
                    </v-text-field>
                </v-col>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="yellow accent-4" @click="Login" to="/">
                Entrar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import alerta from '../../services/sweet'
export default {
    data(){
        return {
            show: false,
            ficha: null,
            password: ""
        }
    },
    methods: {
        async Login(){
            if( this.ficha === "" || this.password === ""){
                alerta({
                    tipo: 'warning',
                    mensaje: 'No puedes dejar ningun campo en blanco',
                    posicion: 'center',
                    largo: 500,
                    tiempo: 3000
                });
                return
            }
            const formData = {
                ficha: this.ficha,
                password: this.password
            }
            console.log(formData)
            try{
                const resp = await this.$auth.loginWith('local',{ data: formData });
                localStorage.set
                console.log(resp)
            }catch(error){
                console.log(error)
            }
        },
        
    }
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-select v-model="tipo" :items="tipos" label="Tipos de Servicios" item-text="tipo"
                    >
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-combobox v-model="empleado" label="Ficha empleado" :items="user" item-text="ficha" item-value="uid">
                    ></v-combobox>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-combobox v-model="nombreAltaBaja" label="Motivo formato" :items="motivos" item-text="nombre" item-value="_id">
                    ></v-combobox>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-textarea v-model="observaciones" label="Observaciones"></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
               <v-spacer></v-spacer>
               <v-btn  text @click="pruebaForm">enviar</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            //url: this.$axios.defaults.baseURL,
            tipo:'',
            empleado:'',
            nombreAltaBaja:'',
            observaciones:'',
            tipos: [],
            area: '',
            user: [],
            areas: [
                'GERENCIA DE ESTARTEGIA Y SISTEMAS DE SEGURIDAD Y MONITOREO','GERENCIA DE SEGUIDAD FÍSICA','GERENCIA DE GESTION TECNICA','UNIDAD DE CORDINACIÓN TECNICA'
            ],
            motivos: [
                'ALTA CUENTA WINDOWS Y CORREO', 'ALTA BUZOON DE CORREO', 'ALTA CUENTA WINDOWS', 'ALTA PMX EMPRESARIAL', 'ALTA VPN', 'ALTA ACCESO A INTERNET', 'ALTA INTERNET VIP',
                'BAJA CUENTA WINDOWS Y CORREO', 'BAJA BUZOON DE CORREO', 'BAJA CUENTA WINDOWS', 'BAJA PMX EMPRESARIAL', 'BAJA VPN', 'BAJA ACCESO A INTERNET', 'BAJA INTERNET VIP',
                'MODIFICAR CONTROL A FICHA', 'MODIFICAR CORREO', 'MODIFICAR PERMISOS DE INTERNET', 'MODIFICAR NOMBRE'
            ]
        }
    },
    created() {
        this.tipoServicio()
        this.usuarios()
    },
    methods: {
        async tipoServicio() {
            try {
                const tip = await this.$axios.get(`/api/tipo`)
                this.tipos = tip.data.tipoServicio
            } catch (error) {
                console.log(error)
            }
        },
        async usuarios() {
            try {
                const client = await this.$axios.get(`/api/usuarios`)
                this.user = client.data.usuario
                console.log(this.user)
            } catch (error) {
                console.log(error)
            }
        },
        async pruebaForm(){
            try{
                
                const formData = {
                    tipo: this.tipo,
                    empleado: this.empleado.uid,
                    nombreAltaBaja: this.nombreAltaBaja,
                    observaciones: this.observaciones,
                }
                const resp = await this.$axios.post(`/api/servicio`,formData);
                console.log(resp)
            }catch(error){
console.log(error)
            }
        }
    }
}
</script>
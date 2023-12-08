<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
    <v-list dense>
      <v-list-group v-for="(men, i) in menu" :key="i" :to="men.to" :value="true" :prepend-icon="men.icon">
          <template #activator>
          <v-list-item-title>{{ men.title}}</v-list-item-title>
        </template>
        <v-list-item v-for="(submen, i) in men.submenu" :key="i" :to="submen.to">
          <v-list-item-icon>
              <v-icon v-text="submen.icon"></v-icon>
            </v-list-item-icon>
          <v-list-item-title v-text="submen.subtitle"></v-list-item-title>
        </v-list-item>
        </v-list-group>
    </v-list>
      
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      
     
      
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-tooltip>
        <template #activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on" @click="signOut">
              <v-icon>mdi-power</v-icon>
            </v-btn>
          </template>
          Salir
      </v-tooltip>
    </v-toolbar>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      url: this.$axios.defaults.baseURL,
      clipped: false,
      drawer: false,
      fixed: false,
      menu:[
        {
          title: 'Servicios',
          submenu: [
            {
              icon: 'mdi-unity',
              subtitle: 'Dashboard',
              to: '/dashboard'
            },
            {
              icon: 'mdi-playlist-plus',
              subtitle: 'Altas',
              to: '/altaServices'
            },
            {
              icon: 'mdi-playlist-minus',
              subtitle: 'Bajas',
              to: '/bajaServices'
            },
            {
              icon: 'mdi-playlist-plus',
              subtitle: 'Modificación',
              to: '/modificaServices'
            },
            {
              icon: 'mdi-account-plus',
              subtitle: 'Empleado',
              to: '/empleados'
            },
            {
              icon: 'mdi-wrench',
              subtitle: 'Soporte',
              to: '/soporteServices'
            },
            {
              icon: 'mdi-file-tree',
              subtitle: 'Carpetas Compartidas',
              to: '/carpetasCom'
            },
            {
              icon: 'mdi-webhook',
              subtitle: 'Intervención',
              to: '/intervencionServices'
            }
              ],
              to:'',
              icon:'mdi-fridge'
        },
        {
          title: 'Administrador',
          to: '',
          icon:'mdi-angularjs'
        }        
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SOPORTE'
    }
  },
  methods:{
    async signOut(){
      await this.$auth.logout()
      //this.$router.push('/')
    },
    /*async menu(){
      try{
        const menu = await this.$axios.get(`${this.url}/api/usuario/menu`)
      }catch(error){
        console.log('Error en menu')
      }
    }*/
  }
}
</script>

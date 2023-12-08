<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in servicios"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      
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
    <v-toolbar dark color="primary">
      <v-spacer></v-spacer>
      <v-btn icon  @click="signOut">
        <v-icon>mdi-power</v-icon>
      </v-btn>
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
      clipped: false,
      drawer: false,
      fixed: false,
      servicios:[
        {
          icon: 'mdi-apps',
          title: 'Tablero',
          to: '/dashboard'
        },
        {
          icon: 'mdi-apps',
          title: 'Altas User',
          to: '/altasPrincipal'
        },
        {
          icon: 'mdi-apps',
          title: 'Bajas User',
          to: '/bajaPrincipal'
        },
        {
          icon: 'mdi-apps',
          title: 'Carpetas Compartidas',
          to: '/carpetasPrincipal'
        },
        {
          icon: 'mdi-apps',
          title: 'Intervenciones',
          to: '/intervPrincipal'
        },
        {
          icon: 'mdi-apps',
          title: 'Servicios',
          to: '/servicioPrincipal'
        }
      ],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Soporte'
    }
  },
  methods: {
    async signOut() {
      await this.$auth.logout()
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

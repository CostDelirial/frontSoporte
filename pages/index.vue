<template>
  <v-app>
    <v-main id="inspire">
      <v-container fluid fill-height>
        <v-layout aling-center justify-center>
          <v-flex xs12 sm8 md6>
            <Login />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Login from '@/components/login/login'
export default {
  layout: 'blanck',
  name: 'IndexPage',
  components:{
    Login
  }

}
</script>

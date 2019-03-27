<template>
  <v-app>
    <v-content>
      <Chat2/>
    </v-content>
  </v-app>
</template>

<script>
import Chat2 from './components/Chat2'

export default {
  name: 'App',
  components: {
    Chat2
  },
  data () {
    return {
      //
    }
  }
}
</script>

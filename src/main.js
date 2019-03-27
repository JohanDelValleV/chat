import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  theme: {
    primary: '#E53935',
    secondary:  '#E53935',
    accent: '#E53935',
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

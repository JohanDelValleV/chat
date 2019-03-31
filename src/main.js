import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: '#BF360C',
    secondary:  '#E64A19',
    accent: '#FF3D00',
    mechat:'#2962FF',
    otherchat:'#C51162',
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

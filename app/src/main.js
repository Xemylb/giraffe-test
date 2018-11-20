import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment-timezone'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  BootstrapVue,
  moment,
  render: h => h(App)
}).$mount('#app')

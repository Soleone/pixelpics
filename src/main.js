import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import store from './store'

Vue.use(VeeValidate)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

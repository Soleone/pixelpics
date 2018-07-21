import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import store from './store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'


Vue.use(VeeValidate)
Vue.use(BootstrapVue)
Vue.component('icon', Icon)

Vue.config.productionTip = false
Vue.config.keyCodes = {
  s: 83,
  d: 68,
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

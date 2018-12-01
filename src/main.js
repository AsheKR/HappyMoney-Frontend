import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'

Vue.use(VueResource);
Vue.use(VueCookie);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

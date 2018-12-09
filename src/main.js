import Vue from 'vue'
import App from './App.vue'
import router from './router'

// HTTP, COOKIE 사용을 위한 플러그인
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'

// Validation
import VeeValidate from 'vee-validate'
import ko from '@/components/common/validate-locale/ko.js'

Vue.use(VueResource);
Vue.use(VueCookie);
Vue.use(VeeValidate, {
  locale: 'ko',
  dictionary: {
    ko: ko
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

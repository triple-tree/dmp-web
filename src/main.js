// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

import './class-component-hooks' // https://github.com/vuejs/vue-class-component/issues/335

import debug from 'debug'
const log = debug('app')

if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  // debug.enable('*')
  log('Initialized App')
}

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App),
}).$mount('#app')

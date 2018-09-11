import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import { installAll } from '@/utils/plugins'

Vue.use(ElementUI, { locale })
installAll(Vue)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  created() {
    console.log(this.$http ? 'axios workd!' : 'axios uninstall~')
  },
  render: h => h(App)
})

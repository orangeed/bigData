import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

import App from './App.vue'
import dataV from '@jiaminghi/data-view'
import './style/commen.scss'
import './style/base-color.scss'
import './style/animation.scss'
import VCharts from 'v-charts'

Vue.use(Vuex)
Vue.use(VCharts)
Vue.use(dataV)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
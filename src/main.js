import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

import App from './App.vue'
import dataV from '@jiaminghi/data-view'
import './style/commen.scss'
import './style/base-color.scss'
import './style/animation.scss'
import VCharts from 'v-charts'
// import EchojoyMessage from './components/message/data-message.js'
import './assets/svg/iconfont.js'
import './components/icon/icon.js'
import 'echarts-extension-amap'


Vue.use(Vuex)
Vue.use(VCharts)
Vue.use(dataV)

// Vue.prototype.$message = EchojoyMessage

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
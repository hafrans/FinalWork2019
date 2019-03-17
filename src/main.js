import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

//import resources from baidu //#endregion

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap,{
  ak:"CteCt7VEpzYq61oDkLtWi15ZyNc3mnf9"//自行申请的ak
})
// eslint-disable-next-line
// Vue.prototype.$log = console.log.bind(console)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') 

import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

//引入axios
import axios from 'axios'

axios.defaults.withCredentials=true; //使用session
axios.defaults.baseURL = "http://127.0.0.1:8088"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios; //注入axios


Vue.config.productionTip = false

//import resources from baidu //#endregion

import BaiduMap from 'vue-baidu-map'


Vue.use(BaiduMap,{
  ak:"CteCt7VEpzYq61oDkLtWi15ZyNc3mnf9"//自行申请的ak
})
// Vue.component('v-chart', ECharts)
// eslint-disable-next-line
// Vue.prototype.$log = console.log.bind(console)


//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)



// import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size


// If you want to use ECharts extensions, just import the extension package and it will work
// Taking ECharts-GL as an example:
// You only need to install the package with `npm install --save echarts-gl` and import it as follows
// import 'echarts-gl'

// register component to use
// Vue.component('v-chart', ECharts)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') 

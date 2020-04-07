import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Message, MessageBox } from 'element-ui'
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.use(VueAxios, axios)
// axios.defaults.baseURL = 'http'
// Vue.proptype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint)

Vue.config.productionTip = false

Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'http://39.98.214.214:3000'
Axios.defaults.headers['Accept'] = 'application/json'
Axios.defaults.headers['Content-Type'] = 'application/json'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

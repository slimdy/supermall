import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from "fastclick"
import lazyLoad from "vue-lazyload"
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(lazyLoad,{
  loading:require("./assets/img/common/placeholder.png")
})
//解决移动端300ms延迟点击
FastClick.attach(document.body)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

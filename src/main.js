import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios"

//导入底层组件
import App from './App.vue'
//导入登录页面
import Login from './pages/Login.vue'

//引入element-ui
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

const routes = [
  {path: '/login', component: Login},
  // { path: '/', redirect: "/login"}
]

//注册全局组件
Vue.use(ElementUI)
Vue.use(VueRouter)

//将axios绑定到Vue原形上，每个组件都可以使用
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: new VueRouter({ routes})
}).$mount('#app')


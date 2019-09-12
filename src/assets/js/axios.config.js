// axios配置
import Vue from 'vue'
import axios from 'axios'
// 设置axios 请求baseUrl

axios.defaults.baseURL = 'https://easy-mock.com/mock/5ceb51b551e3de74af53fe54/imooc/api'

/**
 * 设置拦截器, interceptor响应处理
 * 所有使用axios的请求响应,都会优先回调到拦截器中
 */
axios.interceptors.response.use((response) => {
  // 统一处理数据

  return response.data.data
}, (error) => {
  return Promise.reject(error)
})

Vue.prototype.$http = axios

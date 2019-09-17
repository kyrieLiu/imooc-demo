// axios配置
import Vue from 'vue'
import axios from 'axios'
// 设置axios 请求baseUrl

axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/'

axios.interceptors.request.use((config) => {
  // config.url = '/api' + config.url;

  // 当请求中存在 params 的时候，为 params 新增 token 字段
  // 同学运行此代码，需要替换 token 为，老师分配的Token。（QQ群:685831117 - @LGD_Sunday）
  if (config.params) {
    config.params.token = '43f2dfc0-d829-11e9-9d68-dff8203746c4'
  } else {
    // 当请求不存在 params 的时候，为它设置 params 对象
    config.params = {
      token: '43f2dfc0-d829-11e9-9d68-dff8203746c4'
    }
  }

  // 返回配置的 config
  return config
})

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

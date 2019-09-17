import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      // vue-router 懒加载 只有使用到goodsList才会加载
      component: () => import(/* webpackChunkName: "GoodsList" */'./views/GoodsList.vue')
    }

  ]
})

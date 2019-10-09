import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 *
 */

export default new Vuex.Store({
  state: {
    // 购物车数据
    shoppingDatas: []
  },
  mutations: {
    addShoppingData: function (state, goods) {
      state.shoppingDatas.push(goods)
    }
  },
  actions: {

  }
})

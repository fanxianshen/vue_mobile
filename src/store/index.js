import Vue from 'vue'
import Vuex from 'vuex'

// 引入拆分出去的子模块
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 将state数据都拆分到子模块中，那么我这个主模块还能不能有自己的state
  state: {
    name: '主'
  },
  modules: {
    user,
  }
})

export default store
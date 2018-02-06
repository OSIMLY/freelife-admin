import Vue from 'vue'
// 导入状态管理组件
import Vuex from 'vuex'
// 导入 app 模块
import app from './modules/app'
// 导入用户模块
import user from './modules/user'
// 导入全局计算属性
import getters from './getters'

Vue.use(Vuex)
// 初始化状态仓库
const store = new Vuex.Store({
  // 定义模块
  modules: {
    app,
    user
  },
  // 定义计算属性
  getters
})
// 导出仓库
export default store

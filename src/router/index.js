// 导入框架
import Vue from 'vue'
// 导入路由组件
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

// 注册路由组件
Vue.use(Router)

/* Layout */
// 导入基础布局组件
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
// 定义路由映射表
export const constantRouterMap = [
  // 登录页，异步载入，不显示在侧边栏
  { path: '/login', component: _import('login/index'), hidden: true },
  // 404 页
  { path: '/404', component: _import('404'), hidden: true },
  // 跟页面路由重定向仪表盘
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  // 示例页面
  {
    // 路径
    path: '/example',
    // 组件
    component: Layout,
    // 重定向至表格
    redirect: '/example/table',
    // 名称
    name: 'Example',
    // 附加信息
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  // 表单页面
  {
    path: '/form',
    // 主框架组件
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: _import('form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  // 所有匹配不到的全部指向 404
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


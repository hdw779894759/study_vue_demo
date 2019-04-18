// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入组件
import Vue from 'vue'
import Layout from './components/layout'
import VueRouter from 'vue-router'
import IndexPage from './pages/index'
import VueResource from 'vue-resource'

// 注册组件
Vue.use(VueRouter)    // 注册路由
Vue.use(VueResource)  // 注册请求资源

// 实例化路由组件
let router = new VueRouter({
  mode: 'history',
  routes:[
    {
      // 根目录使用index页面,【视图从父节点的layout中使用】
      path: '/',
      component:IndexPage
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Layout },
  // 将layout组件渲染到<Layout/>模板中
  template: '<Layout/>'
})

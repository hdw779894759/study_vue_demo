// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VRouter from 'vue-router'
import Vuex from 'vuex'
import Hello from './components/HelloWorld'
import ChineseHello from "./components/ChineseHello"


// 注册使用插件
Vue.use(VRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

// 实例化一个数据中心
let store = new Vuex.Store({

  // state代表状态集,可存放多个状态
  state: {
    totalPrice: 0
  },

  // 获取数据集中的数据方法
  getters: {
    getTotal(state) {
      return state.totalPrice
    }
  },

  // 设置动作
  mutations: {
    increment(state, price) {
      state.totalPrice += price;
    },
    decrement(state, price) {
      state.totalPrice -= price;
    }
  },
  // 通过dispatch调用action中的方法来控制mutation方法
  // 需要与后台交互时使用这种方法达到异步请求后台接口的效果
  actions: {
    increase(context, price) {
      context.commit('increment', price)
    }
  }
});

// 实例化一个路由
let router = new VRouter({
  //取消/#/模式，用历史模式记录
  mode:'history',
  //什么样的地址跳到什么样的页面上
  routes:[
    // 路由的重定向，当访问首页时跳转到hello
    {
      path:'/',
      redirect: "/apple"
    },
    {
      // 什么样的路径 [携带的参数color]
      path:'/hello',
      // 映射到什么样的组件上
      component:Hello,
      children:[
        {
          path:'chinese',
          component: ChineseHello
        }
      ]
    },
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,// 将实例化的路由插入到根组件中
  store,//全局使用store,可让所有子组件使用
  components: { App },
  template: '<App/>'

})

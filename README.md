# study_vue_demo

所有内容作为手记帮助自己理解使用，有些说法可能与真实知识点不太一致。望理解！

# 文件结构说明
        大部分开发都在src源码目录下
        index.html默认有一个js入口就是src下的main.js，在其中定义了index.html对应的id为app的Vue实例，
    该实例为根组件在App.vue文件中开放指明可被外界引入。
        App.vue作为根组件同时又通过components参数引入了HelloWorld组件，并通过import导入的方式指明该组件
    的来源在components目录下，而components目录就是存放所有组件的文件夹。
        assets文件表示配件，存放一些图片资源等。
        config目录和build目录为一些配置文件目录。
        
# vue文件说明
        export 表示输出，后面必须跟default，这样才能引入默认文件夹components的其他组件
        data(){return}:data作为函数声明的简写存在，其中return表示当组件被其他多个组件引用时不会共享一个变量，
      而是为每个组件都返回一个新的变量。function关键字都可以省略不写，直接写 方法名() 即可。
        
# 变量的声明
  - {var  }  在括号外可访问该变量
  - {let  }  在括号外不可访问该变量
  - const    声明常量

# 前端路由 vue-router
    1.安装方式：npm install vue-router --save
    2.使用
      - 在入口文件main.js中引入vue-vouter: import VRouter from 'vue-router'
      - 注册vue插件:Vue.use(VRouter)
      - 实例化路由：let router = new VRouter({})
      - 挂载到Vue对象中:new Vue({
                    el: '#app',
                    router,// 将实例化的路由插入到根组件中
                    components: { App },
                    template: '<App/>'
                  })
    3.参数配置
      mode:'history'表示用历史记录的方式去除url中的/#/描述符。
      此时当访问根目录时不需要hash，可直接访问
                  
## vue-router的语法配置说明
    1.vue-router实例中引入routes节点配置路由数组
      routes:[
              {
                // 什么样的路径
                path:'/hello',
                // 映射到什么样的组件上
                component:Hello
              },
            ]
            
    2.在挂载节点id=app的元素中使用路由的方式
      ①
        <div id="app">
          <img src="./assets/logo.png">
          <router-view></router-view>
        </div>
      ②
      <router-link :to="{path:'hello'}">to hello</router-link>
      此方式可添加to hello链接到路由配置的页面上。
      
    3.路由参数的使用
      添加路由参数的方法
      
      ① main.js中增加对Hello组件的路由配置url后面   :paramName
      routes:[
          {
            // 什么样的路径 [携带的参数color]
            path:'/hello/:color',
            // 映射到什么样的组件上
            component:Hello
          },
        ]
        
      ② Hello组件中使用该参数
        methods:{
            getParam() {
              // 打印路由中获取的参数
              console.log(this.$route.params);
            }
          }
      ③ 页面元素中使用该参数
      <p>{{$route.params.color}}</p>
    
    4.子组件的配置
        routes:[
            {
              // 什么样的路径 [携带的参数color]
              path:'/hello/:color',
              // 映射到什么样的组件上
              component:Hello,
              children:[
                {
                  path:'/chinese',
                  component: ChineseHello
                }
              ]
            },

# 状态管理Vuex
```js
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
```

# 项目案例手记
    添加页面的顺序
    1.在pages中添加一个组件，其中公用组件放在components目录下
    2.在路由中新增该页面匹配规则

## VueResource组件的使用过程
    1.安装组件
      cnpm install vue-resource --save
    2.引入组件   
      import VueResource from 'vue-resource'
    3.注册组件
      Vue.use(VueResource)
    4.使用组件
      this.$http

## json-server组件的使用
        该组件可以在前端人员开发时通过自己造数据模拟后端接口返回的数据来完成自己的工作。
    不需要等待后台接口完成后才能完成自己的开发工作，只需要提前根据前后端数据接口协议
    规范来造假数据，将json串写在文件中。
    1.安装组件
      cnpm install json-server --save
    2.webpack.dev.conf.js文件中引入json-server配置
      // jsonServer初始化
      var jsonServer = require('json-server')
      var apiServer = jsonServer.create()
      var apiRouter = jsonServer.router('db.json')
      var middlewares = jsonServer.defaults()
      
      apiServer.use(middlewares)
      apiServer.use(apiRouter)
      apiServer.listen(3000, function () {
        console.log('JSON Server is running')
      });
    3.直接启动项目即可
      访问json-server页面
      http://localhost:3000
    4.对所有接口添加代理配置
       /config/index.js的dev节点下增加如下配置
      proxyTable: {
           '/api/':'http://localhost:3000/'
         }
      【配置说明】访问/api/路径时走该ip访问
    5.配置统一的接口路径
    // 为db.json中接口增加统一的/api前缀
    apiServer.use('/api',apiRouter)

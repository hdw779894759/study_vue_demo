<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{ totalPrice}}
    <apple></apple>
    <banana></banana>

    <!--路由动画-->
    <!--<transition name="fade">-->
      <!--<keep-alive>-->
        <!--<router-view></router-view>-->
      <!--</keep-alive>-->
    <!--</transition>-->
    <!--<router-link :to="{path:'hello'}">to hello</router-link>-->
    <!--<router-link :to="{path:'hello/chinese'}">to chinese hello</router-link>-->



  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Apple from './components/Apple'
import Banana from './components/Banana'
export default {
  components: {Apple,Banana},
  computed:{
    // 获取全局变量
    totalPrice() {
      return this.$store.state.totalPrice;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

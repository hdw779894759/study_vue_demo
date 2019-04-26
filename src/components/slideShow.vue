<template>
    <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
      <div class="slide-img">
        <a :href="slides[nowIndex].href">
          <transition name="slide-trans">
            <img v-if="isShow" :src="slides[nowIndex].src">
          </transition>
          <transition name="slide-trans-old">
            <img v-if="!isShow" :src="slides[nowIndex].src">
          </transition>
        </a>
      </div>
      <h2>{{slides[nowIndex].title}}</h2>
      <ul class="slide-pages">
        <li @click="goto(prevIndex)">&lt;</li>
        <li v-for="item,index in slides" @click="goto(index)">
          <a :class="{on: index===nowIndex}">{{index+1}}</a>
        </li>
        <li @click="goto(nextIndex)">&gt;</li>
      </ul>
    </div>
</template>

<script>
export default {
  // 子组件为了完成自己的事情需要接手什么样的属性
  props:{
    slides:{
      // 设置属性slides的类型和默认值
      type:Array,
      default:[]
    },
    inv:{
      type: Number,
      default: 1000
    }
  },
  data() {
    return{
      nowIndex:0,
      isShow:true
    }
  },

  //通过计算属性实现翻页
  computed: {
    // 返回前一张，当前索引值为首张时，返回最后一张的索引值，可以用slides的长度减一来获取
    prevIndex(){
      if (this.nowIndex === 0) {
        return this.slides.length - 1
      } else {
        // 当前索引值非首张时，返回当前索引值-1
        return this.nowIndex - 1
      }
    },
    // 返回后一张，当前索引值为最后一张时，返回首张0的索引值
    nextIndex(){
      if (this.nowIndex === this.slides.length - 1) {
        return 0
      } else {
        // 否则处于中间索引值，返回索引值+1
        return this.nowIndex + 1
      }
    }
  },

  methods:{
    goto(index) {
      // 先隐藏
      this.isShow = false
      // 再显示
      setTimeout(() => {
        this.isShow = true
        this.nowIndex = index
        // 子组件向父组件交互，触发自定义事件
        this.$emit('onchange',index)
      },10);
    },
    runInv() {
      this.invId = setInterval(() => {
        this.goto(this.nextIndex)
      },this.inv);
    },

    // 当鼠标放在幻灯片上时，不让其自动翻页
    clearInv() {
      clearInterval(this.invId);
    }
  },

  // 组件渲染完毕以后运行方法
  mounted() {
    this.runInv()
  }
}
</script>

<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }
  .slide-trans-enter {
    transform: translateX(900px);
  }
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }
  .slide-show {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 900px;
    height: 500px;
    overflow: hidden;
  }
  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
  }
  .slide-img {
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }
  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }
  .slide-pages li .on {
    text-decoration: underline;
  }
</style>


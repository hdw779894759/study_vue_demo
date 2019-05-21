<!--此组件表示布局组件-->
<template>
  <div>
    <!--头部导航使用布局-->
    <div class="app-head">
      <div class="app-head-inner">
        <img src="../assets/logo.png">
        <div class="head-nav">
          <ul class="nav-list">
            <li> {{ username }} </li>
            <li v-if="username!==''" class="nav-pile">|</li>
            <li v-if="username!==''" class="nav-pile">退出</li>

            <li v-if="username===''" @click="logClick">登录</li>
            <li class="nav-pile">|</li>
            <li v-if="username===''" @click="regClick">注册</li>
            <li class="nav-pile">|</li>
            <li @click="aboutClick">关于</li>
          </ul>
        </div>
      </div>
    </div>

    <!--中间的内容使用路由-->
    <div class="app-content">
      <keep-alive>
         <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-foot">
      <p>©2019 vueDemo - David Han</p>
    </div>
    <my-dialog :is-show="isSHowAboutDialog" @on-close="closeDialog('isSHowAboutDialog')">
      <p>“厉害了，扬灵团队成员全部考上研究生了!” 近日， 随着2019年博士和硕士研究生录取结果的先后公布，经济贸易学院“扬灵团队”5名团队毕业生全部“上岸”的消息迅速传遍学院，引来众多师生热议，团队成为了学院里名副其实的“明星团队”。

        据悉，该团队2016级农村与区域发展专业硕士研究生杨绍闻同学被南京航空航天大学录取为博士研究生，2015级苏子超、杨晓松、周雪莹、刘艺航四名本科生分别被广州大学、福州大学、郑州大学、湖北省社会科学院录取为硕士研究生。</p>
    </my-dialog>
    <my-dialog :is-show="isSHowLogDialog" @on-close="closeDialog('isSHowLogDialog')">
      <log-form @has-log="onSuccessLog"></log-form>
    </my-dialog>
    <my-dialog :is-show="isSHowRegDialog" @on-close="closeDialog('isSHowRegDialog')">
      <reg-form></reg-form>
    </my-dialog>
  </div>
</template>

<script>
  import Dialog from './dialog'
  import LogForm from './LogForm'
  import RegForm from './regForm'
export default {
  components:{
    MyDialog:Dialog,
    LogForm,
    RegForm
  },
  data () {
    return {
      isSHowAboutDialog:false,
      isSHowLogDialog:false,
      isSHowRegDialog:false,
      username:''
    }
  },
  methods:{
    aboutClick() {
      this.isSHowAboutDialog = true
    },

    logClick() {
    this.isSHowLogDialog = true
    },

    regClick() {
    this.isSHowRegDialog = true

    },
    closeDialog(attr) {
      this[attr] = false;
    },
    onSuccessLog(data) {
      this.name = data.username
    }
  }
}
</script>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/
     v2.0 | 20110126
     License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 14px;
    color: #444;
  }
  .app-head {
    background: #363636;
    color: #b2b2b2;
    height: 90px;
    line-height: 90px;
    width: 100%;
  }
  .app-head-inner {
    width: 1200px;
    margin: 0 auto;
  }
  .head-logo {
    float: left;
  }
  .app-head-inner img {
    width: 50px;
    margin-top: 20px;
  }
  .head-nav {
    float: right;
  }
  .head-nav ul {
    overflow: hidden;
  }
  .head-nav li {
    cursor: pointer;
    float: left;
  }
  .nav-pile {
    padding: 0 10px;
  }
  .app-foot {
    text-align: center;
    height: 80px;
    width: 100%;
    line-height: 80px;
    background: #e3e4e8;
    clear: both;
    margin-top: 30px;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  .hr {
    height: 1px;
    width: 100%;
    background: #ddd;
  }
  .button {
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }
  .button:hover {
    background: #4fc08d;
  }
  .g-form {

  }
  .g-form-line {
    padding: 15px 0;
  }
  .g-form-label {
    width: 100px;
    font-size: 16px;
    display: inline-block;
  }
  .g-form-input {
    display: inline-block;
  }
  .g-form-input input {
    height: 30px;
    width: 200px;
    line-height: 30px;
    vertical-align: middle;
    padding: 0 10px;
    border: 1px solid #ccc;
  }
  .g-form-btn {
    padding-left: 100px;
  }
  .g-form-error {
    color: red;
    padding-left: 15px;
  }
</style>

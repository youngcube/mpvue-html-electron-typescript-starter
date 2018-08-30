import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch,
} from 'vue-property-decorator'
import { VueConstructor } from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import store from '@/store'

// 添加小程序hooks http://mpvue.com/mpvue/#_4，不建议在组件里使用，最好是用 Vue 自己的生命周期
Component.registerHooks([
  // app
  'onLaunch', // 初始化
  'onShow', // 当小程序启动，或从后台进入前台显示
  'onHide', // 当小程序从前台进入后台
  // pages
  'onLoad', // 监听页面加载
  'onShow', // 监听页面显示
  'onReady', // 监听页面初次渲染完成
  'onHide', // 监听页面隐藏
  'onUnload', // 监听页面卸载
  'onPullDownRefresh', // 监听用户下拉动作
  'onReachBottom', // 页面上拉触底事件的处理函数
  'onShareAppMessage', // 用户点击右上角分享
  'onPageScroll', // 页面滚动
  'onTabItemTap', // 当前是 tab 页时， 点击 tab 时触发 （mpvue 0.0.16 支持）
])

Vue.config.productionTip = false
// 绑定到原型链上 这样才能保证store能被mpvue调用
Vue.prototype.$store = store
// 在这个地方引入是为了registerHooks先执行
const MyApp = require('./app.vue').default

Vue.use(MpvueRouterPatch)

new Vue({
  store,
  ...MyApp,
}).$mount('#app')

new Vue(MyApp).$mount('#app')

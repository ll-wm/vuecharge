import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// axios({
//   url: 'http://123.207.32.32:8000/home/multidata',
//   methods:'get',

// }).then(res => {
//   console.log(res);
// })
// axios({
//   url: 'http://123.207.32.32:8000/home/data?type=sell&page=3',
//   methods:'get',

// }).then(res => {
//   console.log(res);
// })

//使用全局的axios在进行网络请求
// axios.defaults.baseURL = 'http://123.207.32.32:8000',
// axios.defaults.timeout = 5000
// axios.all([axios({
//   url:'/home/multidata'
// }),axios({
//   url:'http://123.207.32.32:8000/home/data',
//   params: {
//     type:'sell',
//     page: 5
//   }
// })]).then(result => {
//   console.log(result);
  
// })

//创建对应的axios示例
// const instancel = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000
// })
  

// instancel({
//   url:'/home/multidata'
// }).then(res => {
//   console.log(res);
// })

// instancel({
//   url:'http://123.207.32.32:8000/home/data',
//   params: {
//     type:'sell',
//     page: 5
//   }
// }).then(res => {
//   console.log(res);
// })

//封装request模块
// var datalist;
// request({
//   url:'blist/all/1/2'
//   }).then(res => {
//     console.log("mei");
//     console.log(res);
//     datalist = res;
//   }).catch(err => {
//     // console.log(err);
    
//   })
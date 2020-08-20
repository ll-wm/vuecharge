import axios from 'axios'

// export function request(config){
//   return new Promise((resolve,reject) => {
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
      
//     instance(config)
//       .then(res => {
//         // console.log(res);
//         resolve(res)
//       })
//       .catch(err => {
//         // console.log(err);
//         reject(err)
//       })
//   })
// }

export function request(config){
  //1.创建axios实例
  const instance = axios.create({
    // baseURL: 'http://localhost:1111/',
    timeout: 5000
  })

  //2.axios拦截器
  //2.1请求拦截
  instance.interceptors.request.use(aaa => {
    // console.log(aaa);
    //1.比如config中一些信息不符合服务器的要求

    //2.比如每次发送网络请求时，都希望在页面中显示一个请求的图标
    
    //3.某些网络请求(比如登录(token)),必须携带一些特殊的信息
    return aaa
  },err => {
    // console.log(err);
    
  })
  //2.2响应拦截
  instance.interceptors.response.use(res => {
    console.log('ok');
    console.log(res.data);
    return res.data
  },err => {
    console.log(err);
    
  })

  //3.发送真正的网络请求
  return instance(config)
}
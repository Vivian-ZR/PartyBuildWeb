/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

import axios from "axios"
import Qs from 'qs' // 引入qs模块，用来序列化post类型的数据
import store from '../store/index'


// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/PartBuilding';
}
else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = '/PartBuilding';
}
else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = '/PartBuilding';
}

// axios配置
axios.defaults.timeout = 500000000  // 请求时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // post请求头
axios.defaults.withCredentials = true // 设置跨域

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在tocken
    // 如果存在，则统一在http请求的header都加上tocken，这样后台根据tocken判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    let user = store.state.user;
    if (user === '') {
      return config;
    } else if (typeof (user) == "string") {
      user = JSON.parse(user);
    }

    const token = user.token;
    const id = user.id;
    config.headers.authorize_token = token;
    config.headers.authorize_uid = id;
    return config;
  },
  error => {
    return Promise.error(error);
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }    
  },
  // error => {
  //   if (error.status) {
  //     switch (error.status) {
  //       // 401: 未登录
  //       case 401:
  //         break;
  //       // 403: token过期
  //       case 403:
  //         break;
  //       // 404：请求不存在
  //       case 404:
  //         break;
  //       default:
  //         alert(error.data.message);
  //     }
  //     return Promise.reject(error);
  //   }
  // }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params = '') {
  return new Promise((resolve, reject) => {
    axios.post(
      url,
      Qs.stringify(params)
    ).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  })
}

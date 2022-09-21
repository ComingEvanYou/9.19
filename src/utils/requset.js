import axios from "axios";

const exceptionMessage = {
    1000 : '用户名或者密码发生错误',
    3000 : ''
  }

import {Message} from "element-ui"

const service = axios.create({
    // baseURL:"",
    timeout:5000
})
//请求拦截
service.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(function (response) {
    //表示请求成功
    if(response.status<400){
        return response.data.data
    }
    //代表token过期
    if(response.status === 401){
        return
    }
    //请求失败
    errorInfo(response.data.code,response.data.message)
    return response
}, function (error) {
    return Promise.reject(error)
})
    const errorInfo = (errorCode,message) => {
        let title
        title = exceptionMessage[errorCode] || message || '发生未知错误'
        Message.error(title)
    }

const requset = (options) => {

    options.method = options.method || 'get'
    if(options.method.toLowerCase() === "get"){
      options.params = options.data || options.params
      delete options.data
    }
  
    // 解决多个代理请求的问题
    service.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API
  
    return service(options)
  }


export default  requset
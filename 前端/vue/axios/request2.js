/*
 * @Author: DuFeng
 * @Date: 2021-07-08 11:45:46
 * @LastEditTime: 2021-09-09 13:32:58
 * @Description: 
 * @FilePath: \tools\前端\vue\axios\request2.js
 *  
 */

//状态信息
import store from '@/store';
import axios from 'axios';
import {
  ajaxHeadersTokenKey
} from '@/settings';

//token 标识符
const ajaxHeadersTokenKey='token';
/* 
常用 错误码
*/
const errorCode = [{
    code: 400,
    lable: '请求错误！'
  },
  {
    code: 401,
    lable: '登录信息已失效，请重新登录！'
  },
  {
    code: 403,
    lable: '身份验证失败，请重新登录！'
  },
  {
    code: 404,
    lable: '请求地址错误！'
  },
  {
    code: 408,
    lable: '请求超时！'
  },
  {
    code: 500,
    lable: '服务器内部错误！'
  },
  {
    code: 501,
    lable: '服务未找到！'
  },
  {
    code: 502,
    lable: '网关错误！'
  },
  {
    code: 503,
    lable: '服务不可用！'
  }
];

// 创建一个axios实例
const service = axios.create({
  //baseURL: process.env.VUE_APP_APIHOST, // url = api url + request url
  withCredentials: true, // 当跨域请求时发送cookie
  timeout: 10000 // 请求超时时间,5000(单位毫秒) / 0 不做限制
});

// 请求拦截器 - 在发送请求之前
service.interceptors.request.use(
  config => {
    // 如果设置了cType 说明是自定义 添加 Content-Type类型 为自定义post 做铺垫
    if (config.cType) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    // 请根据实际情况修改,携带token
    // if (store.getters.token) {
    //   config.headers[ajaxHeadersTokenKey] = store.getters.token;
    // }
    return config;
  },
  error => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(

  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data;
    const {
      status
    } = res;
    // 200，返回数据
    if(status===200){
      return res;
    } else {
      for (let item of errorCode) {
        if (item.code === status) {
          res.msg = item.lable;
          break;
        }
      }
    }
    return Promise.reject(new Error(res));
  },
  error => {
    let res = {
      msg: '未知错误！',
      status: 500
    };
    if (!error.response) {
      res.msg = '网络不可用，请检查网络是否连接！';
      res.status = 404;
    } else {
      for (let item of errorCode) {
        if (item.code === error.response.status) {
          res.msg = item.lable;
          res.status = item.code;
          break;
        }
      }
    }
    return Promise.reject(error);
  }
);
export default service;
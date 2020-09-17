import axios from 'axios';
import config from '../common/config';
import { Notification } from 'element-ui';
import JSONBig from 'json-bigint';
import {GET_TOKEN} from '../vuex/mutations';
import stores from '../common/store';

axios.defaults.baseURL = config.api; // 设置axios的基础请求路径
axios.defaults.timeout = 2000; // 设置axios的请求时间
axios.defaults.headers.common['Authorization'] = stores.state.token;
axios.defaults.transformResponse = function(data) {
  let parse = JSONBig.parse(data);
  return parse;
};

// request拦截器
axios.interceptors.request.use(
  config => {
    // 根据条件加入token-安全携带
    if (stores.state.token) {
      config.headers.common['Authorization'] = stores.state.token;
    }
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

/*
 *  get请求
 *  url:请求地址
 *  params:参数
 * */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'get',
      params: params
    }).then(response => {
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

/*
 *  post请求
 *  url:请求地址
 *  params:参数
 * */
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: params
    }).then(response => {
      // if (response.code === '200') {
      //   Notification.success('成功');
      // }
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

/*
 *  put请求
 *  url:请求地址
 *  params:参数
 * */
export function put(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'put',
      data: params
    }).then(response => {
      if (response.code === '200') {
        // Notification.success('修改成功');
      }
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}
/*
 *  delete请求
 *  url:请求地址
 *  params:参数
 * */
export function del(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'delete',
      data: params
    }).then(response => {
      if (response.code === '200') {
        Notification.success('删除成功');
      }
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

/*
 *  文件上传
 *  url:请求地址
 *  params:参数
 * */
export function fileUpload(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(response => {
      if (response.code === '200') {
        Notification.success('上传文件成功');
      }
      resolve(response);
    }).catch(error => {
      reject(error);
    });
  });
}

// respone拦截器
axios.interceptors.response.use(
  response => {
    // 统一处理状态
    const res = response.data;
    if (res.code === '401' || res.code === '500' || res.code === '400') { // 需自定义
      // 返回异常
      // Notification.error(res.message);
      console.log('异常');
    }
    return response.data;
  },
  // 处理处理
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.log('错误请求');
          break;
        case 401:
          console.log('未授权，请重新登录');
          break;
        case 403:
          console.log('拒绝访问');
          break;
        case 404:
          console.log('请求错误,未找到该资源');
          break;
        case 405:
          console.log('请求方法未允许');
          break;
        case 408:
          console.log('请求超时');
          break;
        case 500:
          console.log('服务器端出错');
          break;
        case 501:
          console.log('网络未实现');
          break;
        case 502:
          console.log('网络错误');
          break;
        case 503:
          console.log('服务不可用');
          break;
        case 504:
          console.log('网络超时');
          break;
        case 505:
          console.log('http版本不支持该请求');
          break;
        default:
          console.log(`未知错误${error.response.status}`);
      }
    } else {
      // Notification.error('连接到服务器失败');
    }
    return Promise.reject(error);
  }
);

export default {
  get,
  post,
  put,
  del,
  fileUpload
};

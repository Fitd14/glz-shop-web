import Vue from 'vue';
import VueResource from 'vue-resource';
import { Message } from 'view-design';

Vue.use(VueResource);
let apiUrlUrl = 'http://localhost:80';

export const setErrorMessage = (message) => {
  Message.error({
    content: '消息'
  });
};

export const setSuccessMessage = (message) => {
  Message.success({
    content: '消息'
  });
};

export const get = (url) => {
  Vue.http.get(apiUrlUrl + url).then((response) => {
    // 相应成功的回调
    setSuccessMessage(response);
    return response.data;
  }, (response) => {
    // 相应失败的回调
    setErrorMessage(response);
  });
};

export const post = (url, body) => {
  Vue.http.post(apiUrlUrl + url, body).then((response) => {
    setSuccessMessage(response);
  }, (response) => {
    setErrorMessage(response);
  });
};

export const put = (url, body) => {
  Vue.http.put(apiUrl + url, body).then((response) => {
    setSuccessMessage(response);
  }, (response) => {
    setErrorMessage(response);
  });
};

export const del = (url) => {
  Vue.http.put(apiUrl + url).then((response) => {
    setSuccessMessage(response.message);
  }, (response) => {
    setErrorMessage(response.message);
  });
};

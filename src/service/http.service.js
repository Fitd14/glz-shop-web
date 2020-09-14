import Vue from 'vue';
import {setErrorMessage, setSuccessMessage} from './message';

let apiUrlUrl = 'http://localhost:80';

export const get = (url) => {
  Vue.http.get(apiUrlUrl + url).then((response) => {
    // 相应成功的回调
    setSuccessMessage(response.bodyText);
    return response;
  }, (response) => {
    // 相应失败的回调
    setErrorMessage(response.bodyText);
  });
};

export const post = (url, body) => {
  Vue.http.post(apiUrlUrl + url, body).then((response) => {
    setSuccessMessage(response.bodyText);
    return response;
  }, (response) => {
    setErrorMessage(response.bodyText);
  });
};

export const put = (url, body) => {
  Vue.http.put(apiUrl + url, body).then((response) => {
    setSuccessMessage(response.bodyText);
    return response;
  }, (response) => {
    setErrorMessage(response.bodyText);
  });
};

export const del = (url) => {
  Vue.http.put(apiUrl + url).then((response) => {
    setSuccessMessage(response.bodyText);
    return response;
  }, (response) => {
    setErrorMessage(response.bodyText);
  });
};

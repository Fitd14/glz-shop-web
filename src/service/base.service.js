import {get, post, put, del} from './http.service';
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export const UserLogin = (data) => {
  const url = '/auth/login';
  return post(url, data);
};

export const userRegister = ({commit}, data) => {
  const url = '/user/login';
  return post(url, data);
};

export const addShipAddress2 = (data) => {
  const url = '/ship/add';
  return post(url, data);
};
// 查找所有省份
export const province = (data) => {
  const url = '/province';
  return post(url, data);
};
// 查找一个省份所有城市
export const city = () => {
  const url = '/city';
  return post(url);
};
// 查找一个城市的所有地区
export const area = () => {
  const url = '/area';
  return post(url);
};

// 根据用户ID获取该用户的所有收货地址
export const detailArea = (id) => {
  const url = '/ship/area/' + id;
  return get(url);
};

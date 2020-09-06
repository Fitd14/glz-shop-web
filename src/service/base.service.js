import {get, post, put, del} from './http.service';

export const UserLogin = (data) => {
  const url = '/auth/login';
  return post(url, data);
};

export const UserRegister = (data) => {
  const url = '/user/login';
  return post(url, data);
};

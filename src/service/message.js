import Vue from 'vue';
import { Message } from 'view-design';

Vue.use(Message);

export const setErrorMessage = (message) => {
  Message.error({
    content: '消息',
    background: true
  });
};

export const setSuccessMessage = (message) => {
  Message.success(message);
};

export const setInfoMessage = (message) => {
  Message.info({
    content: message
  });
};

export const setWarnMessage = (message) => {
  Message.warning({
    content: message
  });
};

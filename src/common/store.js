import Vue from 'vue';
import vuex from 'vuex';

Vue.use(vuex);

const stores = new vuex.Store({
  state: {
    token: '',
    refToken: '',
    userInfo: {
      username: ''
    }
  },
  mutations: {
    set_token  (state, token, refToken) {
      state.token = token;
      state.refToken = refToken;
      sessionStorage.token = token;
    },
    del_token (state) {
      state.token = '';
      sessionStorage.removeItem('token');
    }
  }
});

export default stores;

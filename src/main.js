// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ViewUi from 'view-design';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'v-distpicker';
import VDistpicker from 'v-distpicker';

Vue.component('v-distpicker', VDistpicker)
Vue.use(ElementUI);
Vue.use(ViewUi);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

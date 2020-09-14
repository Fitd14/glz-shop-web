// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ViewUi from 'view-design';
import 'iview/dist/styles/iview.css';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import moment from 'vue-moment';
import VDistpicker from 'v-distpicker';

Vue.component('v-distpicker', VDistpicker);
Vue.use(ElementUI);
Vue.use(ViewUi);
Vue.use(VueResource);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;
Vue.prototype.moment = moment;
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD') {
  return moment(dateStr).format(pattern);
});
Vue.filter('moneyFormat', function(money, pattern = '¥') {
  return moment(money).format(pattern + money);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});

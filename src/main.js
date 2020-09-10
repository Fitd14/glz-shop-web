// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ViewUi from 'view-design';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';

Vue.use(ViewUi);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(require('vue-moment'));
Vue.prototype.moment = moment;
Vue.filter('dateFormat', function(dateStr, pattern='YYYY-MM-DD'){
  return moment(dateStr).format(pattern);
});
Vue.filter('moneyFormat', function(money, pattern='¥'){
  return moment(money).format(pattern + money);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import store from '../common/store';
import stores from '../common/store';
const Login = resolve => require(['@/components/Login'], resolve);
const SignUp = resolve => require(['@/components/SignUp'], resolve);
const CheckPhone = resolve => require(['@/components/signUp/CheckPhone'], resolve);
const InputInfo = resolve => require(['@/components/signUp/InputInfo'], resolve);
const SignUpDone = resolve => require(['@/components/signUp/SignUpDone'], resolve);
const GoodsList = resolve => require(['@/components/GoodsList'], resolve);
const GoodsDetail = resolve => require(['@/components/GoodsDetail'], resolve);
const ShoppingCart = resolve => require(['@/components/ShoppingCart'], resolve);
const Order = resolve => require(['@/components/Order'], resolve);
const Pay = resolve => require(['@/components/Pay'], resolve);
const PayDone = resolve => require(['@/components/PayDone'], resolve);
const Freeback = resolve => require(['@/components/Freeback'], resolve);
const Home = resolve => require(['@/components/Home'], resolve);
const MyAddress = resolve => require(['@/components/home/MyAddress'], resolve);
const MyUserInfo = resolve => require(['@/components/home/MyUserInfo'], resolve);
const OrderItem = resolve => require(['@/components/home/OrderItem'], resolve);
const OrderBack = resolve => require(['@/components/home/OrderBack'], resolve);
const AddAddress = resolve => require(['@/components/home/AddAddress'], resolve);
const MyOrder = resolve => require(['@/components/home/MyOrder'], resolve);
const MyShoppingCart = resolve => require(['@/components/home/MyShoppingCart'], resolve);
const Merchant = resolve => require(['@/components/Merchant'], resolve);

Vue.use(Router);

if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'));
}

const router = new Router({
  routes: [
    {
      path: '/', // 首页
      name: 'Index',
      component: Index
    },
    {
      path: '/Login', // 登录
      name: 'Login',
      component: Login
    },
    {
      path: '/SignUp', // 注册
      name: 'SignUp',
      component: SignUp,
      children: [
        {
          path: '/',
          name: 'index',
          component: CheckPhone
        },
        {
          path: 'checkPhone',
          name: 'CheckPhone',
          component: CheckPhone
        },
        {
          path: 'inputInfo',
          name: 'InputInfo',
          component: InputInfo
        },
        {
          path: 'signUpDone',
          name: 'SignUpDone',
          component: SignUpDone
        }
      ]
    },
    {
      path: '/goodsList', // 商品列表
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/goodsDetail', // 商品详情
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/shoppingCart', // 商品详情
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/order', // 订单页面
      name: 'Order',
      meta: {requireAuth: true},
      component: Order
    },
    {
      path: '/pay', // 支付页面
      name: 'Pay',
      meta: {requireAuth: true},
      component: Pay
    },
    {
      path: '/payDone', // 支付成功页面
      name: 'PayDone',
      meta: {requireAuth: true},
      component: PayDone
    },
    {
      path: '/freeback', // 反馈页面
      name: 'Freeback',
      meta: {requireAuth: true},
      component: Freeback
    },
    {
      path: '/home', // 主页
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'HomeIndex',
          component: MyOrder
        },
        {
          path: 'myAddress',
          name: 'MyAddress',
          component: MyAddress
        },
        {
          path: 'orderItem',
          name: 'OrderItem',
          meta: {requireAuth: true},
          component: OrderItem
        },
        {
          path: 'orderBack',
          name: 'OrderBack',
          meta: {requireAuth: true},
          component: OrderBack
        },
        {
          path: 'orderItem/:orderNo',
          name: 'OrderItem',
          meta: {requireAuth: true},
          component: OrderItem
        },
        {
          path: 'addAddress',
          name: 'AddAddress',
          meta: {requireAuth: true},
          component: AddAddress
        },
        {
          path: 'addAddress/:id',
          name: 'AddAddress',
          meta: {requireAuth: true},
          component: AddAddress
        },
        {
          path: 'myOrder',
          name: 'MyOrder',
          component: MyOrder,
          /*,
          meta: {
            keepAlive: true
          }*/
          meta: {requireAuth: true},
        },
        {
          path: 'myShoppingCart',
          name: 'MyShoppingCart',
          meta: {requireAuth: true},
          component: MyShoppingCart
        },
        {
          path: 'myUserInfo',
          name: 'MyUserInfo',
          meta: {requireAuth: true},
          component: MyUserInfo
        }
      ]
    },
    {
      path: '/merchant',
      name: 'Merchant',
      component: Merchant
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) { // 这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (stores.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      });
    }
  } else {
    next();
  }
});

export default router;

<template>
  <div id="app">
    <Header></Header>
    <router-view v-if="isRouterAlive"></router-view>
    <!-- 部分路由不应该包含这个Footer -->
    <Footer v-if="excludeRoutes.indexOf($route.name) == -1"></Footer>

  </div>
</template>

<script>
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import {Message} from 'view-design';
export default {
  name: 'App',
  data () {
    return {
      excludeRoutes: ['HomeIndex', 'MyAddress', 'AddAddress', 'MyOrder', 'MyShoppingCart'],
      isRouterAlive: true
    };
  },
  components: {
    Header,
    Footer,
    Message
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
};
</script>

<template>
  <div id="app">
    <Header v-if="isRouterAlive"></Header>
    <router-view v-if="isRouterAlive"></router-view>
    <!--
    // 頁面缓存不刷新
      <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    -->
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
    data() {
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
    methods: {
      reload() {
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        });
      }
    },
    provide() {
      return {
        reload: this.reload
      };
    }
  };
</script>

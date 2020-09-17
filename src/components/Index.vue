<template>
  <div class="container">
    <Search></Search>
    <HomeNav></HomeNav>
    <!-- 商品显示区域 -->
    <div class="content">
      <!-- 电脑专场 -->
      <div class="item-class">
        <div class="item-class-head">
          <span class="item-class-title">{{this.classify1.name}}</span>
          <ul>
            <li v-for="(item, index) in classify1Subclass" :key="index">
              <router-link to="/goodsList">{{item.name}}</router-link>
            </li>
          </ul>
        </div>
        <div class="item-class-content" v-for="(item, index) in classify2Info" :key="index">
          <div class="item-content-top">
            <div class="item-big-img">
              <router-link :to="{path:'/goodsList',query:{id:item.id}}">
                <img v-bind:src="item.photo" alt="" style="width: 180px; height: 260px;" width="160px" height="160px">
              </router-link>
            </div>
            <div class="item-four-img">
              <div class="item-four-detail" v-for="(item, index) in classify1Info" :key="index">
                <div class="item-four-detail-text">
                  <p class="pt_bi_tit">{{item.brand}}</p>
                  <p class="pt_bi_promo">{{item.price}}</p>
                </div>
                <div class="item-four-detail-img">
                  <router-link :to="{path:'/goodsList',query:{id:item.category}}">
                    <img :src="item.photo" alt="" width="130px" height="130px">
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="item-content-bottom">
            <div class="item-content-bottom-img" v-for="(subImg, index) in item.itemContent" :key="index">
              <router-link to="/goodsList">
                <img :src="subImg">
              </router-link>
            </div>
          </div>
        </div>
      </div>


      <!-- 爱吃专场 -->
      <div class="item-class">
        <div class="item-class-head item-class-eat-head">
          <span class="item-class-title">{{eat.title}}</span>
          <ul>
            <li v-for="(item, index) in eat.link" :key="index">
              <router-link to="/goodsList">{{item}}</router-link>
            </li>
          </ul>
        </div>
        <div class="item-class-content" v-for="(item, index) in eat.detail" :key="index">
          <div class="item-content-top">
            <div class="item-big-img">
              <img :src="item.bigImg" alt="">
            </div>
            <div class="item-four-img">
              <div class="item-four-detail" v-for="(subItem, index) in item.itemFour" :key="index">
                <div class="item-four-detail-text">
                  <p class="pt_bi_tit pt_bi_tit-eat">{{subItem.title}}</p>
                  <p class="pt_bi_promo">{{subItem.intro}}</p>
                </div>
                <div class="item-four-detail-img">
                  <router-link to="/goodsList">
                    <img :src="subItem.img" alt="">
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="item-content-bottom">
            <div class="item-content-bottom-img" v-for="(subImg, index) in item.itemContent" :key="index">
              <router-link to="/goodsList">
                <img :src="subImg">
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search';
import HomeNav from '@/components/nav/HomeNav';
import store from '@/vuex/store';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import axios from 'axios';
import {get} from '../service/http.service';
export default {
  name: 'Index',
  created () {
    this.loadSeckillsInfo();
    this.loadCarouselItems();
    this.loadComputer();
    this.loadEat();
    this.loadShoppingCart();
    get('/commodityCategory/selById?id=55').then(res => {
      this.classify1 = res.data;
      console.log(this.classify1);
      get('commodityCategory/subclass?parentId=' + this.classify1.id).then(res => {
        this.classify1Subclass = res.data;
        console.log(this.classify1Subclass);
      });
      get('/commodity/category?category=' + 68).then(res => {
        this.classify2Info = res.data;
        console.log(this.classify1Info);
      });
      get('/commodity/category?category=' + 56).then(res => {
        this.classify1Info = res.data;
        console.log(this.classify1Info);
      });
    });
  },
  mounted () {
    const father = this;
    this.setIntervalObj = setInterval(function () {
      father.REDUCE_SECKILLS_TIME();
    }, 1000);
  },
  data () {
    return {
      setIntervalObj: null,
      classify1: [],
      classify1Subclass: [],
      classify1Info: [],
      classify2Info: []
    };
  },
  methods: {
    ...mapActions(['loadSeckillsInfo', 'loadCarouselItems', 'loadComputer', 'loadEat', 'loadShoppingCart']),
    ...mapMutations(['REDUCE_SECKILLS_TIME'])
  },
  computed: {
    ...mapState([ 'seckills', 'computer', 'eat' ]),
    ...mapGetters([ 'seckillsHours', 'seckillsMinutes', 'seckillsSeconds' ])
  },
  components: {
    Search,
    HomeNav
  },
  destroyed () {
    clearInterval(this.setIntervalObj);
  },
  store
};
</script>

<style scoped>
.container {
  background-color: #F6F6F6;
}
.content {
  width: 1008px;
  margin: 0px auto;
}
/*定义闹钟震动动画关键帧*/
@keyframes shake-clock {
  0% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(-8deg);
  }
}
.seckill-text {
  width: 300px;
  height: 100%;
  float: left;
}
.seckill-text .seckill-title {
  font-size: 22px;
  line-height: 50px;
  color: #fff;
}
.seckill-text .seckill-remarks {
  margin-left: 5px;
  font-size: 10px;
  color: #fff;
}
/*倒计时*/
.count-down {
  height: 100%;
  margin-right: 30px;
  line-height: 50px;
  float: right;
}
.count-down-text {
  color: #fff;
}
.count-down-num {
  padding: 3px;
  border-radius: 5px;
  background-color: #440106;
  font-size: 26px;
  font-weight: bold;
  color: #f90013;
}
.count-down-point {
  font-size: 26px;
  font-weight: bold;
  color: #440106;
}

.seckill-content {
  width: 100%;
  height: 280px;
}
.seckill-item {
  width: 183px;
  height: 250px;
  margin-top: 15px;
  margin-left: 15px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
  float: left;
}
.seckill-item-img {
  width: 160px;
  height: 160px;
  margin: 0px auto;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
.seckill-item-img img {
  width: 130px;
  height: 130px;
  margin-left: 15px;
  margin-top: 15px;
  transition: margin-top 0.3s;
}
.seckill-item-img:hover img {
  margin-top: 6px;
  transition: margin-top 0.3s;
}
.seckill-item-info {
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 12px;
  color: #009688;
}
.seckill-item-info i:first-child {
  font-size: 14px;
}
.seckill-price {
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}
/*****************************秒杀专栏结束*****************************/

/*****************************商品专栏开始*****************************/
.item-class {
  width: 100%;
  height: 470px;
  margin-top: 15px;
  background-color: #fff;
}
.item-class-head {
  width: 100%;
  height: 50px;
  background-color: #4488a7;
}
.item-class-eat-head {
  background-color: #ecb226;
}
.item-class-head ul {
  list-style: none;
  float: right;
  margin-right: 30px;
  line-height: 50px;
}
.item-class-head a {
  padding: 6px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6da6be;
  border: 1px solid #6da6be;
  text-decoration: none;
  color: #fff;
}
.item-class-eat-head a {
  background-color: #eeb955;
  border: 1px solid #eeb955;
}
.item-class-head a:hover {
  border: 1px solid #fff;
}
.item-class-head li {
  float: left;
}
.item-class-title {
  font-size: 25px;
  line-height: 50px;
  color: #fff;
  margin-left: 15px;
}
.item-class-content {
  width: 49%;
  cursor: pointer;
  border-right: 1px solid #ccc;
  margin-left: 0.9%;
  /*background-color: #cff;*/
  float: left;
}
.item-class-content:nth-child(odd) {
  border: none;
}
.item-content-top {
  width: 100%;
  height: 260px;
}
.item-big-img {
  width: 180px;
  height: 260px;
  overflow: hidden;
  float: left;
}
.item-big-img img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-big-img:hover img {
  margin-left: -15px;
  transition: margin-left 0.3s;
}
.item-four-img {
  width: 303px;
  margin-left: 8px;
  float: left;
}
.item-four-detail img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-four-detail:hover img {
  margin-left: -6px;
  transition: margin-left 0.3s;
}
.item-four-detail {
  width: 152px;
  height: 130px;
  margin-left: -1px;
  float: left;
}
.item-four-detail:first-child {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.item-four-detail:last-child {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.item-four-detail-text {
  width: 50px;
  margin-left: 5px;
  margin-top: 15px;
  float: left;
}
.item-four-detail-img {
  width: 96px;
  margin-top: 15px;
  overflow: hidden;
  float: left;
}
.item-four-detail-img img {
  margin-left: 5px;
  width: 90px;
}
.pt_bi_tit {
  font-weight: bold;
  font-size: 12px;
  color: #4488a7;
}
.pt_bi_tit-eat {
  color: #ecb127;
}
.pt_bi_promo {
  color: #00695c;
}
.item-content-bottom {
  width: 100%;
  margin-top: 8px;
}
.item-content-bottom-img {
  width: 156px;
  margin-right: 8px;
  overflow: hidden;
  float: left;
}
.item-content-bottom-img img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-content-bottom-img:hover img {
  margin-left: -15px;
  transition: margin-left 0.3s;
}
/*****************************商品专栏结束*****************************/
</style>

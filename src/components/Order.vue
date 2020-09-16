<template>
  <div>
    <Search></Search>
    <GoodsListNav></GoodsListNav>
    <div class="goods-list-container">
        <Table border ref="selection" :columns="columns" :data="this.datas" size="large"
        @on-selection-change="select" no-data-text="您的购物车没有商品，请先添加商品到购物车再点击购买">
        </Table>
        <div class="address-container">
          <h3>收货人信息</h3>
          <div class="address-box">
            <div class="address-check">
              <div class="address-check-name">
                <span>
                  <Icon type="ios-checkmark-outline"></Icon> {{temp.name}}
                </span>
              </div>
              <div class="address-detail">
                <p>{{temp.address}}</p>
              </div>
            </div>
            <Collapse>
              <Panel>
                选择地址
                <p slot="content">
                  <!--   <RadioGroup vertical size="large" @on-change="changeAddress">
                     <Radio :label="item.addressId" v-for="(item, index) in address" :key="index">
                       <span>{{item.name}} {{item.province}} {{item.city}} {{item.address}} {{item.phone}} {{item.postalcode}}</span>
                     </Radio>
                   </RadioGroup>-->
                  <RadioGroup vertical @on-change="changeModel">
                    <Radio :label="item.id" v-for="item in shipAddress" :value="item.id" :key="item.id">
                      <span>{{item.name}}</span>
                    </Radio>
                  </RadioGroup>
                  <!-- <RadioGroup vertical size="large" @on-change="changeModel">
                   <Radio :label="item.id" v-for="(item, index) in shipAddress" :key="index">
                     <span>{{item.name}}</span>
                   </Radio>
                 </RadioGroup>-->
                </p>
              </Panel>
            </Collapse>
          </div>
        </div>
        <div class="remarks-container">
          <h3>备注</h3>
          <i-input v-model="remarks" size="large" placeholder="在这里填写备注信息" class="remarks-input"></i-input>
        </div>
        <div class="invoices-container">
          <h3>发票信息</h3>
          <p>该商品不支持开发票</p>
        </div>
        <div class="pay-container">
          <div class="pay-box">
            <p><span>提交订单应付总额：</span> <span class="money">
                <Icon type="social-yen"></Icon> {{totalPrice.toFixed(2)}}
              </span>
            </p>
            <div class="pay-btn">
              <router-link to="/pay">
                <Button type="error" size="large">支付订单</Button>
              </router-link>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import Search from '@/components/Search';
  import GoodsListNav from '@/components/nav/GoodsListNav';
  import store from '@/vuex/store';
  import {
    mapState,
    mapActions
  } from 'vuex';
  import qs from 'qs'
  import axios from 'axios';
  const url = 'http://localhost:8070';
  export default {
    name: 'Order',
    beforeRouteEnter(to, from, next) {
      window.scrollTo(0, 0);
      next();
    },
    created() {
      this.loadAddress();
      this.getShipAddress(1);
      axios.get('http://localhost:7000/cart/list/batch', {
        params: {
          userId: 1,
          commodityIds: [this.$route.params.ids]
        },
        paramsSerializer: function(params) {
          return qs.stringify(params, {
            arrayFormat: 'repeat'
          })
        }
      }).then(res => {
        this.datas = res.data.data;
        for (let i = 0; i < this.datas.length; i++) {
          axios.get('http://localhost:9500/commodity/selectOne/' + this.datas[i].commodityId).then(res => {
            this.columns.title = res.data.data.commoditySubHead;
            console.dir(this.columns.title)
          });
        }
      })
    },
    data() {
      return {
        goodsCheckList: [],
        datas: [],
        columns: [{
            title: '图片',
            key: 'img',
            width: 86,
            align: 'center'
          },
          {
            title: '标题',
            key: 'title',
            align: 'center',
          },
          {
            title: '数量',
            key: 'commodityCount',
            width: 68,
            align: 'center'
          },
          {
            title: '单价',
            width: 68,
            key: 'price',
            align: 'center'
          },
          {
            title: '总价',
            width: 80,
            key: 'totalPrice',
            align: 'center'
          }
        ],
        checkAddress: {
          name: '未选择',
          address: '请选择地址',
        },
        remarks: ''
      };
    },
    computed: {
      ...mapState(['address', 'shoppingCart']),
      totalPrice() {
        let price = 0;
        this.goodsCheckList.forEach(item => {
          price += item.price * item.count;
        });
        return price;
      }
    },
    methods: {
      ...mapActions(['loadAddress']),
      getData() {
        console.dir('aaa');
        this.$http.get('http://localhost:8070/order/aaa').then(function(reponse) {
          console.dir(reponse.body);
        });
      },
      select(selection, row) {
        console.log(selection);
        this.goodsCheckList = selection;
      },
      order() {
        console.log('111111111');
        this.login(this.name).then(result => {
          console.log(result);
        });
      },
      changeAddress(data) {
        const father = this;
        this.address.forEach(item => {
          if (item.addressId === data) {
            father.checkAddress.name = item.name;
            father.checkAddress.address =
              `${item.name} ${item.province} ${item.city} ${item.address} ${item.phone} ${item.postalcode}`;
          }
        });
      },
      changeModel(data) {
        const father = this;
        this.shipAddress.forEach(item => {
          if (item.id === data) {
            father.temp.id = item.id;
            father.temp.name = item.name;
            father.temp.address = item.province;
            console.dir('----------');
            console.dir(father.temp.id)
          }
        });
      },
      getShipAddress(userId) {
        axios.get(url + '/ship/area/' + userId).then(res => {
          this.shipAddress = res.data.data;
          console.dir(this.shipAddress)
        })
      }
    },
    mounted() {
      setTimeout(() => {
        this.$refs.selection.selectAll(true);
      }, 500);
    },
    components: {
      Search,
      GoodsListNav
    },
    store
  };
</script>

<style scoped>
  .goods-list-container {
    margin: 15px auto;
    width: 80%;
  }

  .tips-box {
    margin-bottom: 15px;
  }

  .address-container {
    margin-top: 15px;
  }

  .address-box {
    margin-top: 15px;
    padding: 15px;
    border: 1px #ccc dotted;
  }

  .address-check {
    margin: 15px 0px;
    height: 36px;
    display: flex;
    align-items: center;
  }

  .address-check-name {
    width: 120px;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #ccc;
  }

  .address-check-name span {
    width: 120px;
    height: 36px;
    font-size: 14px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    background-color: #f90013;
  }

  .address-detail {
    padding-left: 15px;
    font-size: 14px;
    color: #999999;
  }

  .remarks-container {
    margin: 15px 0px;
  }

  .remarks-input {
    margin-top: 15px;
  }

  .invoices-container p {
    font-size: 12px;
    line-height: 30px;
    color: #999;
  }

  .pay-container {
    margin: 15px;
    display: flex;
    justify-content: flex-end;
  }

  .pay-box {
    font-size: 18px;
    font-weight: bolder;
    color: #495060;
  }

  .money {
    font-size: 26px;
    color: #f90013;
  }

  .pay-btn {
    margin: 15px 0px;
    display: flex;
    justify-content: flex-end;
  }
</style>

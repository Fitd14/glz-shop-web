<!--<template>
  <div>
    <Table border :columns="columns" :data="order" size="large" no-data-text="你还有订单，快点去购物吧"></Table>
    <div class="page-size">
      <Page :total="100" show-sizer></Page>
    </div>
  </div>

</template>-->
<template>
  <div>
    <div style="margin-left: 65%">
      <Button type="primary" @click="unpay(1,0)">待发货</Button>
      <Button type="primary" @click="unpay(1,1)">待收货</Button>
      <Button type="primary" @click="getStatus(1,0)">待付款</Button>
      <Button type="primary" @click="getStatus(1,1)">已付款</Button>
      <br/>
    </div>
    <br/>
    <Table border :columns="columns" :data="temp" height="500px">
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" @click="getData(row)" style="margin-right: 5px">详情</Button>
        <Button type="error" size="small" @click="delOrder(row)">删除</Button>
      </template>
    </Table>
    <div>
      <br/>
      <Page
        :total="dataCount"
        :page-size="pageSize"
        show-sizer class="paging"
        :page-size-opts=[2,3,5]
        @on-change="changeIndex"
        @on-page-size-change="pageSizes"
      ></Page>
    </div>
  </div>
</template>


<script>
  import axios from 'axios';
  import store from '@/vuex/store';

  const url = 'http://localhost:8070';
  export default {
    inject: ['reload'],
    name: 'MyOrder',
    data() {
      return {
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 2,
        // 当前页码
        page: 1,
        order: [],
        // 临时存放
        temp: [],
        columns: [
          {
            title: '订单号',
            key: 'orderNo',
            fixed: 'left',
            width: 100
          },
          {
            title: 'userId',
            key: 'userId',
            render: (h, params) => {
              return h('Icon', {
                style: {
                  display: 'none'
                }
              }, params.row.userId)
            }
          },
          {
            title: '支付金额',
            key: 'payment',
            width: 100
          },
          {
            title: '支付状态',
            key: 'paymentStatus',
            width: 100,
            render: (h, params) => {
              let status = params.row.paymentStatus;
              if (status === 0) {
                return h('p', '未支付')
              }
              if (status === 1) {
                return h('p', '已支付')
              }
            }
          },
          {
            title: '发货状态',
            key: 'paymentTime',
            width: '170px'
          },
          {
            title: '创建时间',
            key: 'createTime',
            width: '170px'
          },
          {
            title: '更新时间',
            key: 'updateTime',
            width: '170px'
          },
          {
            title: '收件人',
            key: 'shipName',
            width: 100
          },
          {
            title: '邮政编码',
            key: 'postCode',
            width: 100
          },
          {
            title: '联系方式',
            key: 'phone',
            width: 100
          },
          {
            title: '省份',
            key: 'province',
            width: 100
          },
          {
            title: '城市',
            key: 'city',
            width: 100
          },
          {
            title: '详细地区',
            key: 'region',
            width: 100
          },
          {
            title: '具体地址',
            key: 'detailAddress',
            width: 100
          },
          {
            title: '操作栏',
            slot: 'action',
            width: 150,
            align: 'center',
            fixed: 'right'
          }
        ]
      };
    },
    created() {
      axios.get(url + '/order/1').then(res => {
        this.order = res.data.data.data;
        this.tempPage();
      });
    },
    computed: {},
    methods: {
      unpay(userId, payStatus) {
        let aaa = url + '/order/pay/status?userId=' + userId + '&payStatus=' + payStatus;
        console.dir(aaa);
        axios.get(url + '/order/pay/status?userId=' + userId + '&payStatus=' + payStatus).then(res => {
          console.dir(res)
          this.order = res.data.data;
          this.dataCount = this.order.length;
          this.tempPage();
        });
      },
      getStatus(userId, payStatus) {
        axios.get(url + '/order/status?userId=' + userId + '&status=' + payStatus).then(res => {
          this.order = res.data.data;
          this.dataCount = this.order.length;
          this.tempPage();
        });
      },
      tempPage() {
        this.temp = this.order;
        if (this.dataCount < this.pageSize) {
          this.temp = this.order;
        } else {
          this.temp = this.order.slice(0, this.pageSize);
        }
      },
      changeIndex(index) {
        console.dir(index),
          this.page = index;
        let _start = (index - 1) * this.pageSize;
        let _end = index * this.pageSize;
        this.temp = this.order.slice(_start, _end);
        console.dir(this.temp);
      },
      pageSizes(index) {
        let _start = (this.page - 1) * index;
        let _end = this.page * index;
        this.temp = this.order.slice(_start, _end);
      },
      getData(row) {
        this.$router.push({name: 'OrderItem', params: {orderNo: row.orderNo}})
      },
      delOrder(row) {
        console.log(row.orderNo);
        this.$confirm('是否要删除该品牌', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(url + '/order/del/' + row.orderNo).then(res => {
            if (res.data.code === '200') {
              this.reload();
              console.dir('success');
            }
          });
        });
      }
    }
  };

</script>

<style scoped>
  .page-size {
    margin: 15px 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>

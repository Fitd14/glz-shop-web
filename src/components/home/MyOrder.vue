<!--
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
-->
<template>
  <div>
    <div>
      <div class="searchBox">
        <el-button size="mini" type="text" @click="unpay(userId,0)">未支付</el-button>
        <el-button size="mini" type="text" @click="unpay(userId,1)">已支付</el-button>
        <el-button size="mini" type="text" @click="getStatus(userId,0)">未发货</el-button>
        <el-button size="mini" type="text" @click="getStatus(userId,1)">已发货</el-button>
        <el-button size="mini" type="text" @click="begin()">重置</el-button>
        <el-input size="mini" v-model="tableDataName" placeholder="请输入订单编号" style="width:240px"></el-input>
        <el-button type="primary" size="mini" @click="doFilter">搜索</el-button>
      </div>
      <el-table border
                :header-cell-style="{'text-align':'center'}"
                :data="tableDataEnd.slice((currentPage-1)* pageSize,currentPage* pageSize)"
                stripe style="width: 100%;" ref="multipleTable">
        <el-table-column align="center" prop="orderNo" label="订单编号">
        </el-table-column>
        <!-- <el-table-column align="center" v-if="false" prop="userId" label="用户ID">
         </el-table-column>-->
        <!--  <el-table-column prop="userName" label="用户">
          </el-table-column>-->
        <el-table-column align="center" prop="payment" label="总价"></el-table-column>
        <el-table-column align="center" prop="status" label="发货状态">
          <template slot-scope="scope">
            <div v-text="changeStatus(scope.row.status)"></div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="paymentStatus" label="支付状态">
          <template slot-scope="scope">
            <div v-text="setPaymentStatus(scope.row.paymentStatus)"></div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="shipName" label="收件人"></el-table-column>
        <el-table-column prop="phone" align="center" label="联系方式"></el-table-column>
        <el-table-column prop="province" v-if="false" align="center" label="省份"></el-table-column>
        <el-table-column prop="city" v-if="false" align="center" label="城市"></el-table-column>
        <el-table-column prop="region" v-if="false" align="center" label="收货地区"></el-table-column>

        <el-table-column prop="detailAddress" align="center" label="收货地区">
          <template slot-scope="scope">
            <div v-text="scope.row.province + scope.row.city + scope.row.region"></div>
          </template>
        </el-table-column>

        <el-table-column prop="memo" label="备注" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <!--<el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>-->
        <el-table-column label="操作" align="center" width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini" @click="getData(scope.row)">
              详情
            </el-button>
            <el-button
              size="mini"
              type="danger" @click="delOrder(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {get} from '../../service/http.service';
  import {getUserInfo} from '../../vuex/actions';
  import store from '@/vuex/store';

  const url = 'http://localhost:80';
  export default {
    inject: ['reload'],
    name: 'MyOrder',
    data() {
      return {
        user: null,
        userId: '',
        tableDataName: "",
        tableDataEnd: [],
        filterTableDataEnd: [],
        flag: false,
        stata: null,
        revive: null,
        datas: [],
        multipleTable: [],
        currentPage: 1,//默认显示第一页
        pageSize: 5,//默认每页显示10条
        totalNum: 1000 //总页数
        /* // 初始化信息总条数
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
         ]*/
      };
    },
    created() {
      /* axios.get(url + '/order/1').then(res => {
         this.order = res.data.data.data;
         this.tempPage();
       });*/

      this.begin();

    },
    computed: {},
    methods: {
      setPaymentStatus(paymentStatus) {
        if (paymentStatus === 1) {
          return '已支付';
        } else {
          return '未支付';
        }
      },
      changeStatus(val) {
        if (val === 0) {
          return '未发货'
        } else if (val === 1) {
          return '已发货';
        } else if (val === 2) {
          return '已申请退货';
        } else if (val === 3) {
          return '已退货';
        } else {
          return '退货失败';
        }
      },
      begin() {
        getUserInfo().then(res => {
          this.user = res.data;
          console.dir(this.user)
          this.userId = this.user.userId;
          get('/order/' + this.userId).then(res => {
            console.dir(res.data);
            this.datas = res.data.data;
            this.totalNum = this.datas.length;
            this.tableDataEnd = this.datas;
          });
        });

      },
      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableDataEnd.push(list[from]);
          }
        }
      },
      //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
      //用两个变量接收currentChangePage函数的参数
      doFilter() {
        if (this.tableDataName === "") {
          this.$message.warning("查询条件不能为空！");
          this.begin();
          return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        this.datas.forEach((value, index) => {
          if (value.orderNo) {
            if (value.orderNo.indexOf(this.tableDataName) >= 0) {
              this.filterTableDataEnd.push(value)
            }
          }
        });
        //页面数据改变重新统计数据数量和当前页
        this.currentPage = 1
        this.totalItems = this.filterTableDataEnd.length
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
        //页面初始化数据需要判断是否检索过
        this.flag = true
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;    //动态改变
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;    //动态改变
      },
      unpay(userId, payStatus) {
        get('/order/pay/status?userId=' + userId + '&payStatus=' + payStatus).then(res => {
          console.dir(res)
          this.datas = res.data;
          this.totalNum = this.datas.length;
          this.tableDataEnd = this.datas;
        });
      },
      getStatus(userId, status) {
        get('/order/status?userId=' + userId + '&status=' + status).then(res => {
          this.datas = res.data;
          this.totalNum = this.datas.length;
          this.tableDataEnd = this.datas;
        });
      },

      getData(row) {
        this.$router.push({name: 'OrderItem', query: {orderNo: row.orderNo}})
      },


      delOrder(row) {
        this.$confirm('是否要删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          get('/order/del/' + row.orderNo).then(res => {
            console.dir(res);
            if (res.data.code === '200') {
              console.dir('success');
            }
          });
          this.reload();
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

  .searchBox {
    margin-left: 5%;
  }
</style>

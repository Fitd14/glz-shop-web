<template>
  <div>
    <div>
      <Button type="primary" @click="goto" style="margin-left: 90%">返回</Button>
    </div>
    <div>
      <br/>
      <el-table :data="datas.slice((currentPage-1)* pageSize,currentPage* pageSize)"
                :current-page.sync="currentPage"
                stripe border style="width: 100%">
        <el-table-column v-if="false" prop="id" label="ID" width="180"></el-table-column>
        <el-table-column v-if="false" prop="orderNo" label="订单号" width="180"></el-table-column>
        <el-table-column v-if="false" prop="userId" label="用户ID"></el-table-column>
        <el-table-column v-if="false" prop="memo" label="描述"></el-table-column>
        <el-table-column prop="commodityId" label="商品ID"></el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
        <el-table-column prop="price" label="金额"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div v-text="changeStatus(scope.row.status)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini" @click="odBack(scope.row)">
              申请退货
            </el-button>
            <el-button
              size="mini"
              type="danger" disabled @click="">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-left: 30%">
      <br/>
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
  import store from '@/vuex/store';
  import {mapState, mapActions} from 'vuex';
  import router from '../../router';
  import {get, post} from "../../service/http.service";

  const url = 'http://localhost:80';
  export default {
    inject: ['reload'],
    name: 'OrderItem',
    data() {
      return {
        orderBack: {
          orderNo: '',
          commodityId: '',
          memo: ''
        },
        orderNo: '',
        datas: [],
        multipleTable: [],
        currentPage: 1, // 默认显示第一页
        pageSize: 5, // 默认每页显示10条
        totalNum: 1000 // 总页数
      };
    },
    created() {
      this.orderNo = this.$route.query.orderNo;
      console.dir(this.orderNo);
      get('/orderItem/list?orderNo=' + this.orderNo).then(result => {
        console.dir(result.data);
        this.datas = result.data;
        console.dir(this.datas.length);
        this.totalNum = this.datas.length;
      });
    },
    computed: {},
    methods: {
      changeStatus(val) {
        if (val === 0) {
          return '未发货';
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
      odBack(row) {
        console.dir(row)
        if (row.status !== 0 && row.status !== 1) {
          this.$message({
            type: 'success',
            message: '此订单已退货或正在申请退货'
          });
        } else {
          this.$router.push({name: "OrderBack", query: {id: row.id}})
        }
      },
      open(data) {
        if (data.status !== 0 && data.status !== 1) {
          this.$message({
            type: 'success',
            message: '此订单已退货或正在申请退货'
          });
        } else {
          this.$prompt('请输入原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: '',
            inputErrorMessage: '不能为空且10字以上'
          }).then(({value}) => {
            this.$message({
              type: 'success',
              message: value
            });
            this.orderBack.orderNo = data.orderNo;
            this.orderBack.commodityId = data.commodityId;
            this.orderBack.memo = value;
            console.dir(this.orderBack);
            post('/orderBack/insert', this.orderBack).then(res => {
              console.dir(res.data);
            });
            data.status = 2;
            console.dir('************');
            console.dir(data);
            axios.post(url + '/orderItem/udp', data).then(res => {
              console.dir(res.data);
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        }
      },
      goto() {
        this.$router.back();
        // this.$router.push('MyOrder');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val; // 动态改变
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val; // 动态改变
      }
    }
    ,
    store
  }
  ;
</script>

<style scoped>
  .go-to {
    margin: 15px;
    display: flex;
    justify-content: flex-end;
  }

  .dis {
    display: none;
  }
</style>

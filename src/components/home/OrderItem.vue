<template>
  <div>
    <div>
      <el-table :data="datas.slice((currentPage-1)* pageSize,currentPage* pageSize)"
                :current-page.sync="currentPage"
                stripe border style="width: 100%">
        <el-table-column v-if="false" prop="id" label="ID" width="180"></el-table-column>
        <el-table-column v-if="false" prop="orderNo" label="订单号" width="180"></el-table-column>
        <el-table-column v-if="false" prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="commodityId" label="商品ID"></el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
        <el-table-column prop="price" label="金额"></el-table-column>
        <el-table-column prop="status" label="运输状态"></el-table-column>
        <el-table-column prop="memo" label="备注"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column prop="storeId" label="所属店铺"></el-table-column>
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
  import store from '@/vuex/store';
  import {mapState, mapActions} from 'vuex';
  import router from '../../router';

  const url = 'http://localhost:8070';
  const userId = 1;
  export default {
    inject: ['reload'],
    name: 'MyShoppingCart',
    data() {
      return {
        orderNo: null,
        datas: [],
        multipleTable: [],
        currentPage: 1,//默认显示第一页
        pageSize: 1,//默认每页显示10条
        totalNum: 1000 //总页数
      };
    },
    created() {
      this.orderNo = this.$route.params.orderNo;
      console.dir(this.orderNo);
      axios.get(url + '/orderItem/list?orderNo=' + this.orderNo).then(result => {
        console.dir(result.data);
        this.datas = result.data.data;
        console.dir(this.datas.length);
        this.totalNum = this.datas.length;
      });
     // this.totalNum=this.datas.length;
    },
    computed: {},
    methods: {
      goto() {
        this.$router.push('MyOrder');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;    //动态改变
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;    //动态改变
      },
    },
    store
  };
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

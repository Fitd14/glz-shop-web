<template>
  <div>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()" type="primary">取消选择</el-button>
      <el-button @click="batchDelete()" type="danger">批量删除</el-button>
      <el-button @click="clearCart()" type="danger">清空购物车</el-button>
    </div>
    <el-table :data="this.datas.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 100%;" ref="multipleTable"
      :default-sort="{prop: 'date', order: 'descending'}" height="370" @selection-change="handleSelectionChange"
      empty-text="您的购物车没有商品，请先添加商品到购物车再点击购买">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="commodityName" label="商品" align="center">
      </el-table-column>
      <el-table-column prop="price" label="单价" align="center">
        <template slot-scope="scope">
          {{scope.row.price| money}}
        </template>
      </el-table-column>
      <el-table-column prop="commodityCount" label="数量" align="center">
        <template slot-scope="scope">
          <el-input-number size="mini" :min="1" v-model="scope.row.commodityCount" @change="handleChangeLevels(scope.row)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="总价" align="center">
        <template slot-scope="scope">
          {{scope.row.totalPrice| money}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="日期" sortable align="center">
        <template slot-scope="scope">{{scope.row.createTime | dateF}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="go-to">
      <Button @click="goTo" type="primary" width="180">去付款</Button>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30, 40]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="this.datas.length">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import store from '@/vuex/store';
  import {
    mapState,
    mapActions
  } from 'vuex';
  import axios from 'axios';
  import qs from 'qs'
  import {
    get,
    put,
    del
  } from '../../service/http.service';
  import {
    getUserInfo
  } from "../../vuex/actions";
  import moment from 'moment';
  export default {
    inject: ['reload'],
    name: 'MyShoppingCart',
    data() {
      return {
        userId: '',
        datas: [],
        multipleSelection: [],
        currentPage: 1, //初始页
        pagesize: 5, //每页的数据
        num: 1,
        ids: [],
      };
    },
    filters: {
      dateF: function(v) {
        return moment(v).format('YYYY-MM-DD');
      },
      money: function(v) {
        return moment(v).format('¥' + v);
      }
    },
    created() {
      getUserInfo().then(res => {
        this.userId = res.data.userId;
        this.getCart(this.userId);
      });
    },
    methods: {
      getCart(userId) {
        get('/cart/list/' + userId).then(res => {
          this.datas = res.data;
        });
      },
      goTo() {
        for (var i = 0; i < this.multipleSelection.length; i++) {
          this.ids.push(this.multipleSelection[i].commodityId);
        }
        if (this.ids.length <= 0) {
          alert('请选择想要购买的商品！');
        } else {
          this.$router.push('/order/' + this.ids);
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      batchDelete() {
        for (var i = 0; i < this.multipleSelection.length; i++) {
          this.ids.push(this.multipleSelection[i].commodityId);
        }
        this.$confirm('您确认要删除选中吗？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del('/cart/delete/batch?userId=' + this.userId + '&commodityIds=' + this.ids);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.reload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      clearCart() {
        this.$confirm('您确认要清空购物车吗？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del('/cart/deleteAll?userId=' + this.userId);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.reload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleDelete(row) {
        this.$confirm('您确认要删除吗？', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del('/cart/delete?userId=' + this.userId + '&commodityId=' + row.commodityId);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.reload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSizeChange: function(size) {
        this.pagesize = size; //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage; //点击第几页
      },
      handleChangeLevels(row) {
        put('/cart/update/count?userId=' + this.userId + '&commodityId=' + row.commodityId + '&commodityCount=' + row.commodityCount);
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
</style>

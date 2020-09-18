<template>
  <div>
    <div>
      <div class="searchBox">

        <!--<div >

          <el-button  type="primary" size="mini" @click="begin()">重置</el-button>
          <el-input size="mini" v-model="tableDataName" placeholder="请输入订单编号" style="width:240px"></el-input>
            <el-button type="primary" size="mini" @click="doFilter">搜索</el-button>
        </div>-->
      </div>
      <el-table border
                :data="tableDataEnd.slice((currentPage-1)* pageSize,currentPage* pageSize)"
                stripe style="width: 100%;" height='550px' ref="multipleTable">
        <el-table-column prop="photo" label="商品图片" width="90">
          　　　　<template slot-scope="scope">
          <img :src="scope.row.photo" width="80" height="50" class="img"/>
        </template>
        </el-table-column>
        <el-table-column prop="id" label="收藏编号">
        </el-table-column>
        <el-table-column v-if="false" prop="userId" label="用户ID">
        </el-table-column>
        <el-table-column prop="commodityName" label="商品名"></el-table-column>
        <el-table-column prop="price" label="收藏时商品价格"></el-table-column>
        <el-table-column prop="brand" label="商品分类"></el-table-column>
        <el-table-column label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini" @click="getData(scope.row)">
              详情
            </el-button>
            <el-button
              size="mini"
              type="danger" @click="delCollect(scope.row)">删除
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
  //import {get, post} from "../../service/http.service";
  import 'element-ui/lib/theme-chalk/index.css';
  import store from '@/vuex/store';

  const url = 'http://localhost:80/';
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

      };
    },
    created() {
      this.begin();
    },
    computed: {},
    methods: {
      begin() {
        getUserInfo().then(res=>{
          this.user = res.data;
          this.userId = this.user.userId;
          /*get("shop/collect/getListUid/" + this.userId).then(res => {
            this.datas = res.data.data;
            this.totalNum = this.datas.length;
            this.tableDataEnd = this.datas;
          })*/
          //未封装调用方法
          this.$http.get(url+"shop/collect/getListUid/" + this.userId).then(res => {
            this.datas = res.data.data;
            this.totalNum = this.datas.length;
            this.tableDataEnd = this.datas;
          })
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


      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;    //动态改变
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;    //动态改变
      },
      unpay(userId, payStatus) {
        axios.get(url + '/order/pay/status?userId=' + userId + '&payStatus=' + payStatus).then(res => {
          console.dir(res)
          this.datas = res.data;
          this.totalNum = this.datas.length;
          this.tableDataEnd = this.datas;
        });
      },


      getData(row) {
        this.$router.push({name: 'OrderItem', query: {orderNo: row.orderNo}})
      },


      delCollect(row) {
        console.log(row.orderNo);
        this.$confirm('是否要删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         /* delete('shop/delete/' + row.id).then(res => {
            if (res.data.code === '200') {
              this.reload();
              console.dir('success');
            }*/
            //未封装调用方法
          this.$http.delete(url + 'shop/delete/' + row.id).then(res => {
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

  .searchBox {
    margin-left: 75%;
  }
</style>

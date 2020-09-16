<template>
  <div>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <div>
      <el-table border
                :data="datas.slice((currentPage-1)* pageSize,currentPage* pageSize)"
                :current-page.sync="currentPage"
                stripe style="width: 100%;" height='450px' ref="multipleTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-if="false" prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="收件人"></el-table-column>
        <el-table-column prop="province" label="省"></el-table-column>
        <el-table-column prop="city" label="市"></el-table-column>
        <el-table-column prop="area" label="县"></el-table-column>
        <el-table-column prop="region" label="收件地址"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="postCode" label="邮政编码"></el-table-column>
        <el-table-column label="操作" width="200px" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini" @click="handleEdit(scope.row)">
              更新
            </el-button>
            <el-button
              size="mini"
              type="danger" @click="handleDelete(scope.row)">删除
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
  import store from '@/vuex/store';
  import {get} from "../../service/http.service";
  import {mapState, mapActions} from 'vuex';

  const url = 'http://localhost:80';
  const userId = 1;
  export default {
    inject: ['reload'],
    name: 'MyShoppingCart',
    data() {
      return {
        datas: [],
        multipleTable: [],
        currentPage: 1,//默认显示第一页
        pageSize: 5,//默认每页显示10条
        totalNum: 1000 //总页数
      };
    },
    created() {
      console.dir('aaa');
      /* axios.get(url + '/ship/area/' + userId).then(result => {
         console.dir(result.data);
         if(result.data != null){
           this.datas = result.data;
           console.dir(this.datas);
           this.totalNum = this.datas.length;
         }else {
           this.datas = null;
           this.totalNum = 0;
         }

       });*/
      get('/ship/area/' + userId).then(result => {
        console.dir(result.data);
        if (result.data != null) {
          this.datas = result.data;
          console.dir(this.datas);
          this.totalNum = this.datas.length;
        } else {
          this.datas = null;
          this.totalNum = 0;
        }

      });
    },
    computed: {},
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;    //动态改变
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;    //动态改变
      },
      handleEdit(row) {
        this.$router.push({name: 'AddAddress', query: {id: row.id}})
      },
      handleDelete(row) {
        console.log(row.id);
        this.$confirm('是否要删除该地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          get('/ship/area/del/' + row.id).then(res => {
            if (res.data.code === '200') {
              this.reload();
              console.dir('success');
            }
          });
        });
      },
      toggleSelection(rows) {
        console.dir(rows);
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
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

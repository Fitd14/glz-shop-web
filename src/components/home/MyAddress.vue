<template>
  <div>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <div>
      <el-table border
                :header-cell-style="{'text-align':'center'}"
                :data="datas.slice((currentPage-1)* pageSize,currentPage* pageSize)"
                :current-page.sync="currentPage"
                stripe style="width: 100%;" height='450px' ref="multipleTable">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" v-if="false" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" prop="name" label="收件人"></el-table-column>
       <!-- <el-table-column align="center" prop="province" label="省"></el-table-column>
        <el-table-column align="center" prop="city" label="市"></el-table-column>
        <el-table-column prop="area" align="center" label="县"></el-table-column>
        <el-table-column prop="region" align="center" label="收件地址"></el-table-column>-->
        <el-table-column prop="detailAddress" align="center" label="收货地区">
          <template slot-scope="scope">
            <div v-text="scope.row.province + scope.row.city + scope.row.region"></div>
          </template>
        </el-table-column>
        <el-table-column prop="phone" align="center" label="手机号码"></el-table-column>
        <el-table-column prop="postCode" align="center" label="邮政编码"></el-table-column>
        <el-table-column align="center" label="操作" width="200px" fixed="right">
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
  import store from '@/vuex/store';
  import {get} from "../../service/http.service";
  import {getUserInfo} from '../../vuex/actions';
  import {mapState, mapActions} from 'vuex';

  const url = 'http://localhost:80';
  export default {
    inject: ['reload'],
    name: 'MyShoppingCart',
    data() {
      return {
        userId: '',
        user: null,
        datas: [],
        multipleTable: [],
        currentPage: 1,//默认显示第一页
        pageSize: 5,//默认每页显示10条
        totalNum: 1000 //总页数
      };
    },
    created() {
      getUserInfo().then(res => {
        this.user = res.data;
        console.dir(this.user.userId);
        this.userId = this.user.userId;
        get('/ship/area/' + this.userId).then(result => {
          console.dir('--------------------------')
          console.dir(this.userId);
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
            if (res.code === '200') {
              this.reload();
              this.$message.success("删除成功");
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

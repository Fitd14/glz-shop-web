<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>修改个人信息</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100">
          <FormItem label="" prop="id">
            <i-input id="id" v-model="formData.id" size="large"></i-input>
          </FormItem>
          <FormItem label="昵称" prop="userId">
            <i-input id="nickname" v-model="formData.nickname" size="large"></i-input>
          </FormItem>
          <FormItem label="手机号" prop="phone">
            <i-input v-model="formData.phone" size="large"></i-input>
          </FormItem>
          <FormItem label="性别" prop="gender">
            <i-input v-model="formData.gender" size="large"></i-input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <i-input v-model="formData.email" size="large"></i-input>
          </FormItem>
<!--          <FormItem label="生日" prop="birthday">-->
<!--            <el-date-picker v-model="formData.birthday" type="date" placeholder="选择日期" size="large" ></el-date-picker>-->
<!--          </FormItem>-->
        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary" v-on:click="modify(formData)">确认修改</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import Distpicker from 'v-distpicker';
  import {mapActions} from 'vuex';
  import {addShipAddress, loadAddress} from '../../vuex/actions';
  import {getUserInfo} from '../../vuex/actions';
  import router from '../../router';
  import {get, post, put} from '../../service/http.service'

  export default {
    name: 'AddAddress',
    data() {
      return {
        id: 0,
        user: null,
        userId: '',
        formData: {
          userId: '',
          username: '',
          phone: '',
          gender:'',
          birthday:'',
          email:'',
        },
      };
    },
    created() {
        this.getData();
    },
    methods: {
      ...mapActions(['loadAddress', 'addShipAddress', 'UserLogin']),

      modify(data) {
        if(this.formData.gender === "男"){
            this.formData.gender = 0
        }else{
            this.formData.gender = 1
        }
        put("/user/member/modify/info",this.formData).then(resp=>{
          this.$message.success('修改成功');
          this.getData();
        })
      },
      getData(dat) {
        getUserInfo().then(res => {
            this.user = res.data;
            this.userId = this.user.userId;
            this.formData = res.data;
            if(this.formData.gender === 0){
                this.formData.gender = "男"
            }else{
                this.formData.gender = "女"
            }
        });
      },
      getProvince(data) {
        this.formData.province = data.value;
      },
      getCity(data) {
        this.formData.city = data.value;
      },
      getArea(data) {
        this.formData.area = data.value;
      }
    },
    components: {
      Distpicker
    }
  };
</script>

<style scoped>
  .add-container {
    margin: 15px auto;
    width: 60%;
    min-width: 600px;
  }

  .add-title {
    margin-bottom: 15px;
    text-align: center;
  }

  .add-submit {
    display: flex;
    justify-content: center;
  }

  #userId {
    display: none;
  }

  #id {
    display: none;
  }
</style>

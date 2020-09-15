<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>添加/更新收货地址</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="" prop="id">
            <i-input id="id" v-model="formData.id" size="large"></i-input>
          </FormItem>
          <FormItem label="" prop="userId">
            <i-input id="userId" v-model="formData.userId" size="large"></i-input>
          </FormItem>
          <FormItem label="收件人" prop="name">
            <i-input v-model="formData.name" size="large"></i-input>
          </FormItem>
          <FormItem label="收件地区" prop="address">
            <!--  <v-distpicker :province="formData.province" :city="formData.city" :area="formData.area"></v-distpicker>-->
            <Distpicker :province="formData.province" :city="formData.city" :area="formData.area"
                        @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
          </FormItem>
          <FormItem label="收件地址" prop="region">
            <i-input v-model="formData.region" size="large"></i-input>
          </FormItem>
          <FormItem label="手机号码" prop="phone">
            <i-input v-model="formData.phone" size="large"></i-input>
          </FormItem>
          <FormItem label="邮政编码" prop="postalcode">
            <i-input v-model="formData.postCode" size="large"></i-input>
          </FormItem>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary" v-on:click="aaa(formData)">添加/更新地址</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import Distpicker from 'v-distpicker';
  import {mapActions} from 'vuex';
  import {addShipAddress, loadAddress} from '../../vuex/actions';
  import axios from 'axios';
  import router from '../../router';
  import {get} from '../../service/http.service'

  const url = 'http://localhost:80';
  export default {
    name: 'AddAddress',
    data() {
      return {
        id: 0,
        formData: {
          id: '',
          userId: '1',
          name: '',
          postCode: '',
          detailAddress: '',
          phone: '',
          province: '',
          city: '',
          area: '',
          region: ''
        },
        ruleInline: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          detailAddress: [
            {required: true, message: '请输入地址', trigger: 'blur'}
          ],
          postCode: [
            {required: true, message: '请输入邮政编码', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.id = this.$route.query.id;
      console.dir(this.id);
      if (this.id != null) {
        /*axios.get(url + '/ship/area/id/' + this.id).then(res => {
          if (res.data.data != null) {
            this.formData = res.data.data;
            console.dir(this.formData);
          } else {
            console.dir('aaa');
          }
        });*/
        get('/ship/area/id/' + this.id).then(res => {
          if (res.data != null) {
            this.formData = res.data;
            console.dir(this.formData);
          } else {
            console.dir('aaa');
          }
        })
      }
    },
    methods: {
      ...mapActions(['loadAddress', 'addShipAddress', 'UserLogin']),
      aaa(data) {
        console.dir(data);
        if (data.area !== '' && data.city !== '' && data.region !== ''
          && data.name !== '' && data.postCode !== '') {
          let i = data.id;
          axios.post(url + '/ship/add', data).then(res => {
            console.dir(res.data);
            if (i !== '') {
              this.$message({
                message: '恭喜你，更新成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              });
            }
          });
        } else {
          const h = this.$createElement;
          this.$notify({
            title: '失败',
            message: h('i', {style: 'color: red'}, '请填写完整信息')
          });
        }
      },
      getData(dat) {
        console.dir('aaa');
        console.dir(this.formData);
        console.dir(dat);
        axios.post('http://localhost:8070/ship/add', dat).then(res => {
          console.dir(res.data)
        })
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

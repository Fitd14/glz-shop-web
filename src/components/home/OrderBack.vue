<template>
  <!--  <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
        { required: true, message: '年龄不能为空'},
        { type: 'number', message: '年龄必须为数字值'}
      ]"
      >
        <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>-->
  <el-form label-width="100px">
    <el-form-item label="详情描述">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="详情描述">
      <el-upload
        action='http://192.168.115.61:80/orderFile/upload'
        :show-file-list="true"
        :auto-upload="true"
        :accept="'image/*'"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="handleBeforeUpload"
        :on-progress="handleProgress"
      >
        <el-button type="primary" size="medium">上传图片</el-button>
      </el-upload>
      <!--
        action: 图片上传的地址
        show-file-list: 是否显示文件上传列表
        accept: 可接受的上传类型，image/*为图片
        headers: 头部信息
        on-success: 上传成功事件
        on-error: 上传失败事件
        before-upload: 上传前处理事件，返回一个值，值为false将阻止上传
        on-progress: 上传中事件
        -->
    </el-form-item>
    <el-form-item>
      <el-button type="primary">提交</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Distpicker from 'v-distpicker';
  import {mapActions} from 'vuex';
  import {addShipAddress, loadAddress} from '../../vuex/actions';
  import {getUserInfo} from '../../vuex/actions';
  import router from '../../router';
  import {get, post} from '../../service/http.service'

  const uploadUrl = 'http://192.168.115.61:80/file/upload';
  export default {
    name: 'AddAddress',
    data() {
      return {
        orderNo: '',
        commodityId: '',
        orderBack: {
          orderNo: '',
          commodityId: '',
          img: '',
          memo: ''
        },
      };
    },
    created() {
      this.orderNo = this.$route.query.orderNo;
      this.commodityId = this.$route.query.commodityId;
      console.dir(this.orderNo + '---' + this.commodityId)
    },
    methods: {
      ...mapActions(['loadAddress', 'addShipAddress', 'UserLogin']),
      /*----- 以下为常用处理代码 ------*/
      handleSuccess(response, file, fileList) {
        console.dir(response);
        console.log("上传成功");
      },
      handleError() {
        console.log("上传失败,请重新上传图片!");
      },
      handleBeforeUpload(file) {
        const isImage = file.type.includes("image");
        if (!isImage) {
          this.$message.error("上传文件类型必须是图片!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return isImage && isLt2M;
      },
      handleProgress(event, file, fileList) {
        this.loading = true;  //  上传时执行loading事件
      }
    },
    components: {}
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

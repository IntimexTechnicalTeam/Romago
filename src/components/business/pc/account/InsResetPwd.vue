<template>
  <div id="memberConterContainer" class="resetPWD">
        <p class="pageTitle">{{$t('Forgetpassword.ResetPwd')}}</p>
         <div class="resetPwdMain">
          <InsForm ref="pwdForm" v-model="pwdForm">
            <div class="login-register-content">
                  <InsInput2 :placeholder="$t('Register.UserNewPassword')" width="100%" v-model="pwdForm.newPassword" type="password"/>
                  <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="pwdForm.ConfirmNewPassword" type="confirmpassword" :rule="pwdForm.newPassword" />
            </div>
            <div class="login-register-handle">
              <div class="btn-box">
                <el-button type="primary" @click="submitForm('pwdForm')" class="resetBtn">{{$t('DeliveryAddress.SaveBtn')}}</el-button>
              </div>
            </div>
          </InsForm>
        </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import InsInput2 from '@/components/base/pc/InsInput2.vue';
import InsForm from '@/components/base/pc/InsForm.vue';
@Component({
  components: {
    InsForm,
    InsInput2
  }
})
export default class InsResetPwd extends Vue {
  memberMessage:any= {};
  isSentPwd:boolean= false;
  ImgList:string='/images/pc/pcnormalbg.jpg';
  // 检查表单
  validatePass (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterNewPwd') as string));
    } else {
      callback();
    }
  }
  validatePass2 (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterComfirmPwd') as string));
    } else if (value !== this.pwdForm.newPassword) {
      callback(new Error(this.$t('MemberInfo.PwdNotCorrect') as string));
    } else {
      callback();
    }
  }
  pwdForm: any = {
    newPassword: '',
    ConfirmNewPassword: ''
  };
  get pwdRules () {
    var that = this;
    return {
      newPassword: [
        {
          required: true,
          message: '',
          trigger: 'blur',
          validator: that.validatePass
        }
      ],
      ConfirmNewPassword: [
        {
          required: true,
          message: '',
          trigger: 'blur',
          validator: that.validatePass2
        }
      ]
    };
  }

  get id () {
    return this.$route.params.id;
  }
  get code () {
    return this.$route.params.code;
  }
  // 更改密码
  submitForm (pwdForm) {
    var pwd = this.pwdForm.newPassword;
    var that = this;
    (that.$refs.pwdForm as InsForm).validate(valid => {
      that.$Api.member.updatePwdFM(that.id, that.code, pwd).then((result) => {
        if (result.Succeeded) {
          that.$message({
            message: result.Message,
            type: 'success',
            customClass: 'messageboxNoraml'
          });
          setTimeout(() => {
            that.$router.push('/account/login');
          }, 2000);
        } else {
          that.$message({
            message: result.Message,
            type: 'error',
            customClass: 'messageboxNoraml'
          });
        }
      });
    });
  }
}
</script>
<style lang="less" >
.btn-box .el-button span{
  font-size: 20px;
}
.login-register-content .input_warpper .input_main input{
    background: #fff;
    border: 1px solid #ddd;
    padding: 0px;
    height: 3rem;
}
</style>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style lang="less" scoped>
#memberConterContainer {
  padding-top: 130px;
  padding-bottom: 50px;
  min-height: 500px;
}
.resetPwdMain{
  width: 800px;
  margin: 0 auto;
}
.login-register-content{
  margin-bottom: 30px;
}
.login-form{
  width: 900px;
  margin: 0 auto;
  margin-bottom: 60px;
  background: #FFF;
  padding: 20px;
  margin-top: 30px;
}
.Banner{
    width: 100%;
    height: 500px;
}
.Banner img{
    width: 100%;
    height: 500px;
}
.resetPWD{
  padding-bottom: 60px;
}
.resetBtn{
    background-color:  #c6b17b;
    border: 1px solid #c6b17b;
    width: 100%;
    span{
      font-size: 20px;
    }
}
</style>

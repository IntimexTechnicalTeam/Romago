<template>
  <div id="memberConterContainer">
    <p class="pageTitle">{{$t('Forgetpassword.ForgetPassword')}}</p>
    <div class="maincontent forgetMain">
    <div class="ForgetPassMain">
      <div style="margin-top: 15px;" v-if="ResetPwd">
        <h2 class="ResetPwdTips">{{$t('Forgetpassword.ResetPwdTips')}}</h2>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item prop="UserEmail">
            <el-input
              :placeholder="$t('Forgetpassword.LoginNameEmail')"
              v-model="ruleForm.UserEmail"
              prefix-icon="el-icon-message"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-arrow-right"
                @click="SubmitForm"
              >{{$t('Forgetpassword.NextStep')}}</el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 输入正确的Email后，弹窗 -->
      <div class="EmailSuccess" v-if="!ResetPwd">
        <p>
          <i class="el-icon-success"></i>
        </p>
        <p>{{$t('Forgetpassword.ResetPwdSuccess')}}</p>
        <p>{{$t('Forgetpassword.NotEmail')}}?</p>
        <p>
          <a
            @click="ResetReturn"
            :title="$t('Forgetpassword.ToReEnter')"
          >{{$t('Forgetpassword.ToReEnter')}}</a>
        </p>
      </div>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';

@Component({
  components: {
    InsBanner: () => import('@/components/base/mobile/InsBanner.vue')
  }
})
export default class InsForgetPassword extends Vue {
  ResetPwd: boolean = true;
  ImgList:string='/images/pc/pcnormalbg.jpg';
  ruleForm: any = {
    UserEmail: ''
  };
  ResetReturn () {
    this.ResetPwd = !this.ResetPwd;
    this.ruleForm.UserEmail = '';
  }
  get rules () {
    return {
      UserEmail: [
        {
          required: true,
          message: this.$t('Forgetpassword.EnterEmail'),
          trigger: 'blur'
        },
        {
          type: 'email',
          message: this.$t('Forgetpassword.CorrectEmail'),
          trigger: ['blur', 'change']
        }
      ]
    };
  }
  // 检查表单
  SubmitForm (ruleForm) {
    let _this = this;
    this.$nextTick(function () {
      (_this.$refs.ruleForm as HTMLFormElement).validate(valid => {
        if (valid) {
          sdk.api.member.resetPassword(_this.ruleForm.UserEmail).then(
            function (success) {
              if (success) {
                _this.ResetPwd = !_this.ResetPwd;
              }
            },
            function (success) {
              _this.$message({
                message: success.Message,
                type: 'error'
              });
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    });
  }
}
</script>
<style lang="less" scoped>
#memberConterContainer {
  padding-top: 130px;
  padding-bottom: 50px;
  min-height: 500px;
}
.forgetMain{
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 60px;
  margin-bottom: 20px;
}
#container {
  width: 100%;
  display: inline-block;
  .forgetpsw_title{
    font-size: 2rem;
    line-height: 4rem;
    text-align: center;
    margin-top: 2rem;
  }
}
.ForgetPassMain {
  width: 100%;
  margin: 0 auto;
}
.ResetPwdTips {
    line-height: 2rem;
    text-align: left;
    font-size: 16px;
    margin-bottom: 10px;
    color: #fff;
}
.EmailSuccess{
  text-align: center;
}
.EmailSuccess p {
  line-height: 35px;
  font-size: 16px;
}
.EmailSuccess p a {
  line-height: 35px;
  font-size: 16px;
  color: crimson;
  text-decoration: underline;
  cursor: pointer;
}
.EmailSuccess p i {
  font-size: 60px;
  color: #8dc11f;
}
.Banner {
  width: 100%;
  height: 20rem;
  display:flex;
  align-items: center;
  padding-left:2rem;
  .innerBox{
      width: 1200px;
      margin: 0 auto;
  }
}
.Banner img {
  width: 100%;
  height: 20rem;
}
</style>

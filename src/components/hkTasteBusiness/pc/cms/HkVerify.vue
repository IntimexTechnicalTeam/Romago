<template>
  <div class="HkVerify" id="memberConterContainer">
    <div class="InnerBox">
        <p class="pageTitle">{{$t('Message.WarrantycardTitle')}}</p>
        <p class="desc">
          {{$t('Message.WarrantycardTips')}}
        </p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item  prop="VerifyText">
            <el-input v-model="ruleForm.VerifyText" placeholder="Serial NUMBER"></el-input>
            <router-link to="/CMS/content/30309" class="UrlText">{{$t('Message.WarrantycardFaq')}}</router-link>
          </el-form-item>
          <el-form-item  prop="VerifyChoice" class="VerifyChoice">
              <el-checkbox :label="$t('Message.robotTips')" name="VerifyChoice" v-model="ruleForm.VerifyChoice" @change="VerifyLayerShow()" :checked="isVerify"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">{{$t('Message.Continue')}}</el-button>
          </el-form-item>
        </el-form>
      <div class="layerBox" v-show="showVerify">
        <div class="Inner">
           <span @click="closeBtn()" class="closeBtn"><i class="fa fa-window-close"></i></span>
           <slide-verify :imgs="puzzleImgList" :l="42" :r="10" :w="310" :h="155" slider-text="Slide Right" @success="onSuccess" @fail="onFail" @refresh="onRefresh"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
})
export default class HkVerify extends Vue {
    isVerify:boolean =false;
    showVerify:boolean =false;
    puzzleImgList: any=[
        '/images/mobile/ohters_05.jpg',
         '/images/mobile/ohters_06.jpg',
         '/images/mobile/ohters_07.jpg'
      ];
    ruleForm ={
      VerifyText: '',
      VerifyChoice: ''
    }
      get rules () {
        return {
          VerifyText: [
            {
              required: true,
              message: this.$t('MemberInfo.EnterUserName'),
              trigger: 'blur'
            }
          ],
          VerifyChoice: [
            {
                required: true, message: '请至少选择一个活动性质', trigger: 'change'
            }
          ]
        };
      }
    onSuccess() {
       this.isVerify = true;
       this.showVerify = false;
    }
    closeBtn () {
       this.showVerify = false;
    }
    onFail() {
        this.isVerify = false;
    }
    onRefresh() {
         console.log('onRefresh');
         console.log(this.isVerify, 'this.isVerify');
    }
    VerifyLayerShow () {
      this.showVerify = true;
    }
    submitForm() {
      (this.$refs.ruleForm as any).validate(valid => {
        if (valid && this.isVerify) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
}
</script>
<style scoped lang="less">
.HkVerify {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 7rem;
  padding-bottom: 5rem;
  .layerBox {
    position: fixed;
    z-index: 9999;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(0,0,0,.7);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    .Inner {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .closeBtn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        i{
          font-size: 2rem;
          color: #fff;
        }
      }
    }
  }
  .InnerBox {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .VerifyChoice {
      margin-top: 50px;
    }
    .desc {
      color: #fff;
      font-size: 18px;
      line-height: 30px;
      margin-top: 30px;
      margin-bottom: 60px;
    }
    .UrlText {
      color: #fff;
      font-size: 18px;
    }
    /deep/ .el-form {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 100%;
      }
      .el-button {
        width: 250px;
        border-radius: 0px;
        background: #c6b17b;
        border: 0px;
        span {
          font-size: 24px;
        }
      }
      .el-checkbox__label {
        color:#fff;
        font-size: 16px;
      }
      .el-form-item__content {
        width: 100%;
        margin-left: 0px!important;
        .el-input__inner {
          background: transparent;
          border: 0px;
          border-radius: 0px;
          border-bottom: 1px solid #ccc;
          padding: 0px;
          color: #ccc;
          font-size: 18px;
          &::placeholder {
            text-transform: uppercase;
            color: #cccccc;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>

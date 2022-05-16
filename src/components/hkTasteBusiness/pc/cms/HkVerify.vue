<template>
  <div class="HkVerify">
    <div class="InnerBox">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="VerifyText">
            <el-input v-model="ruleForm.VerifyText"></el-input>
          </el-form-item>
          <el-form-item label="活动性质" prop="VerifyChoice">
            <el-checkbox-group v-model="ruleForm.VerifyChoice">
              <el-checkbox label="点击验证" name="VerifyChoice" @change="VerifyLayerShow()"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">立即创建</el-button>
          </el-form-item>
        </el-form>
      <div class="layerBox" v-show="showVerify">
           <span @click="closeBtn()"><i class="fa fa-window-close"></i></span>
          <slide-verify :l="42" :r="10" :w="310" :h="155" slider-text="向右滑动" @success="onSuccess" @fail="onFail" @refresh="onRefresh"/>
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
    ruleForm ={
      VerifyText: '',
      VerifyChoice: []
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
                type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'
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
         console.log('onFail');
         console.log(this.isVerify, 'this.isVerify');
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
  padding-top: 50px;
  padding-bottom: 50px;
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
  }
  .InnerBox {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>

<template>
  <div class="ModifyPassword">
    <div class="mid-box">
      <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" class="demo-pwdForm">
        <el-form-item prop="Password">
          <el-input type="password" :placeholder="$t('Register.UserOldPassword')" v-model="pwdForm.Password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="NewPassword">
          <el-input type="password" :placeholder="$t('Register.UserNewPassword')" v-model="pwdForm.NewPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="ConfirmNewPassword">
          <el-input type="password" :placeholder="$t('Register.UserNewPassword')" v-model="pwdForm.ConfirmNewPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round type="primary" class="submit-btn" @click="submitForm('pwdForm')">{{$t('DeliveryAddress.SaveBtn')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
   </div>
</template>
<script lang="ts">
import { ElForm } from 'element-ui/types/form';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue')
  }
})
export default class InsModifyPassword extends Vue {
  private checkOldPass = (rule, value, callback) => {
    if (!value) {
      return callback(new Error(this.$t('MemberInfo.EnterOldPwd') as string));
    } else {
      callback();
    }
  };

  private validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterNewPwd') as string));
    } else {
      var i = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
      if (i.test(value) === false) {
        callback(new Error(this.$t('Register.Registerdigital') as string));
      }

      if (this.pwdForm.ConfirmNewPassword !== '') {
        (this.$refs.pwdForm as ElForm).validateField('ConfirmNewPassword');
      }
      callback();
    }
  };

  private validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterComfirmPwd') as string));
    } else if (value !== this.pwdForm.NewPassword) {
      callback(new Error(this.$t('MemberInfo.PwdNotCorrect') as string));
    } else {
      callback();
    }
  };

  private pwdForm: any = {
    Password: '',
    NewPassword: '',
    ConfirmNewPassword: ''
  };

  private rules: any = {
    Password: [
      { validator: this.checkOldPass, trigger: 'blur' }
    ],
    NewPassword: [
      { validator: this.validatePass, trigger: 'blur' }
    ],
    ConfirmNewPassword: [
      { validator: this.validatePass2, trigger: 'blur' }
    ]
  }

  submitForm(formName) {
    (this.$refs[formName] as ElForm).validate((valid) => {
      if (valid) {
        this.$Api.member.updatePassword(this.pwdForm).then((result) => {
          this.$message({
            message: result.Message,
            type: result.Succeeded ? 'success' : 'error'
          });
        }).catch((error) => {
          console.log(error);
          this.$message({
            message: error,
            type: 'error'
          });
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  };

  resetForm(formName) {
    (this.$refs[formName] as ElForm).resetFields();
  }
}
</script>

<style lang="less" scoped>
.ModifyPassword {
  .mid-box {
    width: 720px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 50px;
    /deep/ .el-form {
      width: 100%;
      margin: 0 auto;
      .el-form-item__label {
        width: 100%;
        text-align: left;
        font-size: 18px;
        color:#cccccc;
      }
      .el-input__inner{
        border-radius: 0px;
      }
      .el-radio__label {
        font-size: 18px;
        color:#cccccc;
      }
      .el-form-item__content {
        width: 100%;
      }
      .el-radio__input {
        .el-radio__inner {
          outline: none;
          box-shadow: none;

          &:hover {
            border-color: #c6b17b;
          }
        }

        &.is-checked .el-radio__inner {
          border-color: #c6b17b;
          background: #c6b17b;
        }

        &.is-checked+.el-radio__label {
          color: #c6b17b;
        }
      }

      .submit-btn {
        display: block;
        width: 100%;
        background: #c6b17b;
        border: none;
        font-size: 20px;
        margin-top: 20px;
        transition: all .3s;
        border-radius: 0px;
        &:hover {
          background: #333;
        }
      }
    }
  }
}
</style>

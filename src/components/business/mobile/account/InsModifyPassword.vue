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
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue')
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
    padding: 2rem 0;
    /deep/ .el-form {
      .el-input__inner {
        border-radius: 0px;
      }
      &.el-form--label-right {
        .el-form-item__label {
          line-height: unset;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #999999;
        }
      }
      .el-input.is-disabled .el-input__inner {
        border-radius: 0px;
      }
      .el-input--prefix .el-input__inner {
        border-radius: 0px;
      }
      .el-select .el-input__inner {
        border-radius: 0px;
      }
      .el-select {
        width: 100%;
      }

      .el-radio__input {
        .el-radio__inner {
          outline: none;
          box-shadow: none;

          &:hover {
            border-color: #c6b17c;
          }
        }

        &.is-checked .el-radio__inner {
          border-color: #c6b17c;
          background: #c6b17c;
        }

        &.is-checked+.el-radio__label {
          color: #c6b17c;
        }
      }
    }

    /deep/ .submit-btn {
      display: block;
      width: 100%;
      background: #c6b17c;
      border: none;
      margin: 3rem 0;
      border-radius: 0px;
      > span {
        font-size: 1.4rem;
        text-transform: uppercase;
      }
    }
  }
}
</style>

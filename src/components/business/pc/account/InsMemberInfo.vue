<template>
  <div class="MemberInfo">
    <div class="mid-box">
        <!-- 用户账号 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            :label-position="'right'"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item :label="$t('Register.UserEmail')" prop="Email">
              <el-input
                 v-model="ruleForm.Email"
                prefix-icon="el-icon-message"
                :placeholder="$t('Register.UserEmail')"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('Register.UserFirstName')" prop="FirstName">
              <el-input
                v-model="ruleForm.FirstName"
                prefix-icon="el-icon-user"
                :placeholder="$t('Register.UserFirstName')"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('Register.UserLastName')" prop="LastName">
              <el-input
                v-model="ruleForm.LastName"
                :placeholder="$t('Register.UserLastName')"
                prefix-icon="el-icon-collection-tag"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="Mobile" :label="$t('DeliveryAddress.Mobile')">
              <el-input
                v-model="ruleForm.Mobile"
                prefix-icon="el-icon-phone"
                :placeholder="$t('DeliveryAddress.Mobile')"
                clearable
              ></el-input>
            </el-form-item>
               <el-form-item prop="BirthDateString" :label="$t('Register.UserBirthDate')">
                <el-input
                v-model="ruleForm.BirthDateString"
                prefix-icon="el-icon-date"
                :placeholder="$t('MemberInfo.DDMM')"
                clearable
              ></el-input>
                </el-form-item>
            <el-form-item :label="$t('Register.UserGender')" prop="Gender">
              <el-radio-group v-model="ruleForm.Gender">
                <el-radio label="0">{{$t('Register.UserMale')}}</el-radio>
                <el-radio label="1">{{$t('Register.UserFemale')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('Register.UserLanguage')" prop="Language">
              <el-select
                v-model="ruleForm.Language"
                :placeholder="$t('Register.UserLanguage')"
                style="width: 100%;"
              >
                <el-option :value="1" :label="$t('Register.UserLanguageT')">{{$t('Register.UserLanguageT')}}</el-option>
                <el-option :value="0" :label="$t('Register.UserLanguageE')">{{$t('Register.UserLanguageE')}}</el-option>
                <el-option :value="2" :label="$t('Register.UserLanguageS')">{{$t('Register.UserLanguageS')}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                round
                type="primary"
                class="submit-btn"
                @click="SubmitForm('ruleForm')"
              >{{$t('DeliveryAddress.SaveBtn')}}</el-button>
            </el-form-item>
          </el-form>
    </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { MemberResult } from '@/model/memberResult';
import sdk from '@/sdk/InstoreSdk';
import Cookie from 'js-cookie';
import lang from '@/lang';
import storage from '@/sdk/common/Storage';
import { ElForm } from 'element-ui/types/form';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue')
  }
})
export default class InsMemberInfo extends Vue {
  activeName: string = 'first';
  private member: MemberResult = new MemberResult();
  // 验证规则
  ruleForm: any = {
    FirstName: '',
    LastName: '',
    ContactNumber: '',
    BirthDateString: '',
    Gender: '',
    Mobile: '',
    Language: ''
  };
  langs:string[] = ['E', 'C', 'S'];
  validatePass (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterUserName') as string));
    } else {
      callback();
    }
  }
  get rules () {
    return {
      FirstName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserName'),
          trigger: 'blur'
        }
      ],
      LastName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserLastName'),
          trigger: 'blur'
        }
      ],
      Mobile: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserPhone'),
          trigger: 'blur'
        },
        { validator: function(rule, value, callback) {
          /* eslint-disable */
            var mobile = /^(\+)?(\d{0,4}\-?)?\d{7,11}$/;
            if ( mobile.test(value) === false ) {
              var t = lang.messages[storage.get('locale')].Input['phoneincorrect'];
                callback(new Error(t));
            } else {
                callback();
            }
        },
        trigger: 'blur' }
      ]
    };
  }

  changLange (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      localStorage.setItem('locale', lang);
    }).catch((error) => {
      console.log(error);
    });
  }
  get currentlang () {
    return this.$Storage.get('locale');
  }
  async getProfile () {
    let _this = this;
    await sdk.api.member.getProfile().then(
      function (data) {
        if (data) {
          _this.ruleForm = data;
          if (data.BirthDateString !== '') {
            var newDate = new Date(data.BirthDateString.replace(/-/g, '/'));
            data.BirthDateString = newDate.getDate() + '/' + (newDate.getMonth() + 1);
          }
          _this.$i18n.locale = _this.langs[data.Language];
          _this.$set(_this, 'member', data);
          _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
          _this.$store.dispatch('setLang', _this.langs[data.Language]);
          _this.$Storage.set('locale', _this.langs[data.Language]);
          _this.$HiddenLayer();
          // _this.Reload();
        } else {
          _this.$store.dispatch('Logout');
        }
      },
      function (data) {
        _this.$message({
          message: data,
          type: 'error'
        });
      }
    );
  }
  created () {
    this.getProfile();
  }
  // 提交用户信息表单
  SubmitForm (ruleForm) {
    let that = this;
    that.ruleForm.DateFormat = 'dd/MM';
    if (that.ruleForm.Gender === '') {
      that.ruleForm.Gender = 1;
    }
    // that.$nextTick(function () {
    (that.$refs.ruleForm as ElForm).validate(valid => {
      if (valid) {
        sdk.api.member.updateProfile(that.ruleForm).then(
          async function (response) {
            that.$message({
              message: response.Message,
              type: 'success',
              customClass: 'messageboxNoraml'
            });
            await that.getProfile();
            that.Reload();
          },
          function (response) {
            that.$message({
              message: response.Message,
              type: 'error',
              customClass: 'messageboxNoraml'
            });
          }
        );
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  // 重置用户信息表单
  ResetForm (ruleForm) {
    (this.$refs.ruleForm as ElForm).resetFields();
  }
  // 打开地址
  openlink (link) {
    this.$router.push({ path: link });
  }
}
</script>

<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>

<style lang="less" scoped>
.MemberInfo {
  .mid-box {
    padding: 50px;

    /deep/ .el-form {
      width: 60%;
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

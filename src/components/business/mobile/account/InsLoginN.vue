<template>
<div id="container">
  <div class="insLogin_warrper">
      <div class="insLogin_title" v-if="$Settings.siteVersion !== 1">
         <div class="fblogin" @touchstart="fbLogin">
          <img src="/images/mobile/fblogin.png" />
          <span>{{$t('Login.FaceBookUse')}}</span>
         </div>
        <p class="or">{{$t('Register.or')}}</p>
      </div>
      <div class="insLogin_main">
         <div class="tabs-basic">
            <ul>
              <li @click="toggleTab(1)" :class="{'active': tabIndex==1}">{{$t('Login.doLogin')}}</li>
              <li @click="toggleTab(2)" :class="{'active': tabIndex==2}">{{$t('Register.RegisterTitle')}}</li>
            </ul>
           <div class="clear"></div>
         </div>
          <div class="login" v-show="tabIndex === 1">
              <div>
                <!-- <div class="login_title">{{$t('Login.doLogin')}}</div> -->
                <InsForm ref="loginForm" v-model="loginForm">
                    <InsInput2 :placeholder="$t('Register.UserEmail')" width="100%" v-model="loginForm.email" />
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="loginForm.password" type="logopassword" />
                    <div class="remember_warpper">
                        <div class="remember">
                            <input
                                type="checkbox"
                                class="remember-btn"
                                name="remember-btn"
                                id="remember-btn"
                                value
                            />
                            <label for="remember-btn">{{$t('Login.RememberMe')}}</label>
                        </div>
                        <a class="forget" href="/account/forgetPassword">{{$t('Login.ForgetPwd')}}</a>
                    </div>
                </InsForm>
              </div>
              <InsButton :nama="$t('Login.doLogin')" @click="login" size="huge" class="loginBtn" />
          </div>
          <div class="register" v-show="tabIndex === 2">
              <div>
                <!-- <div class="register_title">{{$t('Register.RegisterBtn')}}</div> -->
                <InsForm ref="registerForm" v-model="registerForm">
                <div class="register_half">
                    <InsInput2 :placeholder="$t('Register.UserFirstName')" width="100%" v-model="registerForm.firstName" />
                    <InsInput2 :placeholder="$t('Register.UserLastName')" width="100%" v-model="registerForm.lastName"/>
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="registerForm.password" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="registerForm.confirmPassword" type="password" :rule="registerForm.password" />
                </div>
                <div class="register_half">
                     <InsInput2 :placeholder="$t('DeliveryAddress.Mobile')" width="100%"  :must="false" v-model="registerForm.Mobile"  type="phone"/>
                </div>
                <InsInput2 :placeholder="$t('Register.UserEmail')" v-model="registerForm.email" width="100%" type="email" />
                </InsForm>
                <!-- <div></div> -->
                <!-- <el-checkbox-group v-model="terms" style="margin: 20px 0 20px 0">
                    <el-checkbox name="type"></el-checkbox><span><router-link to="/CMS/content/20298" target="_blank" style="font-size: 1rem;padding-left: .5rem;color: #666666;
    text-decoration: none;">{{$t('Register.RegisterAgree')}}</router-link></span>
                </el-checkbox-group> -->
                <div class="remember_warpper">
                        <div class="remember">
                              <input
                                  type="checkbox"
                                  class="remember-btn"
                                  name="remember-btn"
                                  id="regbtn"
                                  value
                              />
                              <router-link to="/CMS/content/20298" target="_blank">{{$t('Register.RegisterAgree')}}</router-link>
                          </div>
                        </div>
              </div>
              <InsButton :nama="$t('Forgetpassword.NextStep')" @click="register" size="huge"  class="loginBtn"/>
          </div>
      </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import InsInput2 from '@/components/base/pc/InsInput2.vue';
import InsButton from '@/components/base/mobile/InsButton.vue';
import InsForm from '@/components/base/pc/InsForm.vue';
@Component({ components: { InsInput2, InsButton, InsForm } })
export default class InsLoginN extends Vue {
    private terms: boolean = true;
    tabIndex: number = 1;
    faceBookLogin:string='';
    lang:string[] = ['E', 'C', 'S'];
    private loginForm = {
      email: '',
      password: ''
    }
    private registerForm = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      Language: '',
      Mobile: ''
    }
    toggleTab (index) {
      this.tabIndex = index;
    }
    get currentlang () {
      return this.$Storage.get('locale');
    }
    login () {
      let _this = this;
      (this.$refs.loginForm as InsForm).validate((valid) => {
        if (valid) {
          this.$Api.member.login(this.loginForm.email, this.loginForm.password, true).then(
            function (response) {
              _this.$store.dispatch('doLogin');
              return _this.$route.query && _this.$route.query.returnurl ? _this.$route.query.returnurl : undefined;
            },
            function (response) {
              _this.$message({
                message: response.Message,
                type: 'error'
              });
            }
          ).then(
            (url) => {
              this.$Api.member.getProfile().then(
                function (data) {
                  if (data) {
                    _this.loginForm = data;
                    _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
                    _this.$i18n.locale = _this.lang[data.Language];
                    _this.$store.dispatch('setLang', _this.lang[data.Language]);
                    _this.$Storage.set('locale', _this.lang[data.Language]);
                    _this.$store.dispatch('setMemberInfo', data);
                    _this.getShopCart();
                    if (url) { window.location.href = (_this.$route.query.returnurl as string); } else { window.location.href = '/account/memberInfo'; }
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
          );
        } else {
          return false;
        }
      });
    }
    register () {
      let _this = this;
      let l = this.$Storage.get('locale');
      this.lang.forEach((element, index) => {
        if (l === element) this.registerForm.Language = '' + index;
      });
      (this.$refs.registerForm as InsForm).validate((valid) => {
        if (valid && this.terms) {
          this.$Api.member.register(this.registerForm).then((result) => {
            if (result.Succeeded) {
              this.$Api.member.login(this.registerForm.email, this.registerForm.password, true).then(
                function (response) {
                  _this.$store.dispatch('doLogin');
                  return _this.$route.query && _this.$route.query.returnurl ? _this.$route.query.returnurl : undefined;
                },
                function (response) {
                  _this.$message({
                    message: response.Message,
                    type: 'error'
                  });
                }
              ).then(
                (url) => {
                  this.$Api.member.getProfile().then(
                    function (data) {
                      if (data) {
                      // _this.registerForm = data;
                        _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
                        _this.$i18n.locale = _this.lang[data.Language];
                        _this.$store.dispatch('setLang', _this.lang[data.Language]);
                        _this.$Storage.set('locale', _this.lang[data.Language]);
                        _this.$store.dispatch('setMemberInfo', data);
                        if (url) { window.location.href = (_this.$route.query.returnurl as string); } else { window.location.href = '/account/memberInfo'; }
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
              );
            } else {
              this.$message({
                message: result.Message,
                type: 'error'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    getShopCart () {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    }
    isIe = true;
    created () {
      if (window.navigator.userAgent.indexOf('Trident') !== -1) this.isIe = true;
      else this.isIe = false;
    }
    mounted () {
      window.dispatchEvent(new Event('faceBookLoad'));
    }
    fbLogin () {
      window['FB'].login(function (response) {
        window['checkLoginState']();
      }, { scope: 'email' });
    }
}
</script>
<style lang="less">
.insLogin_warrper .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: @base_color;
    border-color: @base_color;
}
</style>
<style lang="less" scoped>
/deep/ .input_outer {
  .input_warpper .input_main input {
    background: transparent!important;
    border-bottom:1px solid #ccc!important;
    color: #ccc;
    padding-left: 0px;
    &::placeholder {
      color: #ccc!important;
    }
  }
}
.loginBtn{
    font-size: 1.4rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #c6b17c!important;
    border: 1px solid #c6b17c!important;
}
.insLogin_warrper{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding-top: 7rem;
    padding-bottom: 5rem;
    background:url('/images/mobile/ohters_14.jpg') no-repeat center center;
    background-size: cover;
    .insLogin_title{
       text-align: center;
       width: 90%;
       margin: 0 auto;
    }
    .insLogin_title .fblogin {
      text-align: center;
      font-size: 1.4rem;
      color: #fff;
      background-color: #4267b2;
      display: flex;
      cursor: pointer;
      width: 100%;
      height: 3rem;
      align-items: center;
      justify-content: center;
    img{
      width: 2rem;
      vertical-align: middle;
      margin-right: 1.4rem;
    }
    span{
      vertical-align: middle;
      font-size: 1.4rem;
    }
}
.insLogin_title .or {
    text-align: center;
    font-size: 1.4rem;
    position: relative;
    color: #cccccc;
    margin: 2rem 0;
    text-transform: uppercase;
}
.insLogin_title .or::before {
    content: '';
    width: 40%;
    height: 1px;
    background-color: #cccccc;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}
.insLogin_title .or::after {
    content: '';
    width: 40%;
    height: 1px;
    background-color: #cccccc;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
}

   .tabs-basic {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      ul{
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 2px);
        border:1px solid #c6b17c;
        justify-content: space-between;
        overflow: hidden;
      }
      li {
        width: 50%;
        float: left;
        color: #c6b17c;
        border-right: none;
        text-align: center;
        cursor: pointer;
        font-size: 1.4rem;
        box-sizing: border-box;
        list-style: none;
        height: 3rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        &:first-child {
          border-left: 0;
        }
        &:first-child {
          border-left: 0;
        }
        &.active {
          background: #c6b17c;
          color: #fff;
        }
      }
    }
    .insLogin_main{
        width: 90%;
        box-sizing: border-box;
        margin: 0 auto;
        .login{
            display: inline-flex;
            justify-content: space-between;
            flex-direction: column;
            width: 100%;
            box-sizing: border-box;
            vertical-align: top;
            .remember_warpper{
                padding: 0 0 0 0px;
                margin: 20px  0;
                display: flex;
                justify-content: space-between;
                text-transform: uppercase;
                a{
                    color: #bfbfbf;
                    text-decoration: none;
                    font-size: 1rem;
                    text-decoration: underline;
                    text-transform: uppercase;
                  }
                .remember{
                  label {
                    color: #bfbfbf;
                    font-size: 1rem;
                  }
                 input[type=checkbox] {
                      background: none;
                      width: 15px;
                      height: 15px;
                      -moz-appearance: none;
                      appearance: none;
                      -webkit-appearance: none;
                      -webkit-box-sizing: border-box;
                      box-sizing: border-box;
                      outline: none;
                      vertical-align: sub;
                      margin: 0;
                      margin-right: .5rem;
                      border: 1px solid #c6b17c;
                      position: relative;
                  }
                  input[type=checkbox]:checked {
                      border: 1px solid #c6b17c;
                      background: #fff;
                  }
                   input[type=checkbox]:checked::after {
                         position: absolute;
                        content: "";
                        width: 5px;
                        height: 10px;
                        top: -1px;
                        left: 3px;
                        border: 1px solid #c6b17c;;
                        border-top: none;
                        border-left: none;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                   }
                }
            }
        }
        .register{
            box-sizing: border-box;
            width: 100%;
            display: inline-flex;
            justify-content: space-between;
            flex-direction: column;
            vertical-align: top;
                .remember_warpper{
                    padding: 0 0 0 0px;
                    margin: 20px  0;
                    display: flex;
                    justify-content: space-between;
                    text-transform: uppercase;
                }
                .remember{
                  a {
                    color: #666666;
                    font-size: 1rem;
                    text-transform: uppercase;
                  }
                 input[type=checkbox] {
                      background: none;
                      width: 15px;
                      height: 15px;
                      -moz-appearance: none;
                      appearance: none;
                      -webkit-appearance: none;
                      -webkit-box-sizing: border-box;
                      box-sizing: border-box;
                      outline: none;
                      vertical-align: sub;
                      margin: 0;
                      margin-right: .5rem;
                      border: 1px solid @base_color;
                      position: relative;
                  }
                  input[type=checkbox]:checked {
                      border: 1px solid @base_color;
                  }
                   input[type=checkbox]:checked::after {
                         position: absolute;
                        content: "";
                        width: 5px;
                        height: 10px;
                        top: -1px;
                        left: 3px;
                        border: 1px solid @base_color;
                        border-top: none;
                        border-left: none;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                   }
                }
            .register_half{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
        }
    }
}
</style>

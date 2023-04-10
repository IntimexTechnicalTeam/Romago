<template>
 <div id="footer" :class="{'fixedFooter':RoutePath==='/'}">
 <div class="touchHeight" @scroll="scrollEvent" @touchend="handleTouchEnd">
      <div class="" v-show="RoutePath==='/'">
        <div class="HkLiveBox">
          <HkLiveBox/>
          <p class="goTop" @click="GoscrollTop"><i></i>{{$t('Input.Backtotop')}}</p>
          </div>
      </div>
          <div class="BottomBg">
            <div class="InnerBox">
              <div class="leftSide">
                <div class="MeunMain">
                  <Menu :backColor="'@base_color'" :textColor="'#fff'" :uniqueOpened="true" :type="'footer'" />
                </div>
                  <p class="copyRight">
                    <span>© Copyright 2022 Wise Leader Limited All Rights Reserved.Powered by Nstore<img src="/images/mobile/nstore.png"></span>
                  </p>
              </div>
              <div class="rightSide">
                <p class="NormalTitle">{{$t('Message.SOCIALMEDIA')}}</p>
                  <p class="NormalImg">
                      <a href="https://www.facebook.com/romagoswiss.ch/" target="_blank"><img src="/images/mobile/mpic_11.png"></a>
                      <a href="https://www.instagram.com/romago.swiss/" target="_blank"><img src="/images/mobile/mpic_12.png"></a>
                      <a href="https://www.youtube.com/channel/UChmJOMmn3UwILnDBrmlKCQw" target="_blank"><img src="/images/mobile/mpic_13.png"></a>
                      <a href="https://twitter.com/ROMAGO10" target="_blank"><img src="/images/mobile/mpic_14.png"></a>
                      <a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&amp;__biz=MjM5OTAxODI4OQ==&amp;scene=124#wechat_redirect" target="_blank"><img src="/images/mobile/mpic_15.png"></a>
                      <a href="https://www.weibo.com/u/2669053602?is_hot=1#_loginLayer_1510625853844" target="_blank"><img src="/images/mobile/mpic_16.png"></a>
                      <a href="https://www.pinterest.com/leader2043/pins/" target="_blank"><img src="/images/mobile/mpic_17.png"></a>
                  </p>
                  <p class="NormalTitle">{{$t('CheckOut.PaymentMethod')}}</p>
                  <p class="NormalImg">
                      <img src="/images/mobile/mpic_04.png" class="payImg">
                  </p>
                  <p class="NormalTitle">{{$t('Message.NEWSLETTER')}}</p>
                  <div class="RegnpayForm">
                      <div v-html="htmlString" class="to_vertical" id="content"></div>
                      <div id="preview" display="none"></div>
                  </div>
              </div>
            </div>
          </div>
          <div class="cookieTips">
            <div class="Inner">
              <p>We use cookies to give you the best possible experience on our website.</p>
              <p>By continuing to browse this site, you give consent for cookies to be used. For more details please read our Cookie Policy.</p>
            </div>
          </div>
      </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
        Menu: () => import('@/components/business/pc/header/InsMenu.vue'),
        HkLiveBox: () => import('@/components/hkTasteBusiness/pc/home/HkLiveBox.vue')
  }
})
export default class InsFooter extends Vue {
  currentYear: number = 0;
  private htmlString: string = '';
  Signer: any = null;
    swipedown () {
        console.log(this.$store.state.isActive, 'this.$store.state.isActive');
    }
    getForm () {
      this.$Api.regAndPay.genForm('NewsLetter', this.lang, true).then(result => {
        // RNPay登陆權限验证
        if (result.IsLogin && !this.$Storage.get('isLogin')) {
          this.$router.push('/account/login?returnurl=' + this.$route.path);
        }
        this.htmlString = result.ReturnValue.HtmlString;
      });
    }
    get RoutePath() {
      return this.$route.path;
    }
  get isActive () {
    return this.$store.state.isActive;
  }
    created () {
      var date = new Date();
      this.currentYear = date.getFullYear();
      window['jsData'] = {
        HasPreview: true,
        UploadButtonText: this.$t('RegNPay.UploadButtonText'),
        UploadingText: this.$t('RegNPay.UploadingText'),
        UploadSuccessfulText: this.$t('RegNPay.UploadSuccessfulText'),
        UploadFailText: this.$t('RegNPay.UploadFailText'),
        NoFileText: this.$t('RegNPay.NoFileText'),
        UploadLengthText: this.$t('RegNPay.UploadLengthText'),
        UploadSizeText: this.$t('RegNPay.UploadSizeText'),
        BackText: this.$t('RegNPay.BackText'),
        ConfirmText: this.$t('RegNPay.ConfirmText'),
        PleaseSelect: this.$t('RegNPay.PleaseSelect'),
        PreviewTitleText: this.$t('RegNPay.PreviewTitleText'),
        RequiredText: this.$t('RegNPay.RequiredText'),
        FormatErrorText: this.$t('RegNPay.FormatErrorText'),
        Version: '2.0',
        HasRNPConfirm: false
      };
      this.$LoadScript('/static/js/CanvasSigner.js');
      this.$LoadScript('/static/js/ajaxFileUpload.js');

      document.dispatchEvent(new Event('rnpFinshed'));

      // RNP Form后台预览跳转语言判断
      if (this.queryLang) {
        this.$Api.member.setUILanguage(this.queryLang).then((result) => {
          this.$i18n.locale = this.queryLang as string;
          localStorage.setItem('locale', this.queryLang as string);
          this.getForm();
        }).catch((error) => {
          console.log(error);
        });
      } else {
        this.getForm();
      }
    }
    get id () {
      return this.$route.params.id;
    }

    get lang () {
      return this.$Storage.get('locale');
    }
    get queryLang () {
      return this.$route.query.Lang || '';
    }
   GoscrollTop () {
      this.$store.dispatch('isActive', false);
    }
    scrollEvent () {
          let _this = this;
          let scroll = _this.$el.querySelector('.touchHeight') as any;
          if (scroll.scrollTop === 0) {
            this.$store.dispatch('isActive', false);
          }
    }
    handleTouchEnd () {
      let _this = this;
      let scroll = _this.$el.querySelector('.touchHeight') as any;
      if (scroll.scrollTop === 0) {
        this.$store.dispatch('isActive', false);
      }
    }
    mounted () {
      window['regAndPay'] = this.$Api.regAndPay;
      window['router'] = this.$router;
      // window['getPanel'] = this.$Api.getPanel;

      window['Elalert'] = this.$alert;
    }
  @Watch('$route', { deep: true })
  onRouteChange (n, o) {
      this.$store.dispatch('isActive', false);
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.fixedFooter {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  left: 0;
  top: 0px;
  .touchHeight {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
.goTop {
  background: transparent;
  text-align: center;
  width: 100%;
  color: #fff;
  line-height: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  i {
    width: 20px;
    height: 20px;
    background: url(/images/mobile/arrowhead-top.png) no-repeat center center;
    background-size: 15px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
}
#footer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .touchHeight {
    width: 100%;
  }
  .cookieTips {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-bottom: 20px;
    background: #000;
    .Inner {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      p{
        color: #999999;
        font-size: 16px;
      }
    }
  }
  .BottomBg {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: url('/images/pc/pcNew_05.jpg') no-repeat center center;
    background-size: cover;
    padding-bottom: 2rem;

  }
  .HkLiveBox {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 3rem;
    padding-bottom: 3rem;
    background: url('/images/pc/pcNew_04.jpg') no-repeat center center;
    background-size: cover;
  }
   /deep/ .nav_menu {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
     > ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      top: 0;
      left: 0;
      align-items: baseline;
      justify-content: space-between;
      >li {
        width: 23%;
        display: flex;
        flex-wrap: wrap;
        text-align: left;
        >ul {
          position: relative;
          left:0;
          top: 0;
          display: block;
          width: 100%;
          border: 0px;
          li {
            background: transparent;
            border: 0px;
            >a {
            color:#999;
            padding: 0px;
            font-size: 18px;
            padding-top: 5px;
            padding-bottom: 5px;
            text-transform: uppercase;
            transition: all .3s;
              &:hover {
                color:#c6b17b;
                text-decoration: underline;
              }
            }
          }
        }
        >a {
          color:#c6b17b;
          padding: 0px;
          font-size: 20px;
          padding-top: 5px;
          padding-bottom: 5px;
          text-transform: uppercase;
          font-family: 'PoppinsBold', 'Microsoft YaHei';
        }
      }
    }
  }
  .InnerBox {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding-top: 2rem;
    justify-content: space-between;
    .leftSide {
      width: 68%;
    }
    .rightSide {
      width: 30%;
    }
    .RegnpayForm {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      /deep/ #preview {
        .title {
          color: #fff;
          font-size:1.4rem;
        }
        >div {
          font-size: 1.2rem;
          color: #fff;
          margin-bottom: 1rem;
          margin-top: 1rem;
        }
        .confirm {
          width: 45%;
          height: 3rem;
          padding: 0px;
          margin: 0;
          box-sizing: border-box;
          background: #c6b17b;
          font-size: 1.2rem;
          border: 2px solid #c6b17b;
          color: #fff;
          margin-right: 2%;
        }
        .back {
          width: 45%;
          height: 3rem;
          padding: 0px;
          margin: 0;
          box-sizing: border-box;
          background: #ccc;
          font-size: 1.2rem;
          border: 2px solid #ccc;
          color: #fff;
        }
      }
      #content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        /deep/ .content {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          p[name='error'] {
            color: #c6b17b;
          }
          form {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            position: relative;
            .save {
              position: absolute;
              right: 0;
              top:0;
              width: 15%;
              height: 3rem;
              padding: 0px;
              margin: 0;
              box-sizing: border-box;
              background: #c6b17b;
              font-size: 1.2rem;
              border: 2px solid #c6b17b;
              color: #fff;
            }
            #Anwers {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              .form-group {
                width: 85%;
                display: flex;
                flex-wrap: wrap;
                .fieldset  {
                    border: 0px;
                    padding: 0px;
                    margin: 0px;
                    box-sizing: border-box;
                    width: 100%;
                  input[type="email"] {
                    width: 100%;
                    border: 0px;
                    padding: 0px;
                    box-sizing: border-box;
                    height: 3rem;
                    outline: 0;
                    border-radius: 0px;
                    padding-left: 10px;
                    background: transparent;
                    border: 1px solid #c6b17b;
                    color: #fff;
                    &::placeholder{
                      counter-reset: #fff;
                    }
                  }
                }
              }
              .control-label {
                display: none;
              }
            }
          }
        }
      }

    }
    .MeunMain {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    .NormalTitle {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      font-size: 20px;
      color: #c6b17b;
      text-transform: uppercase;
      padding-bottom: .5rem;
      font-family: 'PoppinsBold', 'Microsoft YaHei';
    }
    .NormalImg {
      padding-bottom: 0.5rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      a {
        height: 2.5rem;
        display: inline-block;
        margin-right: .5rem;
        img {
          height: 100%;
        }
      }
      .payImg {
        height: 2.5rem;
      }
    }
    .copyRight {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-top: 2rem;
      span {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999999;
        img {
          width: 50px;
        }
      }
    }
  }
}
</style>

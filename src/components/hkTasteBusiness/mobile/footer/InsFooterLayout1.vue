<template>
 <div id="footer">
   <div class="InnerBox">
     <div class="MeunMain">
       <Menu :backColor="'@base_color'" :textColor="'#fff'" :uniqueOpened="true" :type="'footer'" />
     </div>
      <p class="NormalTitle">SOCIAL MEDIA</p>
      <p class="NormalImg">
          <a href="#" target="_blank"><img src="/images/mobile/mpic_11.png"></a>
          <a href="#" target="_blank"><img src="/images/mobile/mpic_12.png"></a>
          <a href="#" target="_blank"><img src="/images/mobile/mpic_13.png"></a>
          <a href="#" target="_blank"><img src="/images/mobile/mpic_14.png"></a>
          <a href="#" target="_blank"><img src="/images/mobile/mpic_15.png"></a>
          <a href="#" target="_blank"><img src="/images/mobile/mpic_16.png"></a>
          <a href="#" target="_blank"><img src="/images/mobile/mpic_17.png"></a>
      </p>
      <p class="NormalTitle">Payment methods</p>
      <p class="NormalImg">
          <img src="/images/mobile/mpic_04.png" class="payImg">
      </p>
      <p class="NormalTitle">NEWSLETTER</p>
      <div class="RegnpayForm">
          <div v-html="htmlString" class="to_vertical" id="content"></div>
          <div id="preview" display="none"></div>
      </div>
      <p class="copyRight">
         <span>© Copyright 2022 Wise Leader Limited All Rights Reserved.</span>
         <span>Powered by Nstore<img src="/images/mobile/nstore.png"></span>
      </p>
   </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
        Menu: () => import('@/components/business/mobile/header/InsMenu.vue')
  }
})
export default class InsFooter extends Vue {
  currentYear: number = 0;
  private htmlString: string = '';
  Signer: any = null;

    getForm () {
      this.$Api.regAndPay.genForm('NewsLetter', this.lang, true).then(result => {
        // RNPay登陆權限验证
        if (result.IsLogin && !this.$Storage.get('isLogin')) {
          this.$router.push('/account/login?returnurl=' + this.$route.path);
          return;
        }

        this.htmlString = result.ReturnValue.HtmlString;

        this.$nextTick(() => {
          if (document.querySelectorAll('#Sign').length > 0) {
            this.Signer = new intimex.CanvasSigner('#NewSignCanvas', '#Signature', {
              color: '#58B63A',
              width: 5
            });
            this.Signer.initCanvas();

            window['Signer'] = this.Signer;
          }

          if (result.ReturnValue.Title) document.title = result.ReturnValue.Title;
        });
      });
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

    mounted () {
      window['regAndPay'] = this.$Api.regAndPay;
      window['router'] = this.$router;
      // window['getPanel'] = this.$Api.getPanel;

      window['Elalert'] = this.$alert;
    }
  @Watch('$route', { deep: true })
  onIdChange () {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#footer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: url('/images/mobile/mpic_05.jpg') no-repeat center center;
  background-size: 100% 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
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
      >li {
        width: 100%;
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
            font-size: 1.2rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
            text-transform: uppercase;
            }
          }
        }
        >a {
          color:#c6b17b;
          padding: 0px;
          font-size: 1.2rem;
          padding-top: 1rem;
          padding-bottom: 1rem;
          text-transform: uppercase;
        }
      }
    }
  }
  .InnerBox {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .RegnpayForm {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      #content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        /deep/ .content {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
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
      font-size: 1.2rem;
      color: #c6b17b;
      text-transform: uppercase;
      padding-bottom: .5rem;
      padding-top: 1rem;
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

<template>
    <div id="RomagoBg">
      <div class="RNPForm default">
      <div class="FormMain">
        <div v-html="htmlString" class="to_vertical" id="content"></div>
        <div id="preview" display="none"></div>
      </div>
      <div style="text-align:center;font-size:20px;">
        @Powered by RegNPay InStore
      </div>
      </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component
export default class InsRegAndPay extends Vue {
    private htmlString: string = '';
    Signer: any = null;

    getForm () {
      this.$Api.regAndPay.genForm(this.$route.params.id, this.lang, false).then(result => {
        if (result.Succeeded) {
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
        } else {
          this.$message({
            message: result.Message,
            type: 'error'
          });
        }
      });
    }

    created () {
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
}
</script>
<style lang="less">
</style>
<style lang="less" scoped>
@import "../../assets/less/regnpay.less";
/deep/ .RNPForm.default {
  background: transparent!important;
  padding-top: 130px;
  #preview {
    background: #fff;
  }
}
</style>

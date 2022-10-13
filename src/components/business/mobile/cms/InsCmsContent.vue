<template>
  <div id="container" class="MobileContact">
    <!-- 联络我们页面 -->
    <div class="Cmsbg" v-if="NewcateId=='40112'">
      <!-- 表单信息 -->
        <div class="FormMain">
          <p class="pageTitle">{{FormTitle}}</p>
          <div v-html="htmlString" class="to_vertical" id="content"></div>
          <div id="preview" style="display:none;"></div>
        </div>
         <p v-html="content.Body" class="contactUsContainer"></p>
    </div>
    <!-- 其他页面 -->
    <div class="CmsNormal" v-else>
      <div class="CmsContent">
        <p class="pageTitle">{{TitleName}}</p>
        <p v-html="content.Body" class="contents"></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component({
  components: {
  }
})
export default class InsCmsContent extends Vue {
  NewsNav: string = 'NewsNav';
  CateName: string = '';
  CateDesc: string = '';
  content: any[] = [];
  FormContent:any='';
  private ImgList: string[] = [];
  private ispic:boolean=false;
  IsPay:boolean= false;
  IsLogin:boolean=false;
  IsMobile:boolean=true;
  MapInfo:string='';
  ShopList:any[]=[];
  cindex:number=0;
  private htmlString: string = '';
  Signer: any = null;
  FormTitle:string='';
  NewcateId:string='';
  private waiting: boolean = true;
  OtherPageImg:string='';
  TitleName:string='';
  get currentlang () {
    return this.$Storage.get('locale');
  }
  get id () {
    return this.$route.params.id ? this.$route.params.id : '';
  }
  getForm () {
    this.$Api.regAndPay.genForm('ContactUs', this.lang, false).then(result => {
      this.htmlString = result.ReturnValue.HtmlString;
      this.FormTitle = result.ReturnValue.Title;
      this.$nextTick(() => {
        if (document.querySelectorAll('#Sign').length > 0) {
          this.Signer = new intimex.CanvasSigner('#NewSignCanvas', '#Signature', {
            color: '#58B63A',
            width: 5
          });
          this.Signer.initCanvas();
          window['Signer'] = this.Signer;
        }
      });
    });
  }
  getContent () {
    this.$Api.cms.getContentByDevice({ Key: this.id, ContentId: this.id, IsMobile: true }).then(result => {
      this.content = result.CMS;
      this.TitleName = result.CMS.Title;
      this.OtherPageImg = result.CMS.Cover;
      this.NewcateId = result.CMS.CatId;
      this.getCategoryByDevice(result.CMS.CatId);
      this.CateDesc = result.CMS.Desc;
      this.waiting = false;
      if (result.CMS.Title) document.title = result.CMS.Title;
    });
  }
  // 根据设备类型获取CMSCategory信息
  getCategoryByDevice (cateId) {
    this.$Api.cms.getCategoryByDevice({ CatId: cateId, IsMobile: true }).then(async (result) => {
      if (result.Succeeded) {
        this.ImgList = result.ReturnValue.ImagePath;
        this.MapInfo = result.ReturnValue.Content;
        this.CateName = result.ReturnValue.Name;
        this.waiting = false;
      } else {
        this.$message({
          message: result.Message,
          type: 'error'
        });
      }
    });
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  get queryLang () {
    return this.$route.query.Lang || '';
  }
  Regnay () {
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
  created () {
    this.getContent();
    this.Regnay();
  }
  mounted () {
    window['regAndPay'] = this.$Api.regAndPay;
    window['router'] = this.$router;
    window['Elalert'] = this.$alert;
  }
  @Watch('$route', { deep: true })
  onIdChange () {
    this.getContent();
  }
}
</script>
<style lang="less">
.MobileContact .FormMain{
  #preview{
    width: 90%;
    margin: 0 auto;
    padding-top: 2rem;
    .title {
      color: #fff;
      font-size: 1.4rem;
      text-align: center;
    }
    >div {
      font-size: 1.2rem;
      color: #fff;
    }
    .anwer{
      margin-bottom: 20px;
    }
    .back{
      background: #ccc;
      color:#FFF;
      width: 45%;
      height: 3rem;
      line-height: 3rem;
      border:none;
      margin-top: 30px;
      font-size: 1.2rem;
      outline: 0;
    }
    .confirm{
      background: #333;
      color:#FFF;
      width: 45%;
      height: 3rem;
      line-height: 3rem;
      border:none;
      margin-top: 30px;
      margin-right: 5%;
      font-size: 1.2rem;
      outline: 0;
    }
  }
}
.MobileContact .FormMain{
  width:90%;
  margin:0 auto;
  padding-bottom: 3rem;
  position: relative;
  #content {
    padding-top: 2rem;
  }
  .FormTitle{
    font-size: 2.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    color:#333333;
  }
  .pageTitle {
    width: 100%!important;
  }
  .FormImg{
    position: absolute;
    right: 0px;
    top:3rem;
    width: 20%;
    img{
      width: 100%;
    }
  }
  .form-group{
    .fieldset {
      border: none;
      margin: 0;
      padding: 0;
    }
    h4{
      display: none;
    }
    input[type="text"],input[type="email"]{
      border: 0;
      border-bottom: 1px solid #cccccc;
      outline: 0;
      height: 3rem;
      line-height: 3rem;
      width: 100%;
      box-sizing: border-box;
      outline: none;
      font-size: 1.2rem;
      background: transparent;
      margin-bottom: 1rem;
      color: #cccccc;
      &::placeholder{
        color: #cccccc;
      }
    }
    textarea{
      border: 0;
      border-bottom: 1px solid #cccccc;
      height: 10rem;
      width: 100%;
      box-sizing: border-box;
      outline: none;
      font-size: 1.2rem;
      background: transparent;
      margin-bottom: 1rem;
      color: #cccccc;
      &::placeholder{
        color: #cccccc;
      }
    }
    p[name='error'] {
      color: #c6b17b;
    }
    .btn-default{
      width: 100%;
      background: #c6b17b;
      height: 3rem;
      line-height: 3rem;
      color:#fff;
      background-size: 100%;
      border:none;
      margin-top: 1rem;
      font-size: 1.4rem;
      margin-bottom: 2rem;
      font-family: 'PoppinsBold', 'Microsoft YaHei';
    }
    .dropdown_op {
      width: 100%;
      height: 3rem;
      border: 0px;
      border-bottom: 1px solid #cccccc;
      margin-bottom: 1rem;
      outline: 0;
      font-size: 1.2rem;
      color: #cccccc;
      appearance: none;
      background: transparent url(/images/mobile/yellowDown.png) 98% 50% no-repeat;
      background-size: 1.5rem;
      &::placeholder{
        color: #cccccc;
      }
      option {
        color: #000;
      }
    }
  }
  .only_tilte {
    h4 {
      display: block;
      font-size: 1.2rem;
      color: #ccc;
      font-weight: 500;
    }
  }
  .checkbox_op {
    label {
      display: block;
      font-size: 1.2rem;
      color: #ccc;
    }
  }
}
</style>
<style scoped lang="less">
.MobileContact {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .Cmsbg {
          background: url('/images/mobile/ohters_13.jpg') no-repeat center center;
          background-size: cover;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding-top: 5rem;
          .contactUsContainer {
            width: 90%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 2rem;
            /deep/ .ContactInner {
              .tp1 {
                margin-bottom: 1rem;
                .pageTitle {
                  width: 100%!important;
                }
                .Addr {
                  font-size: 1.2rem;
                  color: #fff;
                  margin-top: 1rem;
                }
                .tel {
                  font-size: 1.2rem;
                  color: #fff;
                  margin-top: 1rem;
                }
              }
            }
          }
    }
  .CmsNormal {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 5rem;
    padding-bottom: 5rem;
    background: url('/images/mobile/ohters_16.jpg') no-repeat center center;
    background-size: cover;
  }
  .CmsContent {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .contents {
      margin-top: 2rem;
      /deep/ .AboutMain {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .InnerBox {
          width: 90%;
          margin: 0 auto;
          .InsTitle {
            font-size: 1.6rem;
            color: #c6b17b;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .InsText {
            font-size: 1.2rem;
            color: #fff;
            margin-bottom: 1rem;
            line-height: 2rem;
          }
          .InsImg {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: .5rem;
            img {
              width: 100%;
            }
          }
        }
        .P1 {
          background: url('/images/mobile/ohters_10.jpg') no-repeat center center;
          background-size: 100% 100%;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding-top: 1rem;
          padding-bottom: 3rem;
        }
        .P2 {
          background: url('/images/mobile/ohters_11.jpg') no-repeat center center;
          background-size: 100% 100%;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding-top: 1rem;
          padding-bottom: 3rem;
        }
        .P3 {
          background: url('/images/mobile/ohters_12.jpg') no-repeat center center;
          background-size: 100% 100%;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding-top: 1rem;
          padding-bottom: 3rem;
        }
      }
    }
  }
}
.clear {
  clear: both;
}
</style>

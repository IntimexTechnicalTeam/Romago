<template>
  <div id="container" class="PcContact">
    <!-- 联络我们页面 -->
    <div class="Cmsbg" v-if="NewcateId=='40112'">
      <!-- 表单信息 -->
      <div class="Innerbox">
        <div class="leftside">
            <div class="FormMain">
              <p class="pageTitle">{{FormTitle}}</p>
              <div v-html="htmlString" class="to_vertical" id="content"></div>
              <div id="preview" style="display:none;"></div>
            </div>
        </div>
        <div class="rightside">
          <p v-html="content.Body" class="contactUsContainer"></p>
        </div>
      </div>
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
    PkcmsBanner: () => import('@/components/hkTasteBusiness/mobile/cms/PkcmsBanner.vue')
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
    this.$Api.cms.getContentByDevice({ Key: this.id, ContentId: this.id, IsMobile: false }).then(result => {
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
    this.$Api.cms.getCategoryByDevice({ CatId: cateId, IsMobile: false }).then(async (result) => {
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
.PcContact .FormMain{
  #preview{
    width: 100%;
    margin: 0 auto;
    padding-top: 2rem;
    .title {
      color: #fff;
      font-size: 18px;
      text-align: center;
    }
    >div {
      font-size: 18px;
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
      font-size: 18px;
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
      font-size: 18px;
      outline: 0;
    }
  }
}
.PcContact .FormMain{
  width:100%;
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
      font-size: 18px;
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
      font-size: 18px;
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
      font-size: 24px;
      margin-bottom: 2rem;
      font-family: 'PoppinsBold', 'Microsoft YaHei';
      transition: all .3s;
      &:hover {
        background: #000;
        border: 1px solid #c6b17b;
      }
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
      background-size: 15px;
      &::placeholder{
        color: #cccccc;
      }
      option {
        color: #000;
      }
    }
  }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      background-color: #fff;
      -webkit-appearance:none;
      border: 1px solid #cccccc;
      outline: none;
      margin-right: 10px;
  }

  input[type="checkbox"]:checked {
      border: 1px solid #666666;
      background-image: url('/images/mobile/checked.png'); /*复选框的背景图*/
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto;
      &+label {
          color: #000;
      }
  }
  .only_tilte {
    h4 {
      display: block;
      font-size: 18px;
      color: #ccc;
      font-weight: 500;
      padding-left: 35px;
    }
  }
  .checkbox_op {
    label {
      display: flex;
      font-size: 18px;
      color: #ccc;
      align-items: center;
    }
  }
}
</style>
<style scoped lang="less">
.PcContact {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .Cmsbg {
          background: url('/images/pc/pcNew_02.jpg') no-repeat center center;
          background-size: cover;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding-top: 130px;
          .Innerbox {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .leftside {
              width: 50%;
            }
            .rightside {
              width: 45%;
            }
          }
          .contactUsContainer {
            width: 100%;
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
                .pageTitleSmall {
                  width: 100%!important;
                }
                .Addr {
                  font-size: 18px;
                  color: #fff;
                  margin-top: 1rem;
                }
                .tel {
                  font-size: 18px;
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
    padding-top:130px;
    background: #000;
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
          width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .left {
            width: 38%;
          }
          .right {
            width: 58%;
          }
          .InsTitle {
            font-size: 24px;
            color: #c6b17b;
            margin-top: 1rem;
            font-family: 'PoppinsBold', 'Microsoft YaHei';
          }
          .InsText {
            font-size: 18px;
            color: #fff;
            margin-bottom: 2rem;
            line-height: 2rem;
          }
          .InsImg {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            img {
              width: 100%;
            }
          }
        }
        .P1 {
          background: url('/images/pc/pcNew_01_01.jpg') no-repeat center center;
          background-size: 100% 100%;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding-top: 50px;
          padding-bottom: 50px;
        }
        .P2 {
          background: url('/images/pc/pcNew_01_02.jpg') no-repeat center center;
          background-size: 100% 100%;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding-top: 50px;
          padding-bottom: 50px;
        }
        .P3 {
          background: url('/images/pc/pcNew_02.jpg') no-repeat center center;
          background-size: 100% 100%;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding-top: 50px;
          padding-bottom: 50px;
        }
      }
    }
  }
}
.clear {
  clear: both;
}
</style>

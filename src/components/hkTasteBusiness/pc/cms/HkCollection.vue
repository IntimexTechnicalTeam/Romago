<template>
  <div class="InsCmsContentN">
    <div class="CmsContent">
      <p v-html="content.Body" class="Main"></p>
      <div class="DISCOVERTHECOLLECTION" :class="{'bgblack':id==='40318'}">
        <div class="Inner">
          <div class="titleMain">
               <p class="title">{{$t('Message.DISCOVERTHECOLLECTION')}}</p>
          </div>
          <div class="productMain">
            <div class="perProcut" v-for="(v,index) in ProductList" :key="index">
              <router-link :to="'/product/detail/'+v.Sku">
                <p class="img"><img :src="'https://romago.uat2.intimex.hk/'+v.Img"></p>
                <p class="title">{{v.Name}}</p>
              </router-link>
            </div>
          </div>
          <div class="btn"><router-link :to="'/product/search/-?' + 'catalogs=' + JSON.stringify([catId]) + '&type=0'">{{$t('Message.SEEALLWATCHES')}}</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
})
export default class HkCollection extends Vue {
  content:any[]=[];
  TitleName:string='';
  ContentDateTime:string='';
  CateName:string='';
  oldScrollTop:number=0;
  CurrentPage:number=0;
  PageSize:number=4;
  ProductList:any[]=[];
  catId:number=0;
  get currentlang () {
    return this.$Storage.get('locale');
  }
  get id () {
    return this.$route.params.id ? this.$route.params.id : '';
  }
  getContent () {
    this.$Api.cms.getContentByDevice({ Key: this.id, ContentId: this.id, IsMobile: false }).then(result => {
      this.content = result.CMS;
      this.catId = result.CMS.SeoKeyword;
      if (result.CMS.SeoKeyword) {
        this.getCatProduct(result.CMS.SeoDesc);
      }
      if (result.CMS.Title) document.title = result.CMS.Title;
    });
  }
  getCatProduct (Pos) {
      var page = 'Home';
      this.$Api.promotion.getPromotion('Home', Pos).then((result) => {
        if (result.Promotion.PrmtProductList.length > 0) {
          this.ProductList = result.Promotion.PrmtProductList.slice(0, 4);
        }
      });
    }
  get lang () {
    return this.$Storage.get('locale');
  }
  get queryLang () {
    return this.$route.query.Lang || '';
  }
  created () {
    this.getContent();
  }
  mounted() {
    // 监听页面滚动事件
    window.addEventListener('scroll', this.scrolling);
  }
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrolling);
  }
  scrolling() {
      // 滚动条距文档顶部的距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 滚动条滚动的距离
      let scrollStep = scrollTop - this.oldScrollTop;
      // 更新——滚动前，滚动条距文档顶部的距离
      this.oldScrollTop = scrollTop;

      // 变量windowHeight是可视区的高度
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 变量scrollHeight是滚动条的总高度
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      // 滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight) {
        // 你想做的事情
        console.log('header  你已经到底部了');
      }
      if (scrollStep < 0) {
        console.log('header 滚动条向上滚动了！');
      } else {
        $('html').find('.InnerText').css('opacity', 0);
      }
      // 判断是否到了最顶部
      if (scrollTop <= 0) {
        $('html').find('.InnerText').css('opacity', 1);
      }
    }
  @Watch('$route', { deep: true })
  onIdChange () {
    this.getContent();
  }
}
</script>
<style scoped lang="less">
.InsCmsContentN {
  width: 100%;
  display: flex;
  background-size: cover;
  flex-wrap: wrap;
  .CmsContent {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    .bgblack {
      background: #000;
    }
    .Main {
      /deep/ .A1 {
         .welcomeFix {
          width: 100%;
          position: fixed;
          height: 100vh;
          z-index: -1;
          background:url('/images/pc/A1/A1_01.jpg') no-repeat center center;
          background-size: cover;
         }
          .mainT {
            .tpB{
              margin-top: 50vh;
            }
          }
      }
      /deep/ .A2 {
         .welcomeFix {
          width: 100%;
          position: fixed;
          height: 100vh;
          z-index: -1;
          background:url('/images/pc/A2/A2_01.jpg') no-repeat center center;
          background-size: cover;
         }
      }
      /deep/ .A3 {
         .welcomeFix {
          width: 100%;
          position: fixed;
          height: 100vh;
          z-index: -1;
          background:url('/images/pc/A3/A3_01.jpg') no-repeat center center;
          background-size: cover;
         }
      }
      /deep/ .A4 {
         .welcomeFix {
          width: 100%;
          position: fixed;
          height: 100vh;
          z-index: -1;
          background:url('/images/pc/A4/A4_01.jpg') no-repeat center center;
          background-size: cover;
         }
         .bgBanner {
            width: 100%;
            height: 480px;
            background: url('/images/pc/A4/A4_03.jpg') center center no-repeat;
            background-size: cover;
         }
         .tpA {
          padding-bottom: 30px;
         }
         .bgWhite {
          padding-top: 50px;
         }
      }
      /deep/ .A5 {
         .welcomeFix {
          width: 100%;
          position: fixed;
          height: 100vh;
          z-index: -1;
          background:url('/images/pc/A5/A5_01.jpg') no-repeat center center;
          background-size: cover;
         }
         .bgBanner {
            width: 100%;
            height: 480px;
            background: url('/images/pc/A5/A5_03.jpg') center center no-repeat;
            background-size: cover;
         }
         .tpA {
          padding-bottom: 30px;
         }
         .bgWhite {
          padding-top: 50px;
         }
      }
      /deep/ .B1 {
         .welcomeFix {
          width: 100%;
          position: fixed;
          height: 100vh;
          z-index: -1;
          background:url('/images/pc/B1/B1_05.jpg') no-repeat center center;
          background-size: cover;
         }
          .mainT {
            .tpB{
              margin-top: 50vh;
            }
          }
      }
      /deep/ .C1 {
         .welcomeFix {
          width: 100%;
          position: fixed;
          height: 100vh;
          z-index: -1;
          background:url('/images/pc/C1/C1_01.jpg') no-repeat center center;
          background-size: cover;
         }
          .mainT {
            .tpB{
              margin-top: 50vh;
            }
          }
      }
      /deep/ .CollectionMain {
        width: 100%;
        display: inline-block;
        position: relative;
        .welcomeFix {
            .warperMain {
              position: relative;
              width: 100%;
              height: 100%;
              .InnerText {
                position: absolute;
                width: 1200px;
                left: 50%;
                transform: translate(-50%);
                bottom: 10%;
                text-align: center;
                .headTitle {
                  display: inline-block;
                  color: #fff;
                  font-size: 32px;
                  letter-spacing: 5px;
                  &::after {
                    content: '';
                    width: 100px;
                    height: 5px;
                    background: #c6b17b;
                    display: block;
                    margin: 0 auto;
                    margin-top: 10px;
                  }
                }
                .content {
                  color: #fff;
                  font-size: 16px;
                  width: 80%;
                  margin: 0 auto;
                  margin-top: 30px;
                }
              }
            }
        }
        .mainT {
          z-index: 1;
          padding-top: 100vh;
          .tpA {
            background: #fff;
          }
          .tpB {
            background: #fff;
          }
          .bgWhite {
            width: 100%;
            display: inline-block;
          }
          .bgBlack {
            width: 100%;
            display: inline-block;
            background: #000!important;
          }
            .textTitle {
              display: inline-block;
              color: #c6b17b;
              font-size: 32px;
              letter-spacing: 5px;
              padding-top: 80px;
              &::before {
                content: '';
                width: 100px;
                height: 5px;
                background: #c6b17b;
                display: block;
                margin-bottom: 10px;
              }
            }
            .textcontent {
              color: #999;
              font-size: 16px;
              margin-top: 30px;
            }
            .TopA {
              width: 800px;
              margin: 0 auto;
              text-align: center;
              padding-top: 50px;
              padding-bottom: 50px;
              img {
                width: 100%;
              }
              .headTitle {
                display: inline-block;
                color: #333;
                font-size: 32px;
                letter-spacing: 5px;
                width: 80%;
                &::after {
                  content: '';
                  width: 100px;
                  height: 5px;
                  background: #c6b17b;
                  display: block;
                  margin: 0 auto;
                  margin-top: 10px;
                }
              }
              .content {
                color: #999;
                font-size: 16px;
                margin-top: 30px;
              }
            }
            .TopB {
              width: 1200px;
              display: flex;
              margin: 0 auto;
              justify-content: space-between;
              padding-top: 50px;
              padding-bottom: 50px;
              .left {
                width: 48%;
                img {
                  width: 100%;
                }
              }
              .right {
                width: 48%;
              }
            }
           .TopC {
              width: 1200px;
              display: flex;
              margin: 0 auto;
              justify-content: space-between;
              .left {
                width: 48%;
              }
              .right {
                width: 48%;
                img {
                  width: 100%;
                }
              }
            }
        }
      }
    }
  }
  .DISCOVERTHECOLLECTION {
    width: 100%;
    display: inline-block;
    background: #fff;
    padding-top: 50px;
    padding-bottom: 150px;
    .Inner {
      width: 1200px;
      margin: 0 auto;
      .titleMain {
        width: 100%;
        display: flex;
        justify-content:center;
        .title {
          display: inline-block;
          font-size: 32px;
          letter-spacing: 5px;
          padding-top: 80px;
          text-align: center;
          color: #c6b17b;
          &::before {
            content: '';
            width: 100%;
            height: 1px;
            background: #c6b17b;
            display: block;
            margin-bottom: 20px;
          }
        }
      }
      .productMain {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        .perProcut {
          width: 23%;
          cursor: pointer;
          float: left;
          margin-right: 2.66%;
          &:last-child {
            margin-right: 0px!important;
          }
          &:hover {
            .title{
              text-decoration: underline;
              color: #c6b17b;
            }
          }
          .img {
            width: 100%;
            img {
              width: 100%;
            }
          }
          .title {
            width: 90%;
            margin: 0 auto;
            font-size: 16px;
            text-align: center;
            transition: all .5s;
            color: #999;
          }
        }
      }
      .btn {
        width: 100%;
        display: inline-block;
        margin-top: 50px;
        a{
          width: 200px;
          margin: 0 auto;
          display: flex;
          height: 40px;
          line-height: 40px;
          color:#c6b17b;;
          border: 1px solid #c6b17b;
          align-items: center;
          justify-content: center;
          transition: all .5s;
          &:hover {
            background: #333;
            border: 1px solid #333;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

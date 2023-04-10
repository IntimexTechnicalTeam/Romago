<template>
  <div class="InsCmsContentN">
    <div class="CmsContent">
      <p v-html="content.Body" class="Main"></p>
      <div class="DISCOVERTHECOLLECTION">
        <div class="Inner">
          <div class="titleMain">
               <p class="title">{{$t('Message.DISCOVERTHECOLLECTION')}}</p>
          </div>
          <div class="productMain">
            <div class="perProcut">
                <p class="img"><img src="/images/pc/RM111-GR-P1.png"></p>
                <p class="title">馭光者沙色夜光塗層自動腕錶</p>
            </div>
            <div class="perProcut">
                <p class="img"><img src="/images/pc/RM111-GR-P1.png"></p>
                <p class="title">馭光者沙色夜光塗層自動腕錶</p>
            </div>
            <div class="perProcut">
                <p class="img"><img src="/images/pc/RM111-GR-P1.png"></p>
                <p class="title">馭光者沙色夜光塗層自動腕錶</p>
            </div>
            <div class="perProcut">
                <p class="img"><img src="/images/pc/RM111-GR-P1.png"></p>
                <p class="title">馭光者沙色夜光塗層自動腕錶</p>
            </div>
          </div>
          <div class="btn"><router-link to="/">SEE ALL WATCHES</router-link></div>
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
  get currentlang () {
    return this.$Storage.get('locale');
  }
  get id () {
    return this.$route.params.id ? this.$route.params.id : '';
  }
  getContent () {
    this.$Api.cms.getContentByDevice({ Key: this.id, ContentId: this.id, IsMobile: false }).then(result => {
      this.content = result.CMS;
      if (result.CMS.Title) document.title = result.CMS.Title;
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
      console.log('header 滚动距离 ', scrollTop);
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
    .Main {
      /deep/ .CollectionMain {
        width: 100%;
        display: inline-block;
        position: relative;
        .welcomeFix {
          width: 100%;
          position: fixed;
          height: 100vh;
          z-index: -1;
          background:url('/images/pc/A1/A1_01.jpg') no-repeat center center;
            background-size: cover;
            .warperMain {
              position: relative;
              width: 100%;
              height: 100%;
              .InnerText {
                position: absolute;
                width: 1200px;
                left: 50%;
                transform: translate(-50%);
                bottom: 20%;
                text-align: center;
                .headTitle {
                  display: inline-block;
                  color: #fff;
                  font-size: 32px;
                  letter-spacing: 5px;
                  font-weight: 700;
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
            margin-bottom: 50vh;
          }
          .tpB {
            background: #fff;
          }
          .bgWhite {
            width: 100%;
            display: inline-block;
            .textTitle {
              display: inline-block;
              color: #c6b17b;
              font-size: 32px;
              letter-spacing: 5px;
              padding-top: 80px;
              font-weight: 700;
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
                font-weight: 700;
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
                color: #333;
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
          font-weight: 700;
          &::before {
            content: '';
            width: 100%;
            height: 1px;
            background: #999;
            display: block;
            margin-bottom: 20px;
          }
        }
      }
      .productMain {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 20px;
        .perProcut {
          width: 23%;
          cursor: pointer;
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
          color:#333;
          border: 1px solid #333;
          align-items: center;
          justify-content: center;
          transition: all .5s;
          &:hover {
            background: #333;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

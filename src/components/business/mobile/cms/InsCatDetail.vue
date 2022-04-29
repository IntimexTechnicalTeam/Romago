<template>
  <div id="container" class="catDetail">
    <div class="DetailTitle">
      <img :src="cmsCategory.ImagePath">
      <div class="TitleBg">
        <div class="innerBoxText">{{cmsCategory.Name}}</div>
      </div>
    </div>

    <div class="catContent">
        <template v-if="cmsCategory.PageStyle === '0' || cmsCategory.PageStyle === '1'">
          <div v-html="cmsCategory.Content" class="layer"></div>
        </template>

        <ins-cat-layout2 :catData="cmsCatTree" :cmsData="contentList" @changeCatSelect="changeCatSelect" v-if="cmsCategory.PageStyle === '2'" />

        <ins-cat-layout3 :cmsData="contentList" v-if="cmsCategory.PageStyle === '3'" />

        <ins-cat-layout4 :cmsData="contentList" :pager="pager" v-if="cmsCategory.PageStyle === '4'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    // InsBanner: () => import('@/components/base/InsBanner.vue'),
    InsCatLayout2: () => import('@/components/business/mobile/cms/InsCatLayout2.vue'),
    InsCatLayout3: () => import('@/components/business/mobile/cms/InsCatLayout3.vue'),
    InsCatLayout4: () => import('@/components/business/mobile/cms/InsCatLayout4.vue')
  }
})
export default class insNews extends Vue {
    cmsCategory: object = {}; // cms下单个目录的信息
    cmsCatTree: object[] = []; // cms目录
    contentList: object[] = []; // cms内容列表
    catId: number = 0; // Tree点击获取内容列表的目录id
    PageStyle: string = '0'; // catDetail页面类型
    pager: any = {
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示条目个数
      totalRecord: 0 // 总条目数
    }

    // 根据设备类型获取CMSCategory信息
    getCategoryByDevice () {
      this.$Api.cms.getCategoryByDevice({ CatId: this.id, IsMobile: true }).then((result) => {
        if (result.Succeeded) {
          this.cmsCategory = result;
          this.PageStyle = result.PageStyle;

          switch (result.PageStyle) {
              case '2':
                this.getCategoryTree();
                break;
              case '3':
                this.getSubCatContents();
                break;
              case '4':
                this.getContentsByCatId();
                break;
          }

          this.$nextTick(() => {
            if (result.Name) document.title = result.Name;
            (document.getElementsByName('keywords')[0] as any).content = result.SeoKeyword;
            (document.getElementsByName('description')[0] as any).content = result.SeoDesc;
            (document.getElementsByName('twitter:description')[0] as any).content = result.SeoDesc;
            (document.getElementsByName('twitter:title')[0] as any).content = result.Name;
          });
        } else {
          this.$message({
            message: result.Message,
            type: 'error'
          });
        }
      });
    }

    // 获取cms该id下所有的Category
    getCategoryTree () {
      this.$Api.cms.getCategoryTree({ id: this.id }).then((result) => {
        if (result && result.length) {
          this.cmsCatTree = result;
          this.catId = result[0].Id;
          this.getContentsByCatId();
        } else {
          this.getContentsByCatId();
        }
      });
    }

    // 获取cms该id下所有的cms
    getContentsByCatId () {
      let catId = this.catId || this.id;
      this.$Api.cms.getContentsByCatId(catId, this.pager.currentPage, this.pager.pageSize).then((result) => {
        if (this.PageStyle === '4') {
          this.contentList = this.contentList.concat(result.Data);
        } else {
          this.contentList = result.Data;
        }

        result.Data.forEach(function (i) {
          var newDate = new Date(i.CreateDate.replace(/-/g, '/'));
          i.CreateDate = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
        });
        this.pager.totalRecord = result.TotalRecord;
      });
    }

    // 获取 Category 和所有 SubCategory 的 cms 列表
    getSubCatContents () {
      this.$Api.cms.getSubCatContents({ CatId: this.id, IsMobile: true }).then((result) => {
        console.log(result, ' 获取 Category 和所有 SubCategory 的 cms 列表');
        this.contentList = result.Data;
      });
    }

    // 树形控件选择的cms目录改变
    changeCatSelect (Id) {
      this.catId = Id;
      this.getContentsByCatId();
    }

    get id () {
      return this.$route.params.id;
    }

    mounted () {
      this.getCategoryByDevice();
    }

    @Watch('id', { deep: true })
    onKeyChange () {
      this.cmsCategory = {};
      this.cmsCatTree = [];
      this.contentList = [];
      this.catId = 0;
      this.getCategoryByDevice();
    }

    @Watch('pager.currentPage', { deep: true })
    onPagerChange() {
      this.getContentsByCatId();
    }
}
</script>
<style scoped lang="less">
.catDetail {
  .DetailTitle{
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    position: relative;
    align-items: center;
    justify-content: center;
    img{
      width: 100%;
    }
    .TitleBg{
      width: 75%;
      border: 1px solid #ffffff;
      height: 4.5rem;
      line-height: 4.5rem;
      margin: 0 auto;
      padding: 10px;
      margin-bottom: 20px;
      top: 50%;
      position: absolute;
      transform: translateY(-50%);
      .innerBoxText{
        background:#ffffff;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        font-weight: 700;
        font-family: 'Arial';
      }
    }
  }

  .catContent {
    width: 90%;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 2rem;

    .layer {
      font-size: 1.2rem;
    }
  }
}
</style>

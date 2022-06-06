<template>
  <div class="InsCmsContentN">
    <p class="pageTitle">{{CateName}}</p>
    <div class="CmsContent">
      <p class="coverImg"><img :src="content.Cover"></p>
      <p class="title">{{content.Title}}</p>
      <p class="contentTime">{{ContentDateTime}}</p>
      <p v-html="content.Body" class="Main"></p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
})
export default class InsCmsContentN extends Vue {
  content:any[]=[];
  TitleName:string='';
  ContentDateTime:string='';
  CateName:string='';
  get currentlang () {
    return this.$Storage.get('locale');
  }
  get id () {
    return this.$route.params.id ? this.$route.params.id : '';
  }
  getContent () {
    this.$Api.cms.getContentByDevice({ Key: this.id, ContentId: this.id, IsMobile: false }).then(result => {
      this.content = result.CMS;
      this.TitleName = result.CMS.Title;
      var newDate = new Date(result.CMS.CreateDate.replace(/-/g, '/'));
      result.CMS.CreateDate = newDate.getDate() + '.' + (newDate.getMonth() + 1) + '.' + +newDate.getFullYear();
      this.ContentDateTime = result.CMS.CreateDate;
      this.CateName = result.CMS.Category.Name;
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
  background:url('/images/pc/Product-list.jpg') no-repeat center center;
  background-size: cover;
  flex-wrap: wrap;
  padding-top: 130px;
  padding-bottom: 80px;
  .coverImg {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-top: 1rem;
    img {
      width: 100%;
    }
  }
  .CmsContent {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .title {
        font-size: 28px;
        color: #fff;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-top: .5rem;
        margin-bottom: .5rem;
        font-family: 'PoppinsBold', 'Microsoft YaHei';
        width: 100%;
    }
    .contentTime {
        color:#c6b17b;
        font-size:18px;
        width: 100%;
    }
    .Main {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 30px;
      /deep/ p {
        font-size: 1.2rem;
        color: #e5e5e5;
        line-height: 2rem;
      }
    }
  }
}
</style>

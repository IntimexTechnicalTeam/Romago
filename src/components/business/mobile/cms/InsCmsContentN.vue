<template>
  <div class="InsCmsContentN">
    <!-- 联络我们页面 -->
    <!-- 其他页面 -->
    <p class="pageTitle">{{TitleName}}</p>
    <p class="coverImg"><img :src="content.Cover"></p>
    <div class="CmsContent">
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
  background:url('/images/mobile/ohters_16.jpg') no-repeat center center;
  background-size: cover;
  flex-wrap: wrap;
  padding-top: 5rem;
  padding-bottom: 5rem;
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
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .Main {
      /deep/ p {
        font-size: 1.2rem;
        color: #fff;
        line-height: 2rem;
      }
    }
  }
}
</style>

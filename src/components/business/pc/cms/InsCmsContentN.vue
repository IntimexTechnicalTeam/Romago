<template>
  <div id="container" class="PcContact">
    <!-- 联络我们页面 -->
    <!-- 其他页面 -->
    <div class="CmsNormal">
      <div class="CmsContent">
         <p class="pageTitleName">{{TitleName}}</p>
        <p v-html="content.Body" class="otherpage"></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    PkcmsBanner: () => import('@/components/hkTasteBusiness/mobile/cms/PkcmsBanner.vue')
  }
})
export default class InsCmsContent extends Vue {
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
.pageTitleName {
  font-size: 24px;
  font-weight: 700;
}
.coverbg {
  width: 300px;
  position: absolute;
  top: 0px;
  right: 0px;
}
.otherpage {
  /deep/ p {
    line-height: 25px;
  }
  /deep/ .aboutus {
    width: 800px;
    float: left;
    padding-top: 50px;
  }
  /deep/ .headerTitle {
    font-weight: 700;
    font-size: 20px;
    margin-top: 30px;
  }
}
.contactus {
  margin-bottom: 50px;
  /deep/ .contactBox {
    .title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
}
.CmsNormal{
  width: 100%;
  display: inline-block;
}

#container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 80px;
  padding-bottom: 80px;
}
.CmsContent{
    position: relative;
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 3rem;
    min-height: 500px;
}

.clear {
  clear: both;
}
.pageTitleName {
    font-size: 1.4rem;
    width: 100%;
    margin: 0 auto;
    line-height: 30px;
    text-align: center;
    margin-bottom: 20px;
}
.clear {
  clear: both;
}
</style>

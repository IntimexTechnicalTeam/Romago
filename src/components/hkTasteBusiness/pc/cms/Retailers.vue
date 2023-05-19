<template>
  <div class="InsCmsContentN">
    <p class="pageTitle">{{CateName}}</p>
    <div class="CmsContent">
      <div class="left">
        <p v-html="MapInfo" class="contents"></p>
      </div>
      <div class="right">
          <select v-model="selectAddress" class="selectAddress">
           <option value= "" >-----{{$t('Message.Retailers')}}-----</option>
            <option v-for="(v,index) in CatList" :key="index" :value= "v.Content" >{{v.Name}}</option>
          </select>
            <p v-html="selectAddress"  class="showadd"></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
})
export default class Retailers extends Vue {
  CateName:string='';
  MapInfo:string='';
  CatList:any=[];
  selectAddress:string='';
  get currentlang () {
    return this.$Storage.get('locale');
  }
  get id () {
    return this.$route.params.id ? this.$route.params.id : '';
  }
  getCategoryByDevice () {
    var params = {
      key: 'SELECTRETAILERS',
      IsMobile: false
    };
    this.$Api.cms.getCategoryByDevice(params).then(result => {
      console.log(result, 'eeeee');
      this.CateName = result.ReturnValue.Name;
      this.MapInfo = result.ReturnValue.Content;
      this.CatList = result.ReturnValue.Children;
    });
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  get queryLang () {
    return this.$route.query.Lang || '';
  }
  created () {
    this.getCategoryByDevice();
  }
  @Watch('$route', { deep: true })
  onIdChange () {
    this.getCategoryByDevice();
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
  .CmsContent {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 50px;
    .left {
      width: 48%;
      /deep/ iframe {
        width: 100%;
      }
    }
    .right {
      width: 48%;
      .selectAddress {
        width: 300px;
        height: 45px;
        background: #fff;
        line-height: 45px;
        font-size: 18px;
        padding-left: 20px;
      }
      .showadd {
        margin-top: 50px;
        /deep/ p{
          font-size: 18px!important;
          color: #fff;
        }
        /deep/ span{
          font-size: 18px!important;
          color: #fff;
        }
      }
    }
  }
}
</style>

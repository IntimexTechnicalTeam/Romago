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
      IsMobile: true
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
  background:url('/images/mobile/ohters_16.jpg') no-repeat center center;
  background-size: cover;
  flex-wrap: wrap;
  padding-top: 5rem;
  padding-bottom: 5rem;
  .CmsContent {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    .left {
      width: 100%;
      /deep/ iframe {
        width: 100%;
      }
    }
    .right {
      width: 100%;
      padding-top: 2rem;
      .selectAddress {
        width: 100%;
        height: 45px;
        background: #fff;
        line-height: 45px;
        font-size: 18px;
        padding-left: 20px;
        outline: 0;
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

<template>
  <div class="liveBox" style="text-align: center;">
        <div class="mapBg">
           <p v-html="fbContent.Body" class="fb"></p>
        </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
})
export default class HkLiveBox extends Vue {
  fbContent:string='';
  getFbContent () {
    this.$Api.cms.getContentByDevice({ Key: 'Facebook', IsMobile: false }).then(result => {
      this.fbContent = result.CMS;
    });
  }
  created () {
    this.getFbContent();
  }
  get lang () {
    return this.$Storage.get('locale');
  }
}
</script>
<style scoped lang="less">
.liveBox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .mapBg {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding-top: 8rem;
    .fb {
      /deep/ img {
        width: 100%;
      }
    }
  }
}
</style>

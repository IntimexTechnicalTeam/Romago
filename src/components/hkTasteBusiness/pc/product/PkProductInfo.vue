<template>
<div class="in_panel_header pcpdinfo">
    <p class="in_panel_subTitle">{{panelDetail.Name}}</p>
    <p class="ProductCode">{{panelDetail.Code}}</p>
    <p class="rate"> <el-rate  v-model="panelDetail.Score" disabled  disabled-void-color="#ffbb07" disabled-void-icon-class="el-icon-star-off"></el-rate></p>
    <div class="PriceMain">
        <inPrices :primePrices="panelDetail.ListPrice+AddPrice" :currentPrices="panelDetail.SalePrice+AddPrice"  :currency="panelDetail.Currency" :DefaultListPrice="panelDetail.DefaultListPrice+AddPrice" :DefaultSalePrice="panelDetail.DefaultSalePrice+AddPrice" :DefaultCurrency="panelDetail.DefaultCurrency" size="huge" :heightLine="true"  :max="panelDetail.MaxPurQty" :min="panelDetail.MinPurQty"></inPrices>
    </div>
    <div class="in_unitInfo" v-if="panelDetail.UnitInfo.Desc!==null">{{$t('product.Unit')}}:{{panelDetail.UnitInfo.Desc}}</div>
    <!-- <div class="in_panel_product">
        <div class="ProductCode">
            <div class="leftpart"></div>
            <div class="rightpart" v-if="FrontE.version !== 1"><HkProductShare></HkProductShare></div>
        </div>
    </div> -->
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import inPrices from '@/components/base/pc/InsPrices.vue';
import HkProductShare from '@/components/hkTasteBusiness/pc/product/HkProductShare.vue';
@Component({ components: { inPrices, HkProductShare } })
export default class PkProductInfo extends Vue {
  @Prop() private readonly panelDetail!: PanelDetail;
  @Prop() private readonly ProductSku!: string;
  @Prop() private readonly AddPrice!: string;
  whatsApp() {
    var u = location.href;
    var t = document.title;
    window.open(
      'https://api.whatsapp.com/send?text=' +
        encodeURIComponent(t) +
        encodeURIComponent('\n\n' + u),
      '_blank'
    );
  }
  addFavorite () {
    let ps;
    if (this.panelDetail.IsFavorite) {
      ps = this.$Api.product.removeFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
            this.$message({
              message: this.$t('product.successInRemoving') as string,
              type: 'success',
              customClass: 'messageBoxMobile'
            });
          this.panelDetail.IsFavorite = false;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    } else {
      ps = this.$Api.product.addFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInAdding'));
          this.$message({
            message: this.$t('product.successInAdding') as string,
            type: 'success',
            customClass: 'messageBoxMobile'
          });
          this.panelDetail.IsFavorite = true;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    }
    return ps;
  }
}
</script>
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
</style>
<style scoped lang="less">
/deep/ .el-rate__icon {
  color: #fff!important;
  &::before {
     color: #fff!important;
  }
}
.pcpdinfo {
  .in_panel_subTitle {
    font-size: 30px;
    color: #fff;
    width: 100%;
    margin: 0 auto;
    line-height: 36px;
    font-family: 'PoppinsBold', 'Microsoft YaHei';
  }
  .ProductCode {
    color: #b2b2b2;
    font-size: 16px;
  }
  .PriceMain {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: .5rem;
    padding-bottom: .5rem;
  }
}
</style>

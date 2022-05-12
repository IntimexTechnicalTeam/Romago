<template>
<div class="in_panel_header">
    <div class="in_panel_subTitle">{{panelDetail.Name}}</div>
    <div class="in_panel_price"><inPrices :primePrices="panelDetail.ListPrice+AddPrice" :currentPrices="panelDetail.SalePrice+AddPrice"  :currency="panelDetail.Currency" :DefaultListPrice="panelDetail.DefaultListPrice+AddPrice" :DefaultSalePrice="panelDetail.DefaultSalePrice+AddPrice" :DefaultCurrency="panelDetail.DefaultCurrency" size="huge" :heightLine="true" styla="margin: 1rem 0;" :max="panelDetail.MaxPurQty" :min="panelDetail.MinPurQty"></inPrices></div>
    <div class="shareBtn">
      <div class="left">
          <div class="PerBtn">
            <a>
              <img :src="panelDetail.IsFavorite ? '/images/mobile/ohters_03.png': '/images/mobile/ohters_04.png'" @click="addFavorite"/>
              <span>Follow</span>
            </a>
            </div>
          <div class="PerBtn">
            <a
            onclick="window.open('http://www.facebook.com/share.php?u=' + window.location.href+'&t=' + document.title);">
            <img src="/images/mobile/mpic_11.png"/>
            <span>Facebook</span>
          </a>
        </div>
      </div>
      <div class="right">
          <el-rate  v-model="panelDetail.Score" disabled  disabled-void-color="#fff" void-color="#fff"  disabled-void-icon-class="el-icon-star-off"></el-rate>
      </div>
    </div>
    <div class="in_unitInfo" v-if="panelDetail.UnitInfo.Desc!==null">{{$t('product.Unit')}}:{{panelDetail.UnitInfo.Desc}}</div>
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import inPrices from '@/components/base/mobile/InsPrices.vue';
import HkProductShare from '@/components/hkTasteBusiness/mobile/product/HkProductShare.vue';
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
.shareBtn {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  .left {
    width: 48%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .PerBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-size: 1rem;
          color: #b2b2b2;
          margin-left: .5rem;
        }
        img {
          width: 2rem;
        }
      }
    }
  }
  .right {
    width: 48%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.in_unitInfo{
  font-size: 1.2rem;
  color:@base_color;
  text-align: right;
  width: 95%;
  margin: 0 auto;
}
.in_panel_header{
  width: 100%;
  display: block;
}
.in_panel_product{
    width: 100%;
    padding-bottom: 3rem;
    border-bottom: 1px solid #505050;
    padding-top: 3rem;
}
.in_pannel_addtofav{
    width: 95%;
    margin: 0 auto;
    text-align: center;
}
.in_pannel_addtofav img{
    width:2.5rem;
}
.in_panel_product .ProductCode{
    width: 95%;
    margin: 0 auto;
}
.in_panel_product .ProductCode .leftpart{
    width:50%;
    float: left;
    font-size: 1.2rem;
    word-break: break-all;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-top: .5rem;
}
.in_panel_product .ProductCode .rightpart{
    width: 50%;
    float: left;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1rem;
}
.in_panel_price {
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.in_panel_subTitle{
    font-size: 1.6rem;
    position: relative;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 2rem;
    font-family: 'PoppinsBold', 'Microsoft YaHei';
    color: #fff;
  >img{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-50%);
  }
}
</style>

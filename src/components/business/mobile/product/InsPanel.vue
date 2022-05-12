<template>
  <div class="in_panel_warpper mobileWarper" :style="warpperStyle">
    <div class="selectNum">
      <div class="left">
        <div class="in_panel_content">
          <inSelect
            v-for="(item,index) in panelDetail.AttrList"
            :items="item"
            :key="index"
            placeholder="请选择"
            v-model="ProductInfor['Attr'+(index+1)]"
            @input="changeAttr"
            @changePrice="AdditionalPrice"
          ></inSelect>
          <inNum  v-model="ProductInfor.Qty" :v="ProductInfor.Qty" :min="panelDetail.MinPurQty" :max="panelDetail.MaxPurQty" styla="text-align:center;"></inNum>
          <div class="in_panel_iconList">
            <div v-for="item in panelDetail.icons" :key="item.id" class="in_panel_icon_warpper">
              <img :src="item.src" />
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <p class="ProductCode">{{panelDetail.Code}}</p>
      </div>
    </div>
    <!-- <div class="in_panel_footer">
      <el-button @click="click('addToCart')" class="actionBtn addToCart" :loading="Loading">{{$t('product.addToCart')}}</el-button>
      <el-button @click="click('buy')" class="actionBtn buyNow" :loading="buyLoading">{{$t('product.buy')}}</el-button>
    </div> -->
    <div class="postBtn">
        <div class="in_panel_footer" v-if="panelDetail.ProductStatus!==-1 && panelDetail.SoldOutAttrComboList.length===0">
          <inButton
            v-for="item in panelDetail.button"
            :nama="$i18n.t('product.'+item.nama)"
            :key="item.nama"
            :loading="(item.action === 'addToCart')?Loading:buyLoading"
            :type="(item.action === 'addToCart' || item.action === 'favorite' || item.action === 'buy') ? 'primary' : 'error'"
            :action="item.action"
            @click="click"
          ></inButton>
        </div>
          <div class="in_panel_footer" v-else>
            <button type="button" :disabled="SoldOutAttr" @click="click('addToCart')" class="CartBtn">{{$t('product.addToCart')}}</button>
            <button type="button" :disabled="SoldOutAttr" @click="click('buy')" class="BuyBtn">{{$t('product.buy')}}</button>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import inNum from '@/components/base/mobile/InsNum.vue';
import inSelect from '@/components/base/mobile/InsRadio.vue';
import inButton from '@/components/base/pc/InsButton.vue';
import inPrices from '@/components/base/mobile/InsPrices.vue';
import HkProductShare from '@/components/hkTasteBusiness/mobile/product/HkProductShare.vue';
import ShopCartItem from '@/model/shopCartItem';
@Component({ components: { inNum, inSelect, inButton, inPrices, HkProductShare } })
export default class InsPanel extends Vue {
  @Prop() private readonly width!: string;
  @Prop() private readonly height!: string;
  @Prop() private readonly panelDetail!: PanelDetail;
  @Prop() private readonly ProductSku!: string;
  Loading:boolean=false;
  buyLoading:boolean=false;
  private delay = 0;
  private NewPrice:number=0;
  private attrPrices:any[]=[];
  private SoldOutAttr:boolean= false;
  private AttrArray:any = '';
  private AttrComboImgList:any ='';
  private AttrSelectImg:string ='';
  private ProductInfor: ShopCartItem = new ShopCartItem();
  get warpperStyle (): string {
    return 'width:' + this.width + ';height:' + this.height + ';';
  }
    click (action: string) {
    if (action) {
      let param = {
        Sku: this.ProductSku,
        Attr1: this.ProductInfor.Attr1,
        Attr2: this.ProductInfor.Attr2,
        Attr3: this.ProductInfor.Attr3,
        Qty: this.ProductInfor.Qty
      };
      if (action === 'addToCart') {
        this.Loading = true;
        this.$Api.shoppingCart.addItem(param)
          .then(
            (result) => {
              this.$message({
                message: result.Message as string,
                type: 'success',
                customClass: 'messageboxNoraml'
              });
              this.Loading = false;
            }).then(() => {
            this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
          });
      } else if (action === 'buy') {
        this.buyLoading = true;
        this.$Api.shoppingCart.addItem(param)
          .then(
            (result) => {
              this.buyLoading = false;
               if (result.Succeeded === true) {
                  this.$router.push({ name: 'shoppingcart' });
              } else {
                  this.$message({
                    message: result.Message as string,
                    type: 'success',
                    customClass: 'messageboxNoraml'
                  });
              }
            });
      }
    } else {
      Vue.prototype.$Confirm('action', Object.create(this.ProductInfor));
    }
  }
  created () {

  }
  addFavorite () {
    let ps;
    if (this.panelDetail.IsFavorite) {
      ps = this.$Api.product.removeFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInRemoving'));
          this.$message(this.$t('product.successInRemoving') as string);
          this.panelDetail.IsFavorite = false;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    } else {
      ps = this.$Api.product.addFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInAdding'));
          this.$message(this.$t('product.successInAdding') as string);
          this.panelDetail.IsFavorite = true;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    }
    return ps;
    // return this.$Api.product.addFavorite(this.ProductSku).then((result) => {
    //   if (result.Succeeded) {
    //     // Vue.prototype.$Confirm('succeed', this.$t('product.successInAdding'));
    //   } else if (result.ReturnValue.Code === 1000) {
    //     Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
    //   }
    // });
  }
  // Shake (fn) {
  //   if (!(fn instanceof Function)) return;
  //   let timeout = 1000;
  //   if (this.delay === 0) { this.delay = setTimeout(fn, timeout); } else { clearTimeout(this.delay); this.delay = setTimeout(fn, timeout); }
  // }
  changeAttr () {
    this.Shake(() => {
      // 根据选择的属性值赋值给不同的数组
      console.log(this.panelDetail, 'this.panelDetailthis.panelDetail');
      if (this.panelDetail.AttrList[0].length > 0) {
        this.AttrArray = this.ProductInfor.Attr1;
         this.AttrComboImgList = this.ProductInfor.Attr1;
      }
      if (this.panelDetail.AttrList[0].length > 0 && this.panelDetail.AttrList[1].length > 0) {
        this.AttrArray = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2;
        this.AttrComboImgList = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2;
      }
      if (this.panelDetail.AttrList[0].length > 0 && this.panelDetail.AttrList[1].length > 0 && this.panelDetail.AttrList[2].length) {
        this.AttrArray = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2 + '-' + this.ProductInfor.Attr3;
        this.AttrComboImgList = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2 + '-' + this.ProductInfor.Attr3;
      }
      console.log(this.AttrComboImgList, 'this.AttrComboImgListthis.AttrComboImgList');
      // 判断后台商品列表上架情况
      if (this.panelDetail.SoldOutAttrComboList.length > 0) {
           let flag = false;
            for (var k = 0; k < this.panelDetail.SoldOutAttrComboList.length; k++) {
                if (this.panelDetail.SoldOutAttrComboList[k] === this.AttrArray.toString()) {
                        this.SoldOutAttr = true;
                        flag = true;
                           break;
                  };
                  }
                  if (!flag) {
                    this.SoldOutAttr = false;
                  }
            }
      // 根据后台选择属性图片显示不同的值
      if (this.panelDetail.AttrComboImgList.length > 0) {
           let flagN = false;
            for (var r = 0; r < this.panelDetail.AttrComboImgList.length; r++) {
                if ((this.panelDetail.AttrComboImgList[r] as any).Key === this.AttrComboImgList.toString()) {
                        this.AttrSelectImg = this.panelDetail.AttrComboImgList[r].Img;
                        this.$store.dispatch('setAttrImgList', this.AttrSelectImg);
                        flagN = true;
                           break;
                  };
                  }
                  if (!flagN) {
                    this.AttrSelectImg = '';
                    this.$store.dispatch('setAttrImgList', '/images/pc/proddef.jpg');
                  }
            }
        this.$Api.product.checkProductStatus(this.ProductSku, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3).then((result) => {
          this.panelDetail.ProductStatus = result.object0.ReturnValue;
        });
    });
  }
  AdditionalPrice (getval) {
    let flag = false;
   for (var j = 0; j < this.attrPrices.length; j++) {
     if (this.attrPrices[j].TypeId === getval.TypeId) {
          flag = true;
          this.attrPrices[j] = {
            TypeId: getval.TypeId,
            AdditionalPrice: getval.AdditionalPrice
        };
      break;
      }
    }
    if (!flag) {
      this.attrPrices.push({
        TypeId: getval.TypeId,
        AdditionalPrice: getval.AdditionalPrice
      });
    }
    this.$emit('getPrice', this.attrPrices);
  }
  @Watch('panelDetail.AttrList', { deep: true })
  onPAChange () {
    if (this.panelDetail.AttrList.length > 0 && this.panelDetail.AttrList[0].length === 0) this.changeAttr();
    // if (this.panelDetail.AttrList !== null) this.changeAttr();
  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>

<style lang="less">
.in_panel_footer .el-button+.el-button{
  margin-left: 0px!important;
}
.in_panel_footer .actionBtn span{
  font-size: 1.6rem;
}
.in_panel_warpper .in_num_label{
  display: inline-block;
  width: auto!important;
  margin-right: 1rem;
}
.in_panel_warpper .el-input-number{
  border:1px solid #e6e6e6!important;
  box-sizing: border-box;
}
.in_panel_warpper .el-input__inner{
  border:none!important;
  box-sizing: border-box;
  width: 4rem;
}
.in_panel_warpper .in_num_main .el-input-number__decrease {
  left: 0px!important;
}
 .in_panel_warpper .in_num_main .el-input-number__increase {
   right: 0px!important;
 }
.in_panel_warpper .in_num_main .el-input-number__decrease, .in_panel_warpper .in_num_main .el-input-number__increase{
    width: 2.5rem !important;
    box-sizing: border-box;
    background: #f5f5f5!important;
    top:0px!important;
    border-radius: 0px;
}
.in_panel_warpper .in_num_main .el-input-number__decrease i, .in_panel_warpper .in_num_main .el-input-number__increase i{
    color: #333333;
    font-weight: 700;
    font-size: 1.1rem;
}
.in_panel_warpper  .el-input-number{
  width: auto!important;
}
.in_panel_warpper .el-input-number .el-input__inner{
  padding-left: 0rem;
  padding-right: 0rem;
  background: transparent!important;
  width: 10rem;
  line-height: 2.5rem!important;
  height: 2.5rem!important;
  color:#fff!important;
  font-weight: 500;
  font-size: 1.4rem;
}
.mobileWarper{
  .in_num_warpper{
    margin-top: 1rem;
    .in_num_label{
      color:#666666;
    }
  }
  .in_panel_footer {
      .CartBtn{
      height: 3.5rem;
      font-size:1.4rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      margin-bottom: 1rem;
      color: #fff;
      background: #c6b17b;
      border:1px solid #c6b17b;
      text-transform: uppercase;
      width: 48%;
      float: left;
      margin-left: 0px!important;
      font-family: 'Poppins';
       overflow: hidden;
        &:disabled{
          cursor:not-allowed;
          background: #ccc;
          border: 1px solid #ccc;
          color: #333333;
           &:hover{
           transform: translateY(0px)!important;
          }
        }
      }
      .BuyBtn{
      height: 3.5rem;
      font-size:1.4rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: #c6b17b;
      margin-bottom: 1rem;
      border:1px solid #c6b17b;
      text-transform: uppercase;
      width: 48%;
      float: left;
      margin-left: 4%;
      font-family: 'Poppins';
       overflow: hidden;
        &:disabled{
          cursor:not-allowed;
          background: #ccc;
          border: 1px solid #ccc;
          color: #333333;
           &:hover{
           transform: translateY(0px)!important;
          }
        }
      }
    .in_btn {
      height: 3.5rem;
      font-size:1.8rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      text-transform: uppercase;
      width: 48%;
      float: left;
      margin-left: 4%;
      font-family: 'Poppins';
      overflow: hidden;
      span{
        font-size:1.4rem;
      }
      &:first-child {
        margin-left: 0px!important;
        color: #fff;
        background: #c6b17b;
      }
      &:last-child{
        background: #c6b17b;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.in_panel_content{
  width: 90%;
  margin: 0 auto;
}
.in_panel_footer{
  width: 95%;
  margin: 0 auto;
}
.in_pannel_addtofav {
  width:90%;
  margin: 0 auto;
}
.in_panel_header {
  text-align: left;
}
.in_panel_subTitle{
    font-size: 2rem;
    position: relative;
    width: 90%;
    margin: 0 auto;
    text-align: center;
  >img{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-50%);
  }
}
.in_panel_footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 1rem;
}

.productDetail_price_warpper {
  display: flex;
  flex-wrap: nowrap;
  height: 5rem;
  line-height: 5rem;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0 1rem;
  margin: 1rem 0;
}
.productDetail_price {
  display: flex;
  flex-wrap: nowrap;
}
.productDetail_price_lable {
  font-size: 1.3rem;
}
.productDetail_precentPrice_content {
  margin-left: 1.6rem;
  font-size: 1.3rem;
}
.productDetail_precentPrice_content_heightLine {
  color: red;
}
.productDetail_primePrice_content {
  margin-left: 1.6rem;
  font-size: 1.3rem;
  text-decoration: line-through;
}
.in_panel_iconList {
  text-align: left;
  display: flex;
  flex-wrap: nowrap;
}
.in_panel_icon_warpper {
  margin-right: 1rem;
}
</style>
<style lang="less" scoped>
  .selectNum {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right {
      .ProductCode {
        color: #cccccc;
        font-size: 1.2rem;
        margin-top: .5rem;
      }
    }
  }
  .postBtn {
    position: fixed;
    bottom: 0px;
    width: 100%;
    left: 0px;
    z-index: 9999;
    background: #fff;
    border-top: 1px solid #eee;
  }
</style>

<template>
  <div class="shoppingcart_warrper">
    <!--main-content-->
        <p class="pageTitle">{{$t('Shoppingcart.ShoppingcartTitle')}}</p>
        <div class="ShoppingCartItem_warpper"  v-for="(one,index) in items" :key="index">
            <div class="shoppingcart_item_image">
                <a class="product-img" v-bind:href="'/product/Detail/'+one.Product.Sku">
                    <img v-bind:src="one.Product.Img_M" alt />
                  </a>
            </div>
            <div class="shoppingcart_item_detail">
                <div class="shoppingcart_item_name">{{one.Product.Name}}</div>
                <div class="shoppingcart_item_price">
                    <div>{{Currency.Code}} {{(one.Product.SalePrice) | PriceFormat}}</div>
                </div>
                <div class="shoppingcart_item_attr">
                      <span v-if="one.AttrName1">{{one.AttrTypeName1}}：{{one.AttrName1}}&nbsp;</span>
                      <span v-if="one.AttrName2">{{one.AttrTypeName2}}：{{one.AttrName2}}&nbsp;</span>
                      <span v-if="one.AttrName3">{{one.AttrTypeName3}}：{{one.AttrName3}}&nbsp;</span>
                </div>
                <div class="shoppingcart_item_qty">
                  <div class="common-num">
                      <a
                        class="reduce-num"
                        href="javascript:;"
                        v-on:click=" minusQty(one,one.Id,$event);"
                      >-</a>
                      <div class="num-content">
                        <input
                          class="input-text"
                          type="text"
                          data-num="1"
                          disabled
                          v-model="one.Qty"
                          v-on:change="updateQty(one,one.Id,$event)"
                        />
                      </div>
                      <a class="add-num" href="javascript:;" v-on:click="plusQty(one,one.Id,$event);" :class="{'disabled':one.IsAdd}">+</a>
                      </div>
                </div>
            </div>
            <div class="close"  v-on:click="removeItem(index)">
                <i class="el-icon-close"></i>
            </div>
        </div>
        <div>
          <div class="shoppingcart_total1"><span class="tp1">{{$t('product.SubTotal')}}:</span><span class="tp2">{{Currency.Code}} {{(totalAmount) | PriceFormat}}</span></div>
          <div class="shoppingcart_total"><el-button type="success" @click="submit"><span style="font-size:1.5rem;">{{ $t('Shoppingcart.Checkout') }}</span></el-button></div>
        </div>
    <!--main-content-->
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ShopCart from '../../model/ShopCart';
import ShopCartItem from '../../model/shopCartItem';
import Currency from '../../model/currency';
class Update {
  itemId!: string;
  qty!: number;
  constructor (itemId:string, qty:number) {
    this.itemId = itemId;
    this.qty = qty;
  }
}
@Component
export default class InsShoppingcart extends Vue {
  private ShoppingCart:ShopCart = new ShopCart();
  prodcutSrc: string = require('@/assets/Images/270_b.jpg');
  step: number = 1;
  totalAmount: number = 0;
  // itemsAmount: number = 0;
  // ItemsTaxAmount: number = 0;
  Currency: Currency = new Currency();
  MaxQty: number = 20;
  // cartItems: any[] = [];
  // currentCode: any = '';
  items: any[] = [
  ];
  itemQty:number=0;
  private UpdateQueQue:Update[] = [];
  isAdd:boolean = false;
  mounted () {
    // this.loadItems();
  }
  created () {
    this.load().then(() => { this.$HiddenLayer(); });
  }
  load () {
    let load = this.$Api.shoppingCart.getShoppingCart().then((result) => {
      this.ShoppingCart = result.ShopCart;
      this.Currency = result.ShopCart.DefaultCurrency;
      this.items = result.ShopCart.Items;
      this.items.forEach(v => {
        this.$set(v, 'IsAdd', false);
      });
      if (this.ShoppingCart.Items.length === 0) this.$Confirm(this.$t('Message.Message'), this.$t('Shoppingcart.None'), () => { this.$router.push('/product/search/-'); }, () => { this.$router.push('/'); });
    });
    this.loadItems();
    return load;
  }
  loadItems () {
    var _this = this;
    var itemsprice = 0;
    var Currencys;
    var itemQ;
    _this.items.forEach(element => {
      itemsprice += element.Product.SalePrice * element.Qty;
      Currencys = element.Product.Currency.Code;
      itemQ = element.Qty;
    });
    // _this.Currency = Currencys;
    _this.totalAmount = itemsprice;
    _this.itemQty = itemQ;
  }
  @Watch('items', { deep: true })
  onItemsChange (o, n) {
    this.loadItems();
  }
  removeItem (one) {
    // this.loadItems();
    let item:ShopCartItem = this.items.splice(one, 1)[0];
    this.$Api.shoppingCart.removeItem(item.Id).then(result => {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    });
  }
  next () {
    // if (!this.items || this.items.length === 0) {
    //     showInfo('<%=Resources.Caption.CartEmpty%>');
    //     return false;
    // }
  }
  minusQty (one, id, event) {
    let _this = this;
    one.Qty--;
    if (one.Qty < 1) {
      one.Qty = 1;
    }
    this.Shake(() => {
      this.$Api.shoppingCart.updateItemQty(id, one.Qty).then((result) => {
            this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
            one.IsAdd = false;
      });
    }, 500);
  }
  plusQty (one, id, event) {
    var a = one.Qty;
    let _this = this;
    one.Qty++;
    if (one.IsAdd === false) {
        one.IsAdd = true;
      setTimeout(() => {
             _this.$Api.shoppingCart.updateItemQty(id, one.Qty).then((result) => {
               if (result.Succeeded) {
                 _this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
                 one.IsAdd = false;
               } else {
                 one.Qty = a;
                  this.$message({
                      message: result.Message as string,
                      type: 'success',
                      customClass: 'messageboxNoraml'
                });
               }
            });
      }, 500);
    }
  }
  updateQty (one, id, event) {
    let _this = this;
    if (one.Qty < 1) {
      one.Qty = 1;
    }
    // if (one.Qty >= this.MaxQty) {
    //   one.Qty = this.MaxQty;
    // }
  }
  submit () {
    let temp = {};
    let item:Update;
    let waittingList = [Promise.resolve('head')];
    while (this.UpdateQueQue.length !== 0) {
      item = this.UpdateQueQue.shift() as Update;
      temp[item.itemId] = item.qty;
    }
    Object.keys(temp).forEach((element) => {
      waittingList.push(this.$Api.shoppingCart.updateItemQty(element, temp[element]));
    });
    Promise.all(waittingList).then((result) => {
      // this.$router.push('/account/checkout');
      if (this.$Storage.get('isLogin') === 1) this.$router.push('/account/checkout');
      else {
        // this.$Login(() => { this.$ShowLayer(); this.load().then(() => { this.$HiddenLayer(); }); });
        this.$router.push('/account/login?returnurl=/account/checkout');
      }
    });
  }
}
</script>
<style lang="less">
.ShoppingCartItem_warpper .el-input-number {
    position: relative;
    display: inline-block;
    width: 8rem;
    border: none;
}
</style>
<style scoped lang='less'>
/*我的最爱*/
  .disabled {
      pointer-events: none;
      filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
      -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
      opacity: 0.5; /*其他，透明度50%*/
  }
#main-content {
  width: 90%;
  margin: 0 auto;
}
/*购物流程*/

.ShoppingCartItem_warpper{
    display: flex;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
    position: relative;
    width: 90%;
    margin: 0 auto;
    justify-content: space-between;
    .close{
        position: absolute;
        top: 1rem;
        right: 0rem;
        border-radius: 100%;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            font-size: 1.6rem;
            color: #fff;
        }
    }
}
.shoppingcart_item_image{
    width: 25%;
    img {
       width: 100%
    }
}
.shoppingcart_item_detail{
  width: 70%;
}
.shoppingcart_item_name,
.shoppingcart_item_code,
.shoppingcart_item_attr,
.shoppingcart_item_price{
    line-height: 2.5rem;
    font-size: 1.2rem;
    // width: 10rem;
  display: inline-block;
  white-space: nowrap;
  width: 88%;
  overflow: hidden;
  text-overflow:ellipsis;
  color: #fff;
  text-transform: uppercase;
  font-family: 'PoppinsBold', 'Microsoft YaHei';
}
.shoppingcart_item_price >div{
    font-size: 1.2rem;
    color:#c6b17b;
    text-transform: uppercase;
    font-family: 'PoppinsBold', 'Microsoft YaHei';
}
.shoppingcart_item_qty{
    display: flex;
    .qty_count{
        line-height: 26px;
        font-size: 1.2rem
    }
}
.shoppingcart_item_attr{
    span{
        margin-right: 1rem;
    }
}
.shoppingcart_item_price{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.shoppingcart_warrper{
    width: 100%;
    background: url(/images/mobile/ohters_16.jpg) no-repeat center center;
    background-size: cover;
    padding: 2rem 0;
    padding-top: 5rem;
    // min-height: calc(100vh - 402px);
    .shoppingcart_header{
        font-size: 2rem;
        line-height: 5rem;
        text-align: center;
        font-weight: 700;
        border-bottom: 1px solid #eee;
    }
}
.shoppingcart_total{
    text-align: center;
    padding: 1rem;
    /deep/ .el-button {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      padding: 0;
      background: #c6b17b;
      color: #fff;
      font-family: 'PoppinsBold', 'Microsoft YaHei';
      text-transform: uppercase;
      font-size: 1.4rem;
      border-radius: 0px;
    }
}
.shoppingcart_total1{
    text-align: right;
    padding: 1rem;
    .tp1 {
      font-size: 1.4rem;
      color: #fff;
    }
     .tp2 {
      font-size: 1.4rem;
      color: #c6b17b;
      font-family: 'PoppinsBold', 'Microsoft YaHei';
    }
}
.num-content{
    float: left;
}
.num-content .input-text {
    display: inline-block;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: none;
    color: #fff;
    outline: none;
    font-size: 1.4rem;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    background: transparent;
}
.common-num {
  display: inline-block;
  border: 1px solid #fff;
}
.common-num a{
    float: left;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 20px;
    color: #666666;
    background: #fff;
}
.TtitleBg {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  p {
    font-size: 1.6rem;
    color: #333333;
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
      content: '';
      width: 16rem;
      display: inline-block;
      background: url('/images/mobile/mindex_04.png') no-repeat center center;
      height: 2rem;
      background-size: 100%;
      position: absolute;
      top: 1rem;
    }
  }
}
</style>

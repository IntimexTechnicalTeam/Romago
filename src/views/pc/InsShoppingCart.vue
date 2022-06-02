<template>
  <div id="RomagoBg" v-cloak>
    <!--main-content-->
    <div id="main-content">
      <div class="favorite-box order-box">
        <div class="favorite-box-top">
          <p class="pageTitle">{{$t('Shoppingcart.ShoppingcartTitle')}}</p>
          <div class="clear"></div>
        </div>
        <div class="favorite-box-content">
          <div class="order-one shoppingcart-one">
            <div class="order-one-title shoppingcart-one-title">
              <!-- <span class="order-merchant">{{$t('Shoppingcart.Merchant')}}</span> -->
              <span class="order-product-name">{{$t('Shoppingcart.Product')}}</span>
              <span class="order-quantity">{{$t('Shoppingcart.Quantity')}}</span>
              <span class="order-price">{{$t('Shoppingcart.Price')}}</span>
              <div class="clear"></div>
            </div>
            <div class="favorite-one merchant-one" v-for="(one,index) in items" :key="index">
              <div class="w50">
                  <a class="product-img" v-bind:href="'/product/Detail/'+one.Product.Sku">
                  <img v-bind:src="one.Product.Img_M" alt />
                </a>
                <div class="favorite-one-messge">
                  <p class="product-title">{{one.Product.Name}}</p>
                  <!-- <p class="product-code">{{one.Product.Code}}</p> -->
                  <p class="product-code">
                    <span v-if="one.AttrName1">{{one.AttrTypeName1}}：{{one.AttrName1}}</span>&nbsp;
                    <span v-if="one.AttrName2">{{one.AttrTypeName2}}：{{one.AttrName2}}</span>&nbsp;
                    <span v-if="one.AttrName3">{{one.AttrTypeName3}}：{{one.AttrName3}}</span>&nbsp;
                  </p>
                  <!-- <p class="product-price">
                    <span
                      class="p-price-discount"
                    >{{Currency.Code}} {{(one.Product.SalePrice) | PriceFormat}}</span>
                  </p> -->
                </div>
              </div>
              <div class="w20">
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
                  <div class="clear"></div>
                </div>
              </div>
              <div class="w20">
                <div class="merchant-total-price">
                  <p>{{Currency.Code}} {{(one.Product.SalePrice) | PriceFormat}}</p>
                  <!-- <p>{{Currency.Code}} {{(one.Product.SalePrice * one.Qty) | PriceFormat}}</p> -->
                </div>
              </div>
              <div class="w10">
                <b class="cart-delete " v-on:click="removeItem(index)"><i class="el-icon-close"></i></b>
              </div>
            </div>
          </div>
        </div>
        <div class="shoppingcart-handle">
          <p>
            <span>{{$t('Shoppingcart.Total')}}:</span>
            <span class="total-price">{{Currency.Code}} {{(totalAmount) | PriceFormat}}</span>
          </p>
          <a href="javascript:;" class="btn" @click="submit">{{$t('Shoppingcart.CheckoutList')}}</a>
        </div>
      </div>
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
    console.log(event, 'eventevent');
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
    // this.UpdateQueQue.push(new Update(id, one.Qty));
    // _this.loadItems();
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
<style scoped lang='less'>
.TtitleBg {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
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
        width: 14rem;
        display: inline-block;
        background: url('/images/mobile/mindex_04.png') no-repeat center center;
        height: 2rem;
        background-size: 100%;
        position: absolute;
        top: 1.5rem;
      }
    }
  }
/*我的最爱*/
  .disabled {
      pointer-events: none;
      filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
      -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
      opacity: 0.5; /*其他，透明度50%*/
  }
#main-content {
  width: 1200px;
  margin: 0 auto;
  padding-top: 130px;
}
/*购物流程*/
.favorite-box{
  padding-top: 60px;
  padding-bottom: 60px;
}
.favorite-box-content {
  margin-top: 20px;
}
.num-content .input-text {
  display: inline-block;
  width: 38px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: none;
  color: #fff;
  outline: none;
  background: transparent;
}
.favorite-one-messge .product-title {
  color: #fff;
  font-size: 18px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: 'PoppinsBold', 'Microsoft YaHei';
}
.favorite-one-messge .product-code {
  color: #b2b2b2;
  font-size: 14px;
  margin: 15px 0;
}
.favorite-one-messge .product-code {
  color: #b2b2b2;
  font-size: 14px;
  margin: 15px 0;
}
.order-one .product-price {
  margin-top: 14px;
}
.order-one .product-price .p-price-discount {
  color: #d92526;
  font-size: 16px;
}
.shoppingcart-one-title span {
  font-size: 16px;
}
.order-one-title span {
  color: #1b1b1b;
  font-size: 14px;
  float: left;
  line-height: 35px;
}
.num-content {
  float: left;
  height: 30px;
}
.shoppingcart-one {
  margin-bottom: 60px;
}

.shoppingcart-one-title span {
  font-size: 16px;
}
.shoppingcart-one-title {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
  span {
    color: #999;
    font-size: 18px;
  }
  .order-product-name {
    width: 50%;
  }
  .order-quantity {
    width: 20%;
  }
  .order-price {
    width: 20%;
  }
}
.merchant-del-box {
  float: right;
}

.shoppingcart-handle {
  text-align: right;
}

.shoppingcart-handle span {
  display: inline-block;
  font-size: 24px;
  color: #999999;
  line-height: 25px;
  margin-right: 5px;
}

.shoppingcart-handle .total-price {
  font-size: 24px;
  color: #c6b17b;
  font-family: 'PoppinsBold', 'Microsoft YaHei';
}

.shoppingcart-handle .btn {
    display: inline-block;
    width: 250px;
    height: 45px;
    line-height: 45px;
    color: #fff;
    font-size: 26px;
    text-align: center;
    margin-top: 50px;
    background-color: #c6b17b;
    transition: all .3s;
    font-family: 'PoppinsBold', 'Microsoft YaHei';
    &:hover {
      background: #333;
    }
}
.common-num a {
  float: left;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 24px;
  color: #333333;
  background: #fff;
  font-family: 'PoppinsBold', 'Microsoft YaHei';
}
.cart-delete {
  width: 20px;
  height: 20px;
  text-align: center;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  i {
    border-radius: 100%;
    padding: 5px;
    font-size: 24px;
    &:hover {
      background: #c6b17b;
    }
  }
}
.favorite-box .login-register-title {
  margin-left: 0;
}
.login-register-title {
  float: left;
  width: 300px;
  height: 45px;
  line-height: 45px;
  margin-left: 160px;
  text-align: center;
  color: #fff;
  font-size: 26px;
  background-color: @primary_color;
  clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
  -webkit-clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
  -moz-clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
  -ms-clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
}
.merchant-one {
  border-top: 0;
  border-bottom: 1px solid #e6e6e6;
}
.favorite-one {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .product-img {
    width: 20%;
    img {
      width: 100%;
    }
  }
  .common-num {
    display: inline-block;
    border: 1px solid #e0e0e0;
  }
  .favorite-one-messge{
    width: 75%;
    margin-left: 5%;
  }
  .merchant-total-price {
    p{
      color: #c6b17b;
      font-size: 20px;
      font-family: 'PoppinsBold', 'Microsoft YaHei';
    }
  }
  .w50 {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .w20 {
    width: 20%;
  }
}
</style>

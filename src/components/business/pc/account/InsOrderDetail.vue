<template>
  <div id="memberConterContainer"  style="padding-bottom:50px;">
    <accountHeader/>
    <div class="maincontent">
    <p class="pageTitle">{{$t('Order.OrderDetail')}}</p>
    <transition name="slide">
      <div key="1" v-if="!waiting">
          <div class="OrderMain">
            <!-- 订单详情列表开始 -->
            <div>
              <el-row class="OrderHeadTitle">
                <el-col :span="24">{{$t('Order.OrderDateTime')}}:{{OrderDetail.CreateAt}}</el-col>
              </el-row>
              <el-row class="OrderHeadTitle">
                <el-col :xs="4" :md="4">{{OrderDetail.OrderItems.length}}{{$t('Order.Items')}}</el-col>
                <el-col :xs="20" :md="20">{{$t('Order.OrderNumber')}}:{{OrderDetail.InvoiceNO}}</el-col>
              </el-row>
              <div>
                <div>
                  <el-card shadow="hover" class="OrderCard" body-style="padding:10px;">
                    <el-row
                      :gutter="15"
                      class="OrderPer"
                      v-for="(item,index) in OrderDetail.OrderItems"
                      :key="index"
                    >
                      <el-col :xs="3" :md="3">
                        <router-link class="product-img" :to="'/product/detail/'+item.Sku">
                          <img v-bind:src="item.Product.Images[2]" alt />
                        </router-link>
                      </el-col>
                      <el-col :xs="21" :md="21" class="OrderListDetail">
                        <p class="product-title">{{item.Product.Name}}</p>
                           <p class="product-code">{{$t('product.ProductCode')}}:{{item.Product.Code}}&nbsp;&nbsp;{{$t('product.countTitle')}}:{{item.Qty}}</p>
                        <p class="product-code">
                            <span v-if="item.AttrName1">{{item.AttrType1.Name}} : {{item.AttrName1}}</span>
                            <span v-if="item.AttrName2">{{item.AttrType2.Name}} : {{item.AttrName2}}</span>
                            <span v-if="item.AttrName3">{{item.AttrType3.Name}} : {{item.AttrName3}}</span>
                        </p>
                        <p class="product-price">
                          <span class="p-price-discount">{{CurrencyCode}} {{(item.Product.SalePrice + item.Attr1Price  + item.Attr2Price + item.Attr3Price)*item.Qty | PriceFormat}}</span>
                        </p>
                      </el-col>
                    </el-row>
                  </el-card>
                </div>
              </div>
              <!-- 统计价钱开始 -->
              <el-row :gutter="20">
                <el-col :xs="20" :md="20" class="OrderBottomP1">{{$t('Order.CartSubtotal')}}</el-col>
                <el-col :xs="4" :md="4" class="OrderBottomP2">{{CurrencyCode}} {{(OrderDetail.ItemsAmount) | PriceFormat}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :xs="20" :md="20" class="OrderBottomP1">{{$t('Order.DeliveryCharge')}}</el-col>
                <el-col :xs="4" :md="4" class="OrderBottomP2">{{CurrencyCode}} {{(OrderDetail.DeliveryCharge) | PriceFormat}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :xs="20" :md="20" class="OrderBottomP1">{{$t('Shoppingcart.Total')}}</el-col>
                <el-col :xs="4" :md="4" class="OrderBottomP2">{{CurrencyCode}} {{(OrderDetail.TotalAmount) | PriceFormat}}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :xs="20" :md="20" class="OrderBottomP1">{{$t('Order.OrderStatus')}}</el-col>
                <el-col :xs="4" :md="4" class="OrderBottomP2">{{OrderDetail.StatusName}}</el-col>
              </el-row>
              <!-- 统计价钱结束 -->
            </div>
            <!-- 订单详情列表结束 -->

            <!-- 支付按钮和关闭开始 -->
            <el-row :gutter="20" class="OrderBtnGroup">
              <el-col :xs="16" :md="16" :offset="8" class="OrderBottomBtn"  >
                <el-button type="success" round @click="PayNow(OrderDetail)" v-show="OrderDetail.StatusCode=='0' && !OrderDetail.OffLinePay">
                  <i class="el-icon-bank-card"></i>
                  <span>{{$t('Order.OrderPay')}}</span>
                </el-button>
                <el-button type="info" round @click="closePage">
                  <i class="el-icon-switch-button"></i>
                  <span>{{$t('DeliveryAddress.CloseBtn')}}</span>
                </el-button>
              </el-col>
            </el-row>
            <!-- 支付按钮和关闭结束 -->
          </div>
    </div>
    </transition>
    <transition name="slide">
      <div class="faker" key="2" v-if="waiting" v-loading="true">
      </div>
    </transition>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue')
  }
})
export default class InsOrderDetail extends Vue {
  newarry: any[] = [];
  OrderId: any = '';
  OrderDetail: any[] = [];
  CurrencyCode:string='HKD';
  private waiting: boolean = true;
  // 获取订单传值和显示数据
  getOrderDetail () {
    let that = this;
    let OrderId = that.$route.params.id;
    that.$Api.order.getOrderDetail(OrderId).then(result => {
      that.OrderDetail = result;
      that.CurrencyCode = result.Currency.Code;
      that.waiting = false;
    });
  }
  // 支付打开页面
  PayNow (order) {
    window.location.href = '/PG/pay/' + order.PaymentMethod + '/IS/' + order.OrderId;
  }

  // 立即关闭按钮
  closePage () {
    this.$router.push({ path: '/order/List' });
  }

  // 页面创建成功时加载数据
  created () {
    this.getOrderDetail();
  }
}
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  display: inline-block;
}
.OrderMain .el-button--success {
  color: #fff;
  background-color: @base_color;
  border-color: @base_color;
}
.OrderBtnGroup {
  margin-top: 30px;
  text-align: right;
}
.OrderHeadTitle {
  line-height: 50px;
}
.OrderHeadTitle div {
  text-align: left;
  font-size: 16px;
  color: #666;
}
.OrderMain {
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  background: #FFF;
  padding: 20px;
}
.OrderBottomBtn button {
  width: 30%;
}
.OrderBottomBtn span {
  font-size: 18px;
}
.OrderBottomBtn i {
  font-size: 18px;
}
.OrderQty {
  font-size: 16px;
  color: #666;
}
.OrderBottomP1 {
  text-align: right;
  font-size: 20px;
  line-height: 50px;
}
.OrderBottomP2 {
  text-align: left;
  font-size: 20px;
  line-height: 50px;
  color: #d92526;
}
.product-img {
  width: 100%;
  display: block;
}
.product-img img {
  width: 100%;
  border-radius: 10px;
}
.OrderCard {
  margin-bottom: 20px;
}
.OrderCard p{
  line-height: 35px;
}
.OrderPer {
    margin-bottom: 0px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    padding-top: 5px;
    padding-bottom: 5px;
}
.OrderPer:last-child{
  border-bottom:0px!important;
}
.OrderListDetail {
  text-align: left;
}
.product-title {
  color: #333;
  font-size: 18px;
}
.product-code {
  color: #b2b2b2;
  font-size: 14px;
}
.product-code span {
  padding-right: 8px;
  font-size: 14px;
}
.p-price-discount {
  font-size: 18px;
  color: #d92526;
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
</style>

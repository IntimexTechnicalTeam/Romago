<template>
  <div id="memberConterContainer" class="myfav">
    <!--main-content-->
    <accountHeader/>
    <p class="pageTitle">{{$t('MyFavorite.MyFavorite')}}</p>
    <transition name="slide">
    <div key="1" v-if="!waiting">
        <div id="main-content">
          <div class="favorite-box">
            <div class="favorite-box-content">
              <el-row
                :gutter="0"
                v-for="(d,index) in favoriteList.slice((currentPage- 1)*pagesize,currentPage*pagesize)"
                :key="index"
                class="Favormain"
              >
                <!-- 列表循环开始 -->
                <el-card shadow="hover" class="FavorCard">
                  <el-row :gutter="10" class="OrderPer">
                  <el-col :xs="8" :md="8">
                    <router-link class="product-img" :to="'/product/detail/'+d.Sku">
                      <img v-bind:src="d.Img_M" alt />
                  </router-link>
                  </el-col>
                  <el-col :xs="16" :md="16" class="OrderListDetail">
                    <p class="product-title">{{d.Name}}</p>
                    <p class="product-code">{{d.Code}}</p>
                    <p class="product-price">
                      <span class="p-price-discount">{{d.Currency.Code}} {{(d.SalePrice) | PriceFormat}}</span>
                    </p>
                  </el-col>
                  </el-row>
                  <el-row :gutter="20" class="bottom_btn">
                  <el-col :xs="12" :md="12">
                    <el-button
                      round
                      icon="el-icon-document"
                      class="OrderBtnDelete"
                      @click="ShowDetail(d.Sku)"
                    >{{$t('MyFavorite.LearnMore')}}</el-button>
                    </el-col>
                    <el-col :xs="12" :md="12">
                    <el-button
                      type="info"
                      round
                      icon="el-icon-delete"
                      class="OrderBtn"
                      @click="removeFavorite(d.Sku)"
                    >{{$t('MyFavorite.RemoveProduct')}}</el-button>
                  </el-col>
                  </el-row>
                </el-card>
              </el-row>
              <!-- 列表循环结束 -->
              <!-- 分页开始 -->
              <el-pagination
                layout="prev, pager, next"
                :page-size="pagesize"
                @current-change="currentChange"
                @size-change="handleSizeChange"
                :current-page="currentPage"
                :total="FavoriteLength"
                :pager-count="5"
                v-if="FavoriteLength>1"
                background
              ></el-pagination>
              <!-- 分页结束 -->
            </div>
          </div>
        </div>
    </div>
    </transition>
    <transition name="slide">
      <div class="faker" key="2" v-if="waiting" v-loading="true">
      </div>
    </transition>
    <!--main-content-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue')
  }
})
export default class InsMyFavorite extends Vue {
  currentPage: number = 1;
  pagesize: number = 12;
  FavoriteLength: any = '';
  favoriteList:any[]=[];
  private waiting: boolean = true;
  ShowDetail (Sku) {
    // 新窗口打开路由
    let routeData = this.$router.push({
      path: '/product/detail',
      name: 'ProductsDetail',
      params: { id: Sku }
    });
  }
  currentChange (currentPage) {
    // 改变当前页
    this.currentPage = currentPage;
  }
  // 点击上一页和下一页的时事件
  handleSizeChange (psize) {
    this.pagesize = psize;
  }

  getAllFavorite () {
    this.$Api.member.getFavorite().then((result) => {
      this.favoriteList = result;
      this.FavoriteLength = result.length;
      this.waiting = false;
    });
  }

  removeFavorite (sku) {
    let _this = this;
    let skustring = sku;
    this.$Api.member.removeFavorite(skustring).then(result => {
      if (result.Succeeded) {
        _this.$message({
          message: this.$t('MyFavorite.RemoveSuccess') as string,
          type: 'success'
        });
        _this.getAllFavorite();
      } else {
        _this.$message({
          message: result.Message,
          type: 'error'
        });
      }
    });
  }
  created () {
    this.getAllFavorite();
  }
}
</script>
<style>
.messageBoxMobile{
      z-index: 100000!important;
}
.favorite-box .el-card__body{
  padding: 0px!important;
}
</style>
<style scoped lang="less">
/*我的最爱*/
.myfav {
  padding-bottom: 2rem;
}
#main-content {
  width: 90%;
  margin: 0 auto;
  position: relative;
}
.favorite-box-top{
  width: 100%;
  display: inline-block;
}
.login-register-title {
  float: left;
  width: 100%;
  height: 45px;
  line-height: 45px;
  margin-left: 160px;
  text-align: center;
  color: #fff;
  font-size: 26px;
  background-color: @primary_color;
}
.favorite-box .login-register-title {
  margin-left: 0;
}

.favorite-box {
  font-family: "Arial", "微软雅黑";
}

.favorite-box-content {
  text-align: left;
  /*border-top:1px solid #88bd43;*/
}
.Favormain {
  margin-bottom: 20px;
  cursor: pointer;
  transition: 1s ease;
  -webkit-transition: 1s ease;
  -moz-transition: 1s ease;
  -ms-transition: 1s ease;
  width: 100%;
}
.FavorCard {
    margin: 0px;
    padding: 1rem;
}
.product-img {
  width: 100%;
  display: block;
}
.product-img img {
  width: 100%;
}
.product-title {
  color: #333;
  font-size: 18px;
}
.product-code {
  color: #b2b2b2;
  font-size: 14px;
  margin: 15px 0;
}
.p-price-discount {
  font-size: 18px;
  color: #d92526;
}
.Favormain .OrderBtn {
  width: 100%;
  margin-bottom: 0px!important;
}
.Favormain .OrderBtnDelete {
    background-color: @base_color!important;
    border-color: @base_color!important;
    color: #fff;
}
.el-button + .el-button {
  margin-left: 0px;
}
.Favormain .el-card__body{
  padding: 10px;
}
.Favormain .bottom_btn{
  margin-top: 20px;
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
</style>

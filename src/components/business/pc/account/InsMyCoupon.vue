<template>
  <div id="memberConterContainer" class="couponContainer"  style="padding-bottom:50px;">
    <accountHeader/>
    <!--main-content-->
    <div class="maincontent">
    <p class="pageTitle">{{$t('MyCoupon.MyCoupon')}}</p>
    <div id="main-content">
      <!-- 头部筛选框 -->
      <el-card shadow="hover" class="couponHeader">
        <el-form ref="form" :model="form">
          <el-row>
            <el-col :md="8" :xs="8" class="couponStatus">
              <el-form-item :label="$t('MyCoupon.CouponStatus')">
                <el-select
                  :placeholder="$t('MyCoupon.SelectCouponStatus')"
                  filterable
                  v-model="status"
                >
                  <el-option :label="$t('MyCoupon.NotUse')" :value="2"></el-option>
                  <el-option :label="$t('MyCoupon.All')" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16" class="couponTips">
              {{$t('MyCoupon.TotalNum')}}
              <span>{{AllRecord}}</span>
              {{$t('MyCoupon.Piece')}}&nbsp;{{$t('MyCoupon.Coupon')}}，&nbsp;{{$t('MyCoupon.Among')}}
              <span>{{ActiveRecord}}</span>
              {{$t('MyCoupon.Piece')}}&nbsp;{{$t('MyCoupon.NotUse')}}，
              <span>{{AllRecord - ActiveRecord}}</span>
              {{$t('MyCoupon.Piece')}}&nbsp;{{$t('MyCoupon.Used')}}
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <!-- 优惠券列表 -->
      <el-card
        shadow="hover"
        v-for="(item,index) in NewArarry"
        :key="index"
        class="couponMain"
      >
        <el-row class="couponList" v-if="couponsLength">
          <el-col :md="6" :xs="6">
            <p class="couponTitle">{{item.Title}}</p>
            <p class="couponRemark">{{item.Remark}}</p>
          </el-col>
          <el-col :span="18">
            {{$t('MyCoupon.PeriodOfValidity')}}: {{item.EffectiveDate}} - {{item.ExpiryDate}}
            <span
              class="coupon-status"
              :style="{background:(item.IsUsed == false && item.IsExpiry==false?'#000':'#ccc')}"
            >{{item.IsUsed == false && item.IsExpiry==false ?$t('MyCoupon.NotUse') : $t('MyCoupon.Used')}}</span>
          </el-col>
        </el-row>
        <el-row class="couponList" v-else>
          <el-col :span="24">
            <p class="couponTitle">{{$t('MyCoupon.NoCoupon')}}</p>
          </el-col>
        </el-row>
      </el-card>
      <inPage v-model="CurrentPage" :total="TotalRecord" :pageNum="pageNumber" styla="margin:0;" v-show="TotalRecord>0"></inPage>
    </div>
    <!--main-content-->
  </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue'),
    inPage: () => import('@/components/base/pc/InsPage.vue')
  }
})
export default class InsMyCoupon extends Vue {
  private CurrentPage: number = 1;
  private pageNumber: number = 12;
  TotalRecord: number = 0;// 总条目数
  SearchInput: any = '';
  value: any = '';
  NewArarry: any[] = [];
  coupons:any[]=[];
  groundColor:string='';
  private status: number = 3;
  private TotalPage: number = 0;
  private AllRecord: number = 0;
  private ActiveRecord: number = 0;
  // 页面加载完成后，把数组的值付给新的数组
  created () {
    var that = this;
    this.$Api.member.getActiveCoupon({ Page: this.CurrentPage, PageSize: this.pageNumber }).then(result => {
      this.ActiveRecord = result.ReturnValue.TotalRecord;
    });
    this.getAllCoupon().then(() => {
      this.$HiddenLayer();
    });
  }

  // 计算数组的长度，用于分页和显示总数
  get couponsLength () {
    return this.NewArarry.length;
  }
  getAllCoupon () {
    let that = this;
    return this.$Api.member.getAllCoupon({ status: this.status, Page: this.CurrentPage, PageSize: this.pageNumber }).then((result) => {
      if (result) {
        this.NewArarry = result.ReturnValue.Data;
        this.TotalRecord = result.ReturnValue.TotalRecord;
        this.TotalPage = result.ReturnValue.TotalPage;
        this.AllRecord = result.ReturnValue.TotalRecord;
      } else {
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  form: any = {
    region: ''
  };
  @Watch('status')
  onStatusChange () {
    this.$ShowLayer();
    this.CurrentPage = 1;
    if (this.status === 2) {
      this.$Api.member.getActiveCoupon({ Page: this.CurrentPage, PageSize: this.pageNumber }).then(result => {
        this.NewArarry = result.ReturnValue.Data;
        this.TotalRecord = result.ReturnValue.TotalRecord;
        this.TotalPage = result.ReturnValue.TotalPage;
        this.$HiddenLayer();
      });
    } else if (this.status === 3) { this.getAllCoupon().then(() => { this.$HiddenLayer(); }); }
  }
@Watch('CurrentPage')
  onPageChange (o, n) {
    this.getAllCoupon();
  }
}
</script>
<style  scoped lang="less">
/*我的最爱*/
.couponHeader {
  margin-bottom: 20px;
}
.couponHeader .el-card__body {
  padding: 10px;
  padding-bottom: 0px !important;
}
.couponList {
  padding-top: 25px;
  padding-left: 50px;
}
.couponTitle {
  font-size: 25px;
  font-weight: 700;
  text-align: left;
  margin-bottom: 15px;
  word-break: break-all;
}
.couponRemark {
  text-align: left;
}
.couponMain {
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  min-height: 150px;
}
.coupon-status {
    color: #fff;
    height: 72px;
    width: 136px;
    position: absolute;
    right: -70px;
    top: -40px;
    text-align: center;
    line-height: 110px;
    font-family: "\9ED1\4F53";
    background-color: #4c8eff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.couponTips {
  text-align: right;
  line-height: 40px;
  margin-top: 10px;
}
.couponTips span {
  color: red;
}
.couponStatus {
  margin-top: 10px;
}
.couponContainer
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #8dc11f;
}
</style>

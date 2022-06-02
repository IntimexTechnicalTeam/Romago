<template>
  <div class="accountHeader">
    <div class="memberBg">
      <div class="innerBox">
        <p class="pageTitle">{{ $t("Account.MemberCenter") }}</p>
        <div class="leftside">
          <p class="MemberName">{{ MemberName }}</p>
          <div class="leftnav">
            <router-link to="/account/memberInfo" class="iconBg">
              <div class="innerStyle">
                <span>{{ $t("Account.MemberInformation") }}</span>
                <i class="icon el-icon-arrow-right"></i>
              </div>
            </router-link>
            <router-link to="/order/List" class="iconBg">
              <div class="innerStyle">
                <span>{{ $t("Account.MyOrder") }}</span>
                <i class="icon el-icon-arrow-right"></i>
              </div>
            </router-link>
            <router-link to="/account/notification" class="iconBg">
              <div class="innerStyle">
                <span>{{ $t("Account.MyMessages") }}</span>
                <i class="icon el-icon-arrow-right"></i>
              </div>
            </router-link>
            <router-link to="/account/myFavorite" class="iconBg">
              <div class="innerStyle">
                <span>{{ $t("Account.MyFavorite") }}</span>
                <i class="icon el-icon-arrow-right"></i>
              </div>
            </router-link>
            <router-link to="/account/myCoupon" class="iconBg">
              <div class="innerStyle">
                <span>{{ $t("MyCoupon.MyCoupon") }}</span>
                <i class="icon el-icon-arrow-right"></i>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
@Component
export default class accountHeader extends Vue {
  private MemberName: string = '';
  private TotalPoints: string = '';

  // 获取会员信息
  getMemberInfo() {
    let _this = this;
    sdk.api.member.getProfile().then(function (data) {
      console.log(data, 'datadata');
      _this.MemberName = data.FirstName + '  ' + data.LastName;
    });
  }
  get currentlang() {
    return this.$i18n.locale;
  }
  mounted() {
    this.getMemberInfo();
  }
}
</script>

<style scoped lang="less">
.accountHeader {
  width: 100%;
  display: flex;
  .memberBg {
    background: url("/images/pc/pcindex_07.jpg") no-repeat center center;
    background-size: 100% 100%;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    padding-top: 130px;
    padding-bottom: 50px;
    .innerBox {
      width: 1200px;
      margin: 0 auto;
      .memberCenterTitle {
        font-weight: 700;
        font-size: 40px;
        text-align: center;
        padding-top: 30px;
        color: #fff;
        text-transform: uppercase;
      }
      .leftnav {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .leftside {
        width: 100%;
        padding-top: 30px;
        p {
          font-size: 24px;
          color: #fff;
          margin-bottom: 30px;
        }
        a {
          display: inline-block;
          width: 18%;
          &:last-child {
            margin-right: 0px !important;
          }
          img {
            width: 100%;
          }
        }
      }

      .iconBg {
        background-size: contain;
        float: left;
        text-align: center;
        .innerStyle {
          display: block;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          border: 1px solid #fff;
        }
        &:hover {
          transform: translateY(-3px);
        }
        span {
          display: inline-block;
          color: #b2b2b2;
          font-size: 16px;
          font-weight: 500;
          padding: 10px;
          font-family: 'PoppinsBold', 'Microsoft YaHei';
        }
        i{
          color: #b2b2b2;
        }
        strong {
          display: inline-block;
          color: #b2b2b2;
          font-size: 24px;
          font-weight: 600;
        }
        b {
          width: 100%;
          display: inline-block;
          color: #b2b2b2;
          font-size: 14px;
          font-weight: 600;
        }
      }

      .router-link-active {
        .innerStyle {
          background: #c6b17b;
          display: block;
          width: 100%;
          height: 100%;
          display: flex;
          border: 1px solid #c6b17b!important;
        }
        span {
          font-weight: 600 !important;
          color: #fff;
        }
        i{
          color: #fff;
        }
      }
    }
  }
}
</style>

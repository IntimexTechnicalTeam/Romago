<template>
 <div class="accountHeader">
   <div class="accountBg">
      <p class="memberCenterTitle"><span class="Title">{{$t('Account.MemberCenter')}}</span><span class="accountUser">{{MemberName}}</span></p>
      <div class="accountMeun">
          <p><router-link to="/account/memberInfo">{{$t('Account.MemberInformation')}}<i class="icon el-icon-arrow-right"></i></router-link></p>
          <p><router-link to="/order/List">{{$t('Account.MyOrder')}}<i class="icon el-icon-arrow-right"></i></router-link></p>
          <p><router-link to="/account/notification">{{$t('Account.MyMessages')}}<i class="icon el-icon-arrow-right"></i></router-link></p>
          <p><router-link to="/account/myFavorite">{{$t('Account.MyFavorite')}}<i class="icon el-icon-arrow-right"></i></router-link></p>
          <p><router-link to="/account/myCoupon">{{$t('MyCoupon.MyCoupon')}}<i class="icon el-icon-arrow-right"></i></router-link></p>
      </div>
   </div>
 </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
@Component
export default class accountHeader extends Vue {
   MemberName:string='';
   // 获取会员信息
   getMemberInfo () {
     let _this = this;
     sdk.api.member.getProfile().then(
       function (data) {
         console.log(data, 'datadata');
         _this.MemberName = data.FirstName + '  ' + data.LastName;
       }
     );
   }
   get currentlang () {
     return this.$Storage.get('locale');
   }
   mounted () {
     this.getMemberInfo();
   }
}
</script>

<style scoped lang="less">
/*頁面中間目錄*/
ul,li{
    list-style: none;
}
.clear{
    clear: both;
}
.Emeun {
  p{
    img{
      width: 100%;
    }
  }
}
.accountHeader{
  width: 100%;
  display:inline-block;
  .memberCenterTitle{
    text-align: center;
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
    margin-top: 4rem;
    margin-bottom: 2rem;
    .Title {
      text-align: left;
      font-size: 1.5rem;
      color:#fff;
      font-weight: 700;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      margin-right: 2%;
      &::before {
        height: 1.5rem;
        background: #c6b17a;
        width: 4px;
        content: '';
        display: inline-block;
        margin-right: .5rem;
      }
    }
    .accountUser{
      font-size: 1.4rem;
      text-align: right;
      color:#ffffff;
    }
  }
  .accountBg{
    width:100%;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    padding-top: 2rem;
    .accountMeun{
      width: 90%;
      margin: 0 auto;
      p{
        display: block;
        height: 3rem;
        margin-bottom: 2rem;
        .router-link-active {
            color: #fff!important;
           border:1px solid #c6b17c!important;
           background: #c6b17c!important;
        }
        a{
          background: transparent;
          display: flex;
          width: calc(100% - 2.2rem);
          align-items: center;
          justify-content: space-between;
          color:#fff;
          font-size: 1.4rem;
          height: 100%;
          border:1px solid #fff;
          padding-left: 1rem;
          padding-right: 1rem;
          i {
            font-size: 1.4rem;
          }
        }
      }
    }
    .accountTop{
      width: 70%;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
  }
}

</style>

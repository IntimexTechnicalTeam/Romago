<template>
  <div class="MemberPc">
    <accountHeader />
    <div class="MemberInfoNavPC">
      <ul>
        <div @click="openlink('/account/memberInfo')">
        <li :class="activeClass == 1?'activeInfo':''" >
          <a>{{ $t("MemberInfo.MemberInfoTitle") }}</a>
        </li>
        </div>
        <div @click="openlink('/account/modifyPassword')">
        <li :class="activeClass == 2?'activeInfo':''" >
          <a>{{ $t("MemberInfo.ModifyPassword") }}</a>
        </li>
        </div>
        <div @click="openlink('/account/deliveryAddress')">
        <li :class="activeClass == 3?'activeInfo':''" >
          <a>{{ $t("Account.DeliveryAddress") }}</a>
        </li>
        </div>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    accountHeader: () =>
      import('@/components/hkTasteBusiness/pc/account/accountHeader.vue')
  }
})
export default class InsMenberCenter extends Vue {
    activeClass: any = 0;
    openlink(link) {
    this.$router.push({ path: link });
  }
  isActive() {
    var url = this.$route.path;
    var reg = RegExp(/memberInfo/);
    if (reg.test(url)) {
      this.activeClass = 1;
    } else if (url.indexOf('modifyPassword') !== -1) {
      this.activeClass = 2;
    } else if (url.indexOf('deliveryAddress') !== -1) {
      this.activeClass = 3;
    }
    console.log(this.activeClass);
  }
  updated() {
    this.isActive();
  }
  mounted() {
    this.isActive();
  }
}
</script>
<style lang="less">
#container .el-form-item__content {
  text-align: left !important;
}
.MemberPc {
  width: 100%;
  display: inline-block;
  background:url('/images/pc/Personal-Center.jpg') no-repeat center center;
  background-size: cover;
}
.MemberPc .MemberInfoNavPC {
  width: 720px;
  margin: 0 auto;
  margin-top: 20px;
  ul {
    width: calc(100% - 2px);
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #fff;
    overflow: hidden;
    >div {
    flex: 1;
    border-right: 1px solid #fff;
    &:last-child{
      border-right: 0px!important;
      width: 33.4%!important;
    }
    }
  }
}
.MemberPc .MemberInfoNavPC li {
  float: left;
  list-style: none;
  cursor: pointer;
  width: 100%;
}
.MemberPc .MemberInfoNavPC li a {
  text-align: center;
  text-decoration: none;
  display: block;
  line-height: 3rem;
  color: #fff;
  font-size: 18px;
}
.MemberPc .activeInfo a {
  color: #333333 !important;
  background: #ffffff !important;
  font-family: 'PoppinsBold', 'Microsoft YaHei';
}
</style>

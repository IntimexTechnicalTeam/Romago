<template>
  <div class="langSwitch">
      <p class="back" @click="backMeun()"><i class="el-icon-arrow-left"></i></p>
      <p @click="changeLang('E')" :class="{'active': $Storage.get('locale') === 'E'}">International | EN</p>
      <p @click="changeLang('S')" :class="{'active': $Storage.get('locale') === 'S'}">中国 | SC</p>
      <p @click="changeLang('C')" :class="{'active': $Storage.get('locale') === 'C'}">香港 | TC</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component
export default class InsLangSwitch extends Vue {
  get currentlang () {
    return this.$i18n.locale;
  }
  set currentlang (val) {
    this.changeLang(val);
  }
  backMeun () {
    this.$store.dispatch('isShowLangSwitch', false);
    this.$store.dispatch('isShowMenu', true);
  }
  changeLang (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      localStorage.setItem('locale', lang);
      this.Reload();
    }).catch((error) => {
      console.log(error);
    });
 }
}
</script>
<style scoped lang="less">
.langSwitch {
  width: 90%;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  p {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    font-size: 20px;
    margin-bottom: 2rem;
    cursor: pointer;
    transition: all .3s;
      &:hover {
        color: #c6b17b!important;
      }
  }
  .back {
    i {
      font-size: 1.6rem;
    }
  }
  .code {
    padding-left: 2rem;
  }
  .active {
    color: #c6b17b!important;
  }
}
</style>

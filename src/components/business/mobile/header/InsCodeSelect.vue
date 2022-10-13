<template>
  <div class="main-code">
        <p class="back" @click="backMeun()"><i class="el-icon-arrow-left"></i></p>
        <p @click="changeCurrency('2')" :class="{'active': currency === 2}"  class="code">美元 | USD</p>
        <p @click="changeCurrency('1')" :class="{'active': currency === 1}" class="code">港元 | HKD</p>
        <p @click="changeCurrency('3')" :class="{'active': currency === 3}" class="code">人民幣 | RMB</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsCodeSelect extends Vue {
  private codeId: number = 1;
  changeCurrency (val) {
    this.$Api.member.setCurrency(val).then((result) => {
      this.$message({
        message: this.$t('changeCurSuccess') as string,
        type: 'success'
      });
      this.$Storage.set('currency', result.Currency.Id);
      this.Reload();
    }).catch((error) => {
      console.log(error);
    });
  }
  get currency () {
     return this.$Storage.get('currency');
  }
  created() {
    this.codeId = this.$Storage.get('currency');
  }
  backMeun () {
    this.$store.dispatch('isShowCodeSelect', false);
  }
  mounted () {

  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style scoped lang="less">
.main-code {
  width: 90%;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  p {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    font-size: 1.4rem;
    margin-bottom: 2rem;
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

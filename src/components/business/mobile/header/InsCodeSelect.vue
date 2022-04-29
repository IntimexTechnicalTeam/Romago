<template>
  <div class="main-code">
    <select id="code-select" v-model="codeId" @change="changeCurrency(codeId)">
      <option value="1">HKD</option>
      <option value="2">USD</option>
      <option value="3">RMB</option>
    </select>
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

  created() {
    this.codeId = this.$Storage.get('currency');
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
  display: inline-block;

  select {
      width: 100%;
      background: transparent url('/images/mobile/arrow-down-back.png')  80% 50% no-repeat;
      background-size: 1rem;
      border:none;
      box-sizing: border-box;
      text-align: center;
      color:#666666;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      padding-left: .8rem;
      font-size: 1.4rem;
      outline: none;
      option{
        color:#666666;
        outline: none;
      }
  }
}
</style>

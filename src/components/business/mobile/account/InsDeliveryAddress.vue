<template>
  <div class="DeliveryAddress"  v-cloak>
    <!--main-content-->
    <div class="mid-box">
      <div class=" order-box">
        <div class="delivery-address member-delivery-address">
          <div class="select-delivery-address">
            <div class="select-delivery-box">
             <el-row
             v-for="(one,index) in addressList"
             :key="index"
             class="select-delivery-one"
             >
                  <!-- 列表循环开始 -->
                    <el-card shadow="hover" class="OrderCard">
                      <el-row :gutter="10" >
                        <el-col :xs="24" :md="24" class="left-part">
                          <p>
                              <span>{{$t('Register.UserFirstName')}}:</span>
                              <span>{{one.FirstName}}&nbsp;{{one.LastName}}</span>
                            </p>
                          <p>
                              <span>{{$t('DeliveryAddress.Mobile')}} :</span>
                              <span>{{one.Mobile}}</span>
                            </p>
                            <p>
                              <span>{{$t('DeliveryAddress.Address')}} :</span>
                              <span>{{one.Address}}</span>
                            </p>
                        </el-col>
                      </el-row>
                      <el-row :gutter="10" class="deliver_btn">
                      <el-col :xs="12" :md="12" class="right-part">
                        <el-button
                          type="warning"
                          round
                          icon="el-icon-document"
                          class="OrderBtn"
                           v-on:click="editAddr(index,'#addressPos')"
                        >{{$t('DeliveryAddress.EditBtn')}}</el-button>
                       </el-col>
                        <el-col :xs="12" :md="12" class="right-part">
                        <el-button
                          type="info"
                          round
                          icon="el-icon-delete"
                          class="delete-btn"
                          v-on:click="removeAddr(one.DeliveryId)"
                        >{{$t('DeliveryAddress.DeleteBtn')}}</el-button>
                      </el-col>
                      </el-row>
                    </el-card>
             </el-row>

            </div>
          </div>
          <div class="new-address">
            <a name="addressPos" id="addressPos"></a>
            <p class="common-title">{{$t('DeliveryAddress.AddDeliveryAddress')}}</p>
            <div class="clear"></div>
            <div class="new-address-content">
                <el-form
                  :model="AddForm"
                  status-icon
                  :rules="newaddress"
                  ref="AddForm"
                  class="login-form"
                >
                <input type="hidden" id="editDeliveryId" runat="server" />
                <el-form-item :label="$t('DeliveryAddress.AddFirstName')" prop="FirstName">
                  <el-input
                    v-model="AddForm.FirstName"
                    prefix-icon="el-icon-user"
                    :placeholder="$t('DeliveryAddress.AddFirstName')"
                    clearable
                  ></el-input>
                </el-form-item>

                 <el-form-item :label="$t('DeliveryAddress.AddLastName')" prop="LastName">
                  <el-input
                    v-model="AddForm.LastName"
                    prefix-icon="el-icon-user"
                    :placeholder="$t('DeliveryAddress.AddLastName')"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('DeliveryAddress.PostalCode')" prop="PostalCode">
                  <el-input
                    v-model="AddForm.PostalCode"
                    prefix-icon="el-icon-tickets"
                    :placeholder="$t('DeliveryAddress.PostalCode')"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('DeliveryAddress.Mobile')" prop="Mobile">
                  <el-input
                    v-model="AddForm.Mobile"
                    prefix-icon="el-icon-phone"
                    :placeholder="$t('DeliveryAddress.Mobile')"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('DeliveryAddress.Area')" prop="CountryId">
                  <el-select
                    v-model="AddForm.CountryId"
                     value-key="Id"
                    :placeholder="$t('DeliveryAddress.Area')"
                    style="width: 100%;"
                    v-on:change="selectCountry($event)"
                  >
                    <el-option
                    :label="country.Name"
                    v-for="(country,index) in countryList"
                    :key="index"
                     v-bind:value="(country.Id).toString()"
                    ></el-option>

                  </el-select>
                </el-form-item>
                <div v-show="provinceList.length>0">
                      <el-form-item :label="$t('DeliveryAddress.Province')" prop="Province">
                        <el-select
                          v-model="AddForm.Province"
                          :placeholder="$t('DeliveryAddress.Province')"
                          style="width: 100%;"
                          value-key="Id"
                        >
                          <el-option
                          v-bind:value="(province.Id).toString()"
                          v-for="(province,index) in provinceList"
                          :label="province.Name"
                          :key="index"
                          ></el-option>

                        </el-select>
                      </el-form-item>
                  </div>
                  <el-form-item :label="$t('DeliveryAddress.Address')" prop="Address">
                  <el-input
                    v-model="AddForm.Address"
                    prefix-icon="el-icon-location-outline"
                    :placeholder="$t('DeliveryAddress.Address')"
                    clearable
                  ></el-input>
                </el-form-item>

                <el-form-item :label="$t('DeliveryAddress.DefaultAddress')" >
                  <el-select
                    :placeholder="$t('DeliveryAddress.DefaultAddress')"
                    style="width: 100%;"
                    v-model="AddForm.Default"
                  >
                  <el-option :label="$t('DeliveryAddress.YesBtn')" :value="true"></el-option>
                  <el-option :label="$t('DeliveryAddress.NoBtn')" :value="false"></el-option>
                  </el-select>
                </el-form-item>

                 <el-form-item class="btn-box">
                    <el-button
                      round
                      class="submit-btn"
                      type="primary"
                      @click="saveAddress('AddForm')"
                    >{{$t('DeliveryAddress.SaveBtn')}}</el-button>
                  </el-form-item>
               </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--main-content-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Address from '@/model/address';
import { Country } from '@/model/country';
import { Province } from '@/model/province';
import lang from '@/lang';
import storage from '@/sdk/common/Storage';
import { ElForm } from 'element-ui/types/form';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue')
  }
})
export default class InsDeliveryAddress extends Vue {
  CountryId: number = 786;
  countryList: any[] = [];
  private province!:Province;
  provinceList: any[] = [];
  validator: any = '';
  addr: any = {};
  value: any = '';
  private addressList:Address[] = [];
  addListlength:any='';
  private AddForm = {
    FirstName: '',
    LastName: '',
    Mobile: '',
    Phone: '',
    PostalCode: '',
    CountryId: '',
    Province: '',
    Address: '',
    Default: ''
  }
  get newaddress() {
    return {
      FirstName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserName'),
          trigger: 'blur'
        }
      ],
      LastName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserLastName'),
          trigger: 'blur'
        }
      ],
      Mobile: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserPhone'),
          trigger: 'blur'
        },
        { validator: function(rule, value, callback) {
          /* eslint-disable */
            var mobile = /^(\+)?(\d{0,4}\-?)?\d{7,11}$/;
            if ( mobile.test(value) === false ) {
              var t = lang.messages[storage.get('locale')].Input['phoneincorrect'];
                callback(new Error(t));
            } else {
                callback();
            }
        },
        trigger: 'blur' }
      ],
      CountryId: [
        {
          required: true,
          message: this.$t('Address.Country'),
          trigger: ['blur', 'change']
        }
      ],
      Address: [
        {
          required: true,
          message: this.$t('Address.Address'),
          trigger: 'blur'
        }
      ]
    };
  }

  goAnchor (selector) {
    var anchor = this.$el.querySelector(selector); // 参数为要跳转到的元素id
    document.body.scrollTop = anchor.offsetTop - 150; // chrome
    document.documentElement.scrollTop = anchor.offsetTop - 150; // firefox
  }

  //   加载国家列表
  getCountry () {
    let _this = this;
    this.$Api.delivery.getCountry().then((result) => {
      _this.countryList = result;
    });
  }

  //   加载对应省列表
  getProvince (num) {
    let _this = this;
    var cid = num;
    if (cid && cid !== '') {
      this.$Api.delivery.getProvince(cid).then((result) => {
        _this.provinceList = result;
      });
    } else {
      _this.AddForm.Province = '';
    }
  }

  selectCountry (event) {
    var cid = event;
    let _this = this;
    if (cid && cid !== '') {
      _this.AddForm.Province = '';
      _this.getProvince(cid);
    } else {
      _this.AddForm.Province = '';
    }
  }

  // 加载地址列表
  getAddress () {
    let _this = this;
    this.$Api.address.getAddress().then((result) => {
      _this.addressList = result;
    });
  }

  // 删除对应的地址
  removeAddr (cid) {
    let _this = this;
    var addId = cid;
    this.$Api.address.removeAddress(addId).then((result) => {
      _this.$message({
        message: this.$t('MyFavorite.RemoveSuccess') as string,
        type: 'success',
        customClass: 'messageBoxMobile'
      });
      this.getAddress();
    });
  }

  // 打开地址
  openlink (link) {
    this.$router.push({ path: link });
  }

  // 重置
  reset () {
    this.provinceList = [];
    this.addr = {};
  }
  // 编辑地址
  editAddr (index, val) {
    this.goAnchor(val);
    let _this = this;
    Object.keys(this.AddForm).forEach((element) => {
      this.AddForm[element] = this.addressList[index][element];
    });
    this.AddForm['DeliveryId'] = this.addressList[index].DeliveryId;
    this.$Api.delivery.getProvince(this.addressList[index].CountryId).then((result) => {
      _this.provinceList = result;
    });
  }
  //   保存地址
  private saveAddress (formName) {
    let _this = this;
    this.AddForm.Phone = this.AddForm.Mobile;
    if (!this.AddForm.Province) {
      this.AddForm.Province = '0';
    }
    (this.$refs.AddForm as ElForm).validate(valid => {
      if (valid) {
        this.$Api.address.saveAddress(this.AddForm).then((result) => {
          (this.$refs['AddForm'] as ElForm).resetFields();
          this.getAddress();
          this.AddForm = {
            FirstName: '',
            LastName: '',
            Mobile: '',
            Phone: '',
            PostalCode: '',
            CountryId: '',
            Province: '',
            Address: '',
            Default: ''
          };
          _this.$message({
            message: this.$t('Message.SavedSuccessfully') as string,
            type: 'success',
            customClass: 'messageBoxMobile'
          });
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  mounted () {
    this.getAddress();
    this.getCountry();
  }
@Watch('this.addListlength')
  onCountryChange (n, o) {

  }
}
</script>

<style lang="less" scoped>
.DeliveryAddress {
  .select-delivery-one {
    margin-bottom: 20px;
  }
  .mid-box {
    padding: 2rem 0;

    .select-delivery-address {
      /deep/ .select-delivery-one {
        .OrderCard {
          .el-card__body {
            padding: 10px;
          }

          .left-part {
            p {
              margin: 15px 0;
              span {
                display: inline-block;
                font-size: 14px;
                color: #999;
              }
            }
          }

          .deliver_btn{
            .right-part {
              float: right;
            }

            .el-button {
              width: 100%;
              background:#c6b17c;
              border: 0;

              i[class^='el-icon'] {
                font-size: 14px;
              }

              span {
                font-size: 14px;
              }

              &.delete-btn {
                background: #ccc;
              }
            }
          }
        }
      }
    }

    .new-address {
      margin-top: 40px;

      .common-title {
        color: #fff;
        font-size: 1.6rem;
        background-color: #c6b17c;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        width: 100%;
        display: inline-block;
        text-indent: 20px;
      }

      .new-address-content {
        width: 95%;
        margin: 0 auto;
        padding-bottom: 2rem;

    /deep/ .el-form {
      &.el-form--label-right {
        .el-form-item__label {
          line-height: unset;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #999999;
        }
      }
      .el-input.is-disabled .el-input__inner {
        border-radius: 0px;
      }
      .el-input--prefix .el-input__inner {
        border-radius: 0px;
      }
      .el-select .el-input__inner {
        border-radius: 0px;
      }
      .el-select {
        width: 100%;
      }

      .el-radio__input {
        .el-radio__inner {
          outline: none;
          box-shadow: none;

          &:hover {
            border-color: #c6b17c;
          }
        }

        &.is-checked .el-radio__inner {
          border-color: #c6b17c;
          background: #c6b17c;
        }

        &.is-checked+.el-radio__label {
          color: #c6b17c;
        }
      }
    }

    /deep/ .submit-btn {
      display: block;
      width: 100%;
      background: #c6b17c;
      border: none;
      margin: 3rem 0;
      border-radius: 0px;
      > span {
        font-size: 1.4rem;
        text-transform: uppercase;
      }
    }
      }
    }
  }
}
</style>
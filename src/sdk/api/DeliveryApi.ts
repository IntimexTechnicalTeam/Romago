import { WSAPI } from './WSApi';
import ExpressAndOutlets from '@/model/ExpressAndOutlets';
import Address from '@/model/address';
import { Province } from '@/model/province';
import Proxy from '@/sdk/common/Proxy';
import { Country } from '@/model/country';
export class DeliveryApi extends WSAPI {
  /**
   * 獲取國家列表
   */
  getCountry () {
    return this.instance.get(this.apiPath + '/Delivery/Country').then(res => res.data);
  };

  /**
   * 獲取支持選擇送貨方式的國家列表
   * @param expressId: number
   * @returns
   */
  @Proxy('[Country]')
  getCountyForEx (expressId: number) {
    return this.instance.get(this.apiPath + '/Delivery/GetCountyForEx', { params: { expressId: expressId } }).then(res => res.data);
  }

  /**
   * 獲取对应省列表
   * @param countryId: number
   */
  getProvince (countryId: string) {
    return this.instance.get(this.apiPath + '/Delivery/Province', { params: { countryId: countryId } }).then(res => res.data);
  };

  /**
   * 獲取支持選擇送貨方式的省份列表
   * @param expressId: number
   * @param countryId: number
   */
  @Proxy('[Province]')
  getProvinceForEx (expressId: number, countryId: number) {
    return this.instance.get(this.apiPath + '/Delivery/GetProvinceForEx', { params: { expressId: expressId, countryId: countryId } }).then(res => res.data);
  }

  /**
   * 獲取自提點地址
   */
  @Proxy('[PickupAddress]')
  getPickupAddress () {
    return this.instance.get(this.apiPath + '/Delivery/GetPickupAddress').then(res => res.data);
  }

  /**
   * 順豐自提接口（新）
   * @param name: string
   * @param countryId: number
   * @param provinceId: number
   * @param cityId: number
   * @param ponitType: number
   * @param useShunFengData?: boolean 是否需要順豐數據，空表示不需要
   * @param useBasicData?: boolean 是否需要基礎數據(原來舊的自提數據)，空表示不需要
   * 注意，後台系統還有兩個開關：ShunFengPointSwitch(順豐自提數據開關),DefaultPointSwitch（舊的自提數據開關）
   */
  getPickUpPointCharge (pas) {
    return this.instance.post(this.apiPath + '/Delivery/GetPickUpPointCharge', pas).then(res => res.data);
  }

  /**
   * 獲取自提點類型
   */
  getShunFengPointType () {
    return this.instance.get(this.apiPath + '/Delivery/GetShunFengPointType').then(res => res.data);
  };

  getAddress (callback: any) {
    return this.instance.get(this.apiPath + '/Address/GetAddresses').then((result) => {
      return result;
    });
  };
  /**
   * 獲取（新）順豐自提點城市列表
   * @param pid: number 省份id
   */
  getCityByProvince (pid) {
    return this.instance.get(this.apiPath + '/Delivery/City', { params: { pid: pid } }).then(res => res.data);
  };

  getExpressTimeRange (expressId: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Express/GetExpressTimeRange', { params: { expressId: expressId } }).then(res => res.data);
  };

  @Proxy('[ExpressAndOutlets]')
  getExpressAndOutlets () {
    return this.instance.get(this.apiPath + '/Express/GetExpressAndOutlets').then(res => res.data);
  }

  getExpressPointWithDiscount (exCond: any) {
    return this.instance.post(
      this.apiPath + '/Express/GetExpressPointWithDiscount',
      exCond
    );
  }
  getExpressPointCharge (exCond: any) {
    return this.instance.post(this.apiPath + '/Express/GetExpressPointCharge', exCond).then(res => res.data);
  }

  @Proxy('[ExpressAndOutlets]')
  getExpressChargeForEx (exCond: any) {
    return this.instance.post(this.apiPath + '/Express/GetDefaultExpressChargeForEx', exCond).then(res => res.data);
  }
  savePickupInfo (addressId, address) {
    return this.instance.get(
      this.apiPath + '/Pay/SavePickupInfo',
      {
        params: {
          addressId: addressId,
          address: address,
          date: '',
          time: ''
        }
      }
    ).then(res => res.data);
  }

  private static instance: DeliveryApi;
  //* * 单例 */
  public static getInstance (): DeliveryApi {
    if (DeliveryApi.instance) { return DeliveryApi.instance; } else {
      DeliveryApi.instance = new DeliveryApi();
      return DeliveryApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}

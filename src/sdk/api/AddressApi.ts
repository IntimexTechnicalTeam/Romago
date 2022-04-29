import { WSAPI } from './WSApi';
import Proxy from '@/sdk/common/Proxy';
import Address from '@/model/address';
import { Province } from '@/model/province';

export class AddressApi extends WSAPI {
  /**
   * 獲取送貨地址列表
   */
  getAddress () {
    return this.instance.get(this.apiPath + '/Address/GetAddresses').then(res => res.data);
  };

  /**
   * 獲取對應送貨方式的送貨地址列表
   */
  // @Proxy('[Address]')
  getAddressForEx (exId:string) {
    return this.instance.get(
      this.apiPath + '/Address/GetAddressesForEx',
      { params: { expressId: exId } }
    ).then((result) => {
      // do someting about check success
      // return result.data;
      let addressList = [new Address()];
      addressList.length = 0;
      (result.data.Data || result.data).forEach(e => {
        let address = new Address();
        Object.keys(address).forEach((element) => {
          element = element.replace('_', '');
          address[element] = e[element];
        });
        addressList.push(address);
      });
      return { Address: addressList };
    }).then((result) => {
      result.Address.forEach(element => {
        let province = new Province();
        province.Id = Number(element.Province);
        province.Name = element.ProvinceName;
        element.Provinceo = province;
      });
      return Promise.resolve(result);
    });
  }

  /**
   * 获取默认地址
   */
  getDefaultAddr () {
    return this.instance.get(this.apiPath + '/Address/GetDefaultAddr').then(res => res.data);
  };

  /**
   *  獲取對應送貨方式的默認送貨地址
   * @param expressId: number
   */
  @Proxy('Address')
  getDefaultAddrForEx (expressId: number) {
    return this.instance.get(this.apiPath + '/Address/GetDefaultAddrForEx', { params: { expressId: expressId } }).then(res => res.data);
  }

  /**
   * 新增 / 更新 送貨地址
   * @param address
   */
  saveAddress(address) {
    let action = '/Address/CreateAddress';
    if (address.DeliveryId) {
      action = '/Address/UpdateAddress';
    }
    return this.instance.post(this.apiPath + action, address).then(res => res.data);
  }

  /**
   * 移除送貨地址
   * @param id: number
   */
  removeAddress(id: number) {
    return this.instance.get(this.apiPath + '/address/RemoveAddress', { params: { deliveryId: id } }).then(res => res.data);
  };

  private static instance: AddressApi;
  //* * 单例 */
  public static getInstance(): AddressApi {
    if (AddressApi.instance) { return AddressApi.instance; } else {
      AddressApi.instance = new AddressApi();
      return AddressApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor() {
    super();
  }
}

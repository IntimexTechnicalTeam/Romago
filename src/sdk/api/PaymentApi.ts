import { WSAPI } from './WSApi';
export class PaymentApi extends WSAPI {
  /**
   * 获取付款方式
   */
  getPaymentType () {
    return this.instance.get(this.apiPath + '/pay/GetPaymentMethod').then(res => res.data);
  };

  /**
   * 保存付款方式
   * @param payMethodType: number
   */
  savePayMethod (payMethodType: number) {
    return this.instance.get(this.apiPath + '/pay/SavePayMethod', { params: { payMethodType: payMethodType } }).then(res => res.data);
  };

  /**
   * SaveOrder离线支付功能
   * @param Id: number
   * @param OrderId: number
   * @param OrderNo: string
   * @param ImageName: string
   * @param BigImagePath: string
   * @param SmallImagePath: string
   * @param Remark: string
   * @param Createdate: date
   * @param IsDelete: boolean
   * @param PageInfo
   */
  saveOffLinePay (pas) {
    return this.instance.post(this.apiPath + '/Pay/SaveOffLinePay', pas).then(res => res.data);
  };

  private static instance: PaymentApi;
  //* * 单例 */
  public static getInstance (): PaymentApi {
    if (PaymentApi.instance) { } else {
      PaymentApi.instance = new PaymentApi();
    }
    return PaymentApi.instance;
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}

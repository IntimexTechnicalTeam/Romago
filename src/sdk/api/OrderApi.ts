import { WSAPI } from './WSApi';
import { CreateOrder } from '@/model/order';
import Proxy from '../common/Proxy';
export class OrderApi extends WSAPI {
  UploadFile (param) {
    return Promise.resolve(this.apiPath + '/FileUpload/UploadFile');
  }

  /**
   * 創建订单
   * @param pas: ReceiveOrder
   * @interface ReceiveOrder
   *            AddressId: string
   *            DeliveryType: string
   *            ExpressId: string
   *            ExpressPointId: string
   *            PaymentMethod: string
   *            PickupDate: string
   *            PickupCompanyName: string
   *            PickupAddress: string
   *            PickupAddressPhone: string
   *            PickupTime: string
   *            PickUpName: string
   *            PickUpPhone: string
   *            DeliveryDate: string
   *            DeliveryTime: string
   *            ComeFrom?: number 標識是否為新順豐自提點,1為是，其它為否
   *            TimeRangeId: number 自定義送貨日期、時間Id
   *            CouponIds: Array<string>
   *            PromotionCode: string
   *            Remark: string
   *            MemberPromotiomCode: string 會員促銷碼
   */
  createOrder (pas) {
    return this.instance.post(this.apiPath + '/DefaultOrder/CreateDefaultOrder', pas).then(res => res.data);
  }

  /**
   * 獲取訂單列表
   * @param pageSize: number
   * @param page: number
   */
  getOrderList (pageSize: number, page: number) {
    return this.instance.get(this.apiPath + '/Order/GetOrder', { params: { page: page, pageSize: pageSize } }).then(res => res.data);
  };

  /**
   * 獲取對應訂單信息
   * @param id: string
   */
  getOrderDetail (id: string) {
    return this.instance.get(this.apiPath + '/Order/GetOrder', { params: { id: id } }).then(res => res.data);
  };

  /**
   * 取消訂單
   * @param id: string
   */
  cancel (id: string) {
    return this.instance.get(this.apiPath + '/Order/Cancel', { params: { id: id } }).then(res => res.data);
  };

  /**
   * 獲取送貨時間範圍列表
   */
  getDeliveryTimeRange () {
    return this.instance.get(this.apiPath + '/Order/GetDeliveryTimeRange').then(res => res.data);
  };

  @Proxy('PromotionDiscount')
  getPromotionCodeFrontView (code: string) {
    return this.instance.get(this.apiPath + '/Order/GetPromotionCodeFrontView', { params: { code: code } }).then((result) => {
      if (result.data.Code === 0) { return result.data.ReturnValue; } else { throw new Error(result.data.Message); };
    });
  };

  /**
   *
   * @param Code: string 推廣碼編號
   * @param ProductList: Array<PromotionCodeProdCond> 產品清單
   * @interface PromotionCodeProdCond
   *            Sku: string 產品Id
   *            UnitPrice: number 單價
   *            Qty: number 數量
   */
  @Proxy('PromotionDiscount')
  getPromotionCodeFrontViewV2 (pas) {
    return this.instance.post(this.apiPath + '/promotion/GetPromotionCodeFrontViewV2', pas).then((result) => {
      if (result.data.Code === 0) { return result.data.ReturnValue; } else { throw new Error(result.data.Message); };
    });
  }

  private static instance: OrderApi;
  //* * 单例 */
  public static getInstance (): OrderApi {
    if (OrderApi.instance) { return OrderApi.instance; } else {
      OrderApi.instance = new OrderApi();
      return OrderApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}

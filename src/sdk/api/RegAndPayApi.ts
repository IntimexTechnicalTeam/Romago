import { WSAPI } from './WSApi';

export default class RegAndPayApi extends WSAPI {
  uploadMultiFile (file:any, callback:Function) {
    // instance 对象继承自WSAPI
    return this.instance.post(/* 这里调用post/get方法，返回的是一个promise对象，promise保存的是当次请求的状态 */
      this.apiPath + '/RegNPay/UploadMultiFile', /* url */
      file, /* 这里传的是参数 */
      { headers: { 'contentType': 'multipart/form-data' } } /* 这里可以追加一些请求头信息如Content-Type，Cache-Control等 { headers: { 'Content-Type': 'multipart/form-data' } } */);
  }

  /**
   * 获取表单html
   * @param Key: string
   * @param Lang: string
   * @param IsMobile: boolean
   */
  genForm (Key: string, Lang: string, IsMobile: boolean) {
    return this.instance.post(this.apiPath + '/RegNPay/GenForm', { Key: Key, Lang: Lang, IsMobile: IsMobile }).then(res => res.data);
  }

  /**
   * 获取表单信息（僅數據，沒有生成html）
   * @param Key: string
   * @param Lang: string
   * @param IsMobile: boolean
   */
  getForm (Key: string) {
    return this.instance.get(this.apiPath + '/RegNPay/Get', { params: { Key: Key } }).then(res => res.data);
  }

  /**
   * 保存表单填写数据
   */
  saveSubmit (pas) {
    return this.instance.post(this.apiPath + '/RegNPay/SaveSubmit', pas).then(res => res.data);
  }

  /**
   * 获取提交表单信息
   * @param id: string
   */
  getSubmitComplete (id: string) {
    return this.instance.get(this.apiPath + '/RegNPay/GetSubmitComplete', { params: { id: id } }).then(res => res.data);
  }

  /**
   * 更新支付状态
   * @param response: string
   * @param invoice:string
   */
   updatePayedBySystem (response: string, invoice:string) {
    return this.instance.get(this.apiPath + '/RegNPay/UpdatePayedBySystem', { params: { response: response, invoice: invoice } }).then(res => res.data);
  }

  /**
   * 获取用户填写记录
   * @param shopperId: string
   */
  getSubmitByShopper (shopperId: string) {
    return this.instance.get(this.apiPath + '/RegNPay/GetSubmitByShopper', { params: { shopperId: shopperId } }).then(res => res.data);
  }

  /**
   * 获取填写信息
   * @param id: string
   */
  getSubmitInfo (id: string) {
    return this.instance.get(this.apiPath + '/RegNPay/GetSubmitBySubmitId', { params: { id: id } }).then(res => res.data);
  }

  /**
   * 保存支付方式
   * @param paymentMethod: number
   * @param id: string
   */
  savePayMethod (paymentMethod: number, id: string) {
    return this.instance.get(this.apiPath + '/RegNPay/UpdatePayMethod', { params: { paymentMethod: paymentMethod, id: id } }).then(res => res.data);
  }

  /**
   * 嵌套单选跳出下一层问题
   * @param id: string
   */
  getPanel (id: string) {
    return this.instance.get(this.apiPath + '/RegNPay/GetPanel', { params: { id: id } }).then(res => res.data);
  }

  /**
   * 多聯子選項下拉列表
   * @param optionId: string
   */
  getSubOptionList (optionId: string) {
    return this.instance.get(this.apiPath + '/RegNPay/getSubOptionList', { params: { id: optionId } }).then(res => res.data);
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
  private static instance: RegAndPayApi;
  //* * 单例 */
  public static getInstance (): RegAndPayApi {
    if (RegAndPayApi.instance) { } else {
      RegAndPayApi.instance = new RegAndPayApi();
    }
    return RegAndPayApi.instance;
  }
}

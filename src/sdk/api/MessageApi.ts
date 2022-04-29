/* eslint-disable promise/param-names */
import { WSAPI } from './WSApi';

export class MessageApi extends WSAPI {
  /**
   * 獲取會員未讀信息數量
   */
  getMbrUnreadMsgQty () {
    return this.instance.get(this.apiPath + '/Message/GetMbrUnreadMsgQty').then(res => res.data);
  };

  /**
   * 獲取會員未讀信息
   * @param Condition: MessageSearchCond 搜尋條件
   * @interface MessageSearchCond
   *            Sender: string 發信人
   *            Recipient: string 收信人
   *            MemberId: string 用戶ID
   *            AdminId: string 管理員ID
   *            QueryBgDtStr: string   QueryBgDt?: date  查詢起始日期
   *            QueryEdDtStr: string   QueryEdDt?: date  查詢結束日期
   *            Url: string 鏈接
   *            Sku: string Sku
   *            OrderId: string 訂單ID
   *            IsRead?: boolean 是否已讀
   *            IsShowContact: boolean 是否顯示對話
   *            SendType?: number 發送方 ( 未知 -> -1, 系統通知管理員 -> 1, 系統通知用戶 -> 2, 管理員 -> 3, 用戶 -> 4 )
   *            MsgType?: number 信息類別 ( 未知 -> -1, 系統公告 -> 1, 系統通知 -> 2, 售前咨詢 -> 3, 售後咨詢 -> 4 )
   *            SendFromTypeLst: Array 發送方類型列表
   *            MessageTypeLst: number 信息類別列表
   * @param PageInfo
   */
  getMemberUnreadMsg (pas) {
    return this.instance.post(this.apiPath + '/Message/GetMemberUnreadMsg', pas).then(res => res.data);
  };

  /**
   * 獲取會員全部信息
   * @param Condition: MessageSearchCond 搜尋條件
   * @param PageInfo
   */
  getAllMemberMsg (pas) {
    return this.instance.post(this.apiPath + '/Message/GetAllMemberMsg', pas).then(res => res.data);
  };

  /**
   * 回復郵件（需傳遞被回復記錄的ID）
   * @param pas: Message
   * @interface Message
   *            Id: number
   *            From: string 發送人ID
   *            FromDisplay: string 顯示發送人信息（名稱，暱稱）
   *            To: string 接收人ID
   *            ToDisplay: string 顯示接收人信息（名稱，暱稱）
   *            Subject: string 主題
   *            Content: string 內容
   *            Url: string 鏈接
   *            Sku: string Sku
   *            OrderId: string 訂單ID
   *            isRead: boolean 是否已讀
   *            CreateDate: date 創建時間
   *            UpdateDate: date 更新時間
   *            MsgType: number 信息類別 ( 未知 -> -1, 系統公告 -> 1, 系統通知 -> 2, 售前咨詢 -> 3, 售後咨詢 -> 4 )
   *            SendFromTyp: number 消息來源方 ( 未知 -> -1, 系統通知管理員 -> 1, 系統通知用戶 -> 2, 管理員 -> 3, 用戶 -> 4 )
   */
  mbrReplyMessage (pas) {
    return this.instance.post(this.apiPath + '/Message/MbrReplyMessage', pas).then(res => res.data);
  };

  /**
   * 發送會員的售前信息
   * @param pas: Message 信息詳情
   */
  sendMbrPreSalesMsg (pas) {
    return this.instance.post(this.apiPath + '/Message/SendMemberPreSalesMsg', pas).then(res => res.data);
  };

  /**
   * 發送會員的售後信息
   * @param pas: Message 信息詳情
   */
  sendMbrAfterSalesMsg (pas) {
    return this.instance.post(this.apiPath + '/Message/SendMemberAfterSalesMsg', pas).then(res => res.data);
  };

  /**
   * 標記指定ID的信息為已讀狀態
   * @param MsgIds: Array<string>
   */
  markedMessageAsRead (pas) {
    return this.instance.post(this.apiPath + '/Message/MarkedMessageAsRead', pas).then(res => res.data);
  };

  /**
   * 記會員的所有信息為已讀狀態
   */
  markedMbrAllMsgAsRead () {
    return this.instance.get(this.apiPath + '/Message/MarkedMbrAllMsgAsRead').then(res => res.data);
  };

  /**
   * 刪除指定的信息
   * @param msgIdLst: string 信息記錄ID列表
   */
  deleteMsg (msgIdLst: string) {
    return this.instance.get(this.apiPath + '/Message/DeleteMsg', { params: { msgIdLst: msgIdLst } }).then(res => res.data);
  };

  /**
   * 刪除所有信息
   */
  deleteAllMsg () {
    return this.instance.get(this.apiPath + '/Message/DeleteAllMsg').then(res => res.data);
  };

  private static instance: MessageApi;
  //* * 单例 */
  public static getInstance (): MessageApi {
    if (MessageApi.instance) { return MessageApi.instance; } else {
      MessageApi.instance = new MessageApi();
      return MessageApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}

import { WSAPI } from './WSApi';
import Comments from '@/model/Comments';
import Proxy from '@/sdk/common/Proxy';
export class CommentsApi extends WSAPI {
  /**
   * 保存評論
   * @param Id: number 評論ID
   * @param OrderId: number 訂單ID
   * @param Sku: string 產品Id
   * @param ProductImg: string 產品圖片
   * @param CommentImages: Array 评论图片
   * @param ReplyImages: Array 回复图片
   * @param ProductName: string 產品名稱
   * @param ShopperId: string 買家Id
   * @param ShopperName: string 買家名稱
   * @param Subject: string 評論關鍵字
   * @param Content: string 內容
   * @param ReplyId: number 回復人ID
   * @param ReplyContent: string 回復內容
   * @param CommentDate?: DateTime
   * @param CommentDateString: string 評論日期
   * @param Sorce: number 評分
   * @param IsShow: boolean 是否顯示
   * @param 是否刪除: boolean 是否刪除
   */
  saveComments (pas) {
    return this.instance.post(this.apiPath + '/ProductComment/SaveComments', pas).then(res => res.data);
  }

  /**
   * 根據訂單的產品獲取該訂單產品對應的評論
   * @param orderId: number
   */
  @Proxy('[Comments]')
  getOrderComments (orderId: number) {
    return this.instance.get(this.apiPath + '/ProductComment/GetOrderComments', { params: { orderId: orderId } }).then(res => res.data);
  }

  /**
   * 獲取產品的所有評論
   * @param Sku: string 產品ID
   * @param ShopperId: string 買家ID
   * @param ContentId: number Cms ContentID
   * @param PageInfo
   */
  @Proxy('[Comments]', 'TotalRecord')
  getProductComments (pas) {
    return this.instance.post(this.apiPath + '/ProductComment/GetProductComments', pas).then(res => res.data);
  }

  uploadImage () {
    return Promise.resolve(this.apiPath + '/FileUpload/UploadFile');
  }

  private static instance: CommentsApi;
  //* * 单例 */
  public static getInstance (): CommentsApi {
    if (CommentsApi.instance) { } else {
      CommentsApi.instance = new CommentsApi();
    }
    return CommentsApi.instance;
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}

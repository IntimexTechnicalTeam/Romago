/* eslint-disable promise/param-names */
import { WSAPI } from './WSApi';

export class PointsApi extends WSAPI {
  /**
   * 保存會員積分
   * @param MemberId: string
   * @param OrderId: number
   * @param Points: number
   * @param Type: string ( 订单类型 -> OrderType, 注册类型 -> RegisterType )
   * @param Mode: number ( 增加积分 -> 1, 减少积分 -> 2 )
   */
  save (pas) {
    return this.instance.post(this.apiPath + '/Points/Save', pas).then(res => res.data);
  };

  /**
   * 根據會員ID，獲取該會員的積分賬戶信息
   */
  getMemberTotalPoints () {
    return this.instance.get(this.apiPath + '/Points/GetMemberTotalPoints').then(res => res.data);
  };

  /**
   * 獲取會員明細積分
   * @param MemberId: string
   * @param MemberName: string
   * @param MemberEmail: string
   * @param MemberGroupId: number
   * @param Mode: number
   * @param LevelId: number
   * @param PageInfo
   */
  getPointsDetail (pas) {
    return this.instance.post(this.apiPath + '/Points/PointsDefaultLis', pas).then(res => res.data);
  };

  private static instance: PointsApi;
  //* * 单例 */
  public static getInstance (): PointsApi {
    if (PointsApi.instance) { return PointsApi.instance; } else {
      PointsApi.instance = new PointsApi();
      return PointsApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}

import { WSAPI } from './WSApi';
export class CalendarApi extends WSAPI {
  /**
   * 获取月历事件列表
   * @param Id: string
   * @param Day: number
   * @param Month: number
   * @param Year: number
   * @param IsMobile: boolean
   */
  getListByCond(pas) {
    return this.instance.post(this.apiPath + '/CalenderEvent/GetListByCond', pas).then(res => res.data);
  }

  /**
   * 获取月历某个事件信息
   * @param Id: string
   * @param Day: number
   * @param Month: number
   * @param Year: number
   * @param IsMobile: boolean
   */
  getById(pas) {
    return this.instance.post(this.apiPath + '/CalenderEvent/GetById', pas).then(res => res.data);
  }

  private static instance: CalendarApi;
  //* * 单例 */
  public static getInstance(): CalendarApi {
    if (CalendarApi.instance) { return CalendarApi.instance; } else {
      CalendarApi.instance = new CalendarApi();
      return CalendarApi.instance;
    }
  }
}

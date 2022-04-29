import { WSAPI } from './WSApi';
import Proxy from '@/sdk/common/Proxy';
export class PromotionApi extends WSAPI {
  /**
   * 獲取指定頁面的頂部廣告橫幅
   * @param page: string 頁面名稱
   * @returns 橫幅信息列表
   */
  getHeaderBanner (page: string) {
    return this.instance.get(this.apiPath + '/Banner/GetHeaderBanner', { params: { page: page } }).then(res => res.data);
  };

  /**
   * 獲取指定頁面及位置的推廣資料列表
   * @param page: string 頁面名稱
   * @returns 推廣資料列表
   */
  getPromotionList (page: string) {
    return this.instance.get(this.apiPath + '/Banner/getPromotionList', { params: { page: page } }).then(res => res.data);
  };

  /**
   * 獲取指定頁面及位置的推廣資料
   * @param page: string 頁面名稱
   * @param position: number 位置名稱
   * @returns 推廣資料
   */
  @Proxy('Promotion')
  getPromotion (page: string, position: number) {
    return this.instance.get(this.apiPath + '/Banner/GetPromotion', { params: { page: page, position: position } }).then(res => res.data);
  }

  /**
   * 獲取首頁的SEO數據
   */
  getHomeSeoData () {
    return this.instance.get(this.apiPath + '/seo/GetHomeSeoData').then(res => res.data);
  };

  /**
   * 獲取菜單數據
   */
  getMenu () {
    return this.instance.get(this.apiPath + '/Menu').then(res => res.data);
  };

  private static instance: PromotionApi;
  //* * 单例 */
  public static getInstance (): PromotionApi {
    if (PromotionApi.instance) { return PromotionApi.instance; } else {
      PromotionApi.instance = new PromotionApi();
      return PromotionApi.instance;
    }
  }
}

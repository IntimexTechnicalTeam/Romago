/* eslint-disable promise/param-names */
import { WSAPI } from './WSApi';
import Proxy from '../common/Proxy';

export class CmsApi extends WSAPI {
  /**
   * 根据ContentID获取内容
   * @param id: string
   */
  getContent (id: string) {
    return this.instance.get(this.apiPath + '/cms/GetContent', { params: { cid: id } }).then(res => res.data);
  };

  /**
   * 根据ContentID获取内容
   * @param id: string
   */
  @Proxy('CMS')
  getContentByDevice (pas) {
    return this.instance.post(this.apiPath + '/cms/GetContentByDevice', pas).then(res => res.data);
  }

  /**
   * 根据Key获取Content
   * @param key: string
   */
  getContentByKey (pas) {
    return this.instance.get(this.apiPath + '/cms/GetContentByKey', { params: pas }).then(res => res.data);
  };

  /**
   * 根据目录Key获取该目录下对应的内容
   * @param key: string
   * @param page: number
   * @param pageSize: number
   */
  getContentsByCatKey (pas) {
    return this.instance.get(this.apiPath + '/cms/GetContentsByCatKey', { params: pas }).then(res => res.data);
  };

  /**
   * 根据目录Key获取该目录下对应的内容
   * @param key: string
   * @param page: number
   * @param pageSize: number
   */
  getContentsByCatKeyEx (pas) {
    return this.instance.post(this.apiPath + '/cms/GetContentsByCatKeyEx', pas).then(res => res.data);
  };

  /**
   * 根据目录ID获取该目录下对应的内容
   * @param catId: string
   * @param page: number
   * @param pageSize: number
   */
  getContentsByCatId (catId: string, page:number, pageSize:number) {
    return this.instance.get(this.apiPath + '/cms/GetContentsByCatId', { params: { catId: catId, page: page, pageSize: pageSize } }).then(res => res.data);
  };

  /**
   * 根据CatIds或者GroupIds，查询获取相应的Contents
   * @param PageInfo
   * @param CatIds: Array<number>
   * @param GroupIds: Array<number>
   */
  getContents (pas) {
    return this.instance.post(this.apiPath + '/cms/GetContents', pas).then(res => res.data);
  };

  /**
   * 獲取目錄下的其它文章
   * @param PageInfo
   * @param ContentId: number 文章Id
   * @param CatId: number 文章對應目錄Id
   * @param Key: string 文章對應Key
   */
  getCategoryRelateContent (pas) {
    return this.instance.post(this.apiPath + '/cms/GetCategoryRelateContent', pas).then(res => res.data);
  };

  /**
   * 獲取category和sub category下所有的文章
   * @param PageInfo
   * @param ContentId: number 文章Id
   * @param CatId: number 文章對應目錄Id
   * @param Key: string 文章對應Key
   */
  getSubCatContents (pas) {
    return this.instance.post(this.apiPath + '/cms/GetSubCatContents', pas).then(res => res.data);
  };

  /**
   * 獲取最新的文章
   * @param PageInfo
   * @param ContentId: number 文章Id
   * @param CatId: number 文章對應目錄Id
   * @param Key: string 文章對應Key
   */
  getLastestContents (pas) {
    return this.instance.post(this.apiPath + '/cms/GetLastestContents', pas).then(res => res.data);
  };

  /**
   * 获取CMS的Category的树结构
   * @param PageInfo
   * @param Id: number
   * @param Key: string
   */
  getCategoryTree (pas) {
    return this.instance.post(this.apiPath + '/cms/GetCategoryTree', pas).then(res => res.data);
  };

  /**
   * 获取CMS的Category的树结构
   * @param PageInfo
   * @param Id: number
   * @param Key: string
   */
  getNextCategoryTree (pas) {
    return this.instance.post(this.apiPath + '/cms/GetNextCategoryTree', pas).then(res => res.data);
  };

  /**
   * 根据ContentTitle获取CmsContent List
   * @param Title: string 文章标题
   * @param TagId: number CMS对应的组别
   * @param CatId: number 指定Category下的Content
   * @param IsSearchBoby 是否查询内文
   * @param IsMobile 是否手机
   */
  getContentsByTitle (pas: any) {
    return this.instance.post(this.apiPath + '/cms/GetContentsByTitle', pas).then(res => res.data);
  };

  /**
   * 根据ID获取CMS
   * @param id: string
   * @param isMobile: boolean
   */
  getCategory (id: string) {
    return this.instance.get(this.apiPath + '/cms/GetCategory', { params: { id: id } }).then(res => res.data);
  };

  /**
   * 根据设备信息获取CMSCategory信息
   * @param CatId: number CMS目录Id
   * @param Key: string 文章目录對應Key
   * @param IsMobile: boolean 是否手机
   * @param GroupId?: number 组别ID
   * @param SortName?: string 排序標準 (創建日期 -> CreateDate, 更新日期 -> UpdateDate)
   * @param SortOrder?: string 升序 -> asc, 倒序 -> desc
   * @param ShowContent?: boolean 是否獲取cms內容列表
   */
  getCategoryByDevice (pas) {
    return this.instance.post(this.apiPath + '/cms/getCategoryByDevice', pas).then(res => res.data);
  }

  /**
   * 根据Key获取CMS信息
   * @param key: string
   */
  getCatByKey (key) {
    return this.instance.get(this.apiPath + '/cms/GetCatByKey', { params: { key: key } }).then(res => res.data);
  };

  private static instance: CmsApi;
  //* * 单例 */
  public static getInstance (): CmsApi {
    if (CmsApi.instance) { return CmsApi.instance; } else {
      CmsApi.instance = new CmsApi();
      return CmsApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}

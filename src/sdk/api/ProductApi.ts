import { WSAPI } from './WSApi';
import Proxy from '../common/Proxy';
export class ProductApi extends WSAPI {
  /**
   * 獲取指定產品信息
   * @param sku: string
   */
  @Proxy('PanelDetail', 'Tab', 'AdditionalImage')
  public getProduct (sku: string) {
    return this.instance.get(this.apiPath + '/Product', { params: { id: sku } }).then(res => res.data);
  }

  /**
   * 条件搜寻产品（产品目录，属性值，key ，分页信息）
   * @param Key: string 搜索關鍵詞
   * @param Type: number 查询数据集的类型，组合0、或者筛选1
   * @param CatIdS: Array<number> 篩選產品目錄組合
   * @param Attrs: Array<AttrValues> 篩選產品屬性組合
   * @interface AttrValues
   *            Id: number
   *            Vals: Array<number> 該属性值id組合
   * @param PageInfo
   */
  @Proxy('[YouWouldLike]', 'TotalPage', 'TotalRecord')
  public search (pas) {
    return this.instance.post(this.apiPath + '/product/SearchV2', pas).then(res => res.data);
  }

  /**
   *
   * @param {object} cond ，
   * sku：产品Id
   * attr1:属性1的值Id
   * attr2:属性2的值Id
   * attr3:属性3的值Id
   * 例子：  {
   *            sku:"123",
   *            attr1:1
   *            attr2:1
   *            attr3:1
   *        }
   * @param {Function} callback
   */
  @Proxy('{ "ReturnValue": 1 }')
  checkProductStatus (sku: string, attr1: number = 1, attr2: number = 1, attr3: number = 1) {
    return this.instance.get(this.apiPath + '/Product/CheckProductStatus', { params: { sku: sku, attr1: attr1, attr2: attr2, attr3: attr3 } }).then(res => res.data);
  }

  /**
    * 获取相关产品
    */
  @Proxy('[YouWouldLike]')
  getRltProduct (sku: string) {
    return this.instance.get(this.apiPath + '/Product/GetRelatedProduct', { params: { sku: sku } }).then(res => res.data);
  }

  /**
   *  获取目录的产品分页列表
   * @param pas  data sample: {CatId:10,Page:1,PageSize=10}
   */
  @Proxy('[YouWouldLike]', 'TotalPage', 'TotalRecord')
  getCatProduct (pas) {
    return this.instance.post(this.apiPath + '/product/GetCatProdByPage', pas).then(res => res.data);
  }

  /**
   * 根据当前sku获取该产品的上下产品
   * @param sku 当前sku
   * @param catId 当前CatId
   * @param state true：获取上一个；false：获取下一个;
   * @param callback
   */
  getProductUpOrDown (sku:string, catId:string, state:boolean) {
    return this.instance.get(this.apiPath + '/Product/GetProductUpOrDown', { params: { sku: sku, catId: catId, state: state } }).then(
      (result) => {
        if (result.data !== 0) { return result.data; } else { throw new Error('沒有更多了'); };
      });
  }

  /**
   * 获取产品目录列表
   */
  getCatalogs () {
    return this.instance.get(this.apiPath + '/Catalog/getCatalogs').then(res => res.data);
  };

  /**
   * 获取产品目录列表
   */
  @Proxy('[Catalogs]')
  getCatalogs2 () {
    return this.instance.get(this.apiPath + '/Catalog/getCatalogs').then(res => res.data);
  };

  /**
   * 返回属性的图片
   * @param sku: string
   * @param attrType: number
   * @param attr1: number
   * @param attr2: number
   * @param attr3: number
   */
  getAttrImage (sku:string, attrType:number = 1, attr1:number = 0, attr2:number = 0, attr3:number = 0) {
    return this.instance.get(this.apiPath + '/product/GetAttrImage', { params: { sku: sku, attrType: attrType, attr1: attr1, attr2: attr2, attr3: attr3 } }).then(
      (result) => {
        if (result.data !== 0) { return result.data; } else { throw new Error('沒有更多了'); };
      });
  }

  /**
   * 獲取指定產品目錄信息
   * @param id: string
   */
  @Proxy('Catalogs')
  getCatalog (id) {
    return this.instance.get(this.apiPath + '/Catalog/getCatalog', { params: { id: id } }).then(res => res.data);
  };

  /**
   * 獲取最新產品列表
   * @param qty?: number 產品數量
   */
  @Proxy('[YouWouldLike]')
  getLatestProduct (qty?: number) {
    return this.instance.get(this.apiPath + '/Product/GetLatest', { params: { qty: qty } }).then(res => res.data);
  };

 /**
  * 保存会员推荐产品并发送邮件
  * @param MemberId: string
  * @param Skus: string
  * @param ToEmail: string
  * @param Remark: string
  * @param IType: number
  */
  saveMemberRecommendProduct (pas) {
    return this.instance.post(this.apiPath + '/MemberRecommendProduct/Save', pas).then(res => res.data);
  }

  private static instance: ProductApi;
  //* * 单例 */
  public static getInstance (): ProductApi {
    if (ProductApi.instance) { } else {
      ProductApi.instance = new ProductApi();
    }
    return ProductApi.instance;
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}

import { WSAPI } from './WSApi';

export class ProdAttrApi extends WSAPI {
  /**
   * 根据Id获取属性信息
   * @param Id: string
   * @param Type: number ( 所有屬性 -> 0, 庫存屬性 -> 1, 非庫存屬性 -> 2 )
   * @param Lang: string
   */
  getById (pas) {
    return this.instance.post(this.apiPath + '/ProdAttr/GetAttribtueById', pas).then(res => res.data);
  };

  /**
   * 獲取產品屬性
   * @param Id: string
   * @param Type: number ( 所有屬性 -> 0, 庫存屬性 -> 1, 非庫存屬性 -> 2 )
   * @param Lang: string 默認繁體C
   */
   getAttrList (ps:object) {
    return this.instance.post(this.apiPath + '/ProdAttr/GetAttrs', ps).then((result) => {
      return result.data.ReturnValue;
    });
  };
}

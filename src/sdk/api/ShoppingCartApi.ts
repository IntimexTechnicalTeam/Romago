import { WSAPI } from './WSApi';
import Message from '@/model/Message';
import Proxy from '@/sdk/common/Proxy';
import ShopCart from '@/model/ShopCart';
import store from '@/store';
export class ShoppingCartApi extends WSAPI {
  /**
   * 將商品加入購物車
   * @param Sku: string
   * @param Attr1: number
   * @param Attr2: number
   * @param Attr3: number
   * @param MemberId: string
   * @param Qty: number
   * @param IsDetailPage?: boolean 由于产品详细页面和CheckOut页面传入的的购物车数量不一样，所以分开判断库存
   */
  addItem (pas) {
    return this.instance.post(this.apiPath + '/ShoppingCart', pas).then(res => res.data);
  }

  /**
   * 更新购物车项目数量
   * @param id: string 购物车项目Id
   * @param qty: number 更新后的数量
   * @returns
   */
  updateItemQty (id: string, qty: number) {
    return this.instance.get(this.apiPath + '/ShoppingCart/UpdateItemQty', { params: { id: id, qty: qty } }).then(res => res.data);
  };

  /**
   * 删除购物车相关产品信息
   * @param id: string 购物车项目Id
   */
  removeItem (id: string) {
    return this.instance.get(this.apiPath + '/ShoppingCart/RemoveItem', { params: { id: id } }).then(res => res.data);
  }

  /**
   * 获取购物车相关信息
   */
  // getShoppingCart () {
  //   return this.instance.get(this.apiPath + '/DefaultShoppingCart/GetDefaultShoppingCarts').then(res => res.data);
  // }

  /**
   * 获取购物车相关信息
   */
  @Proxy()
  LoadData () {
    return this.instance.get(
      this.apiPath + '/DefaultShoppingCart/GetDefaultShoppingCarts'
    );
  }

  // @Proxy(ShopCart)
  getShoppingCart () {
    let result = this.instance.get(this.apiPath + '/DefaultShoppingCart/GetDefaultShoppingCarts',
      {}).then((result) => {
      // do someting about check success
      // return result.data;
      let shopCart = new ShopCart();
      Object.keys(shopCart).forEach((element) => {
        element = element.replace('_', '');
        shopCart[element] = result.data[element];
      });
      return { ShopCart: shopCart };
    });
    // store.dispatch('setShopCart', result);
    return result;
  };

   private static instance: ShoppingCartApi;
   //* * 单例 */
   public static getInstance (): ShoppingCartApi {
     if (ShoppingCartApi.instance) { return ShoppingCartApi.instance; } else {
       ShoppingCartApi.instance = new ShoppingCartApi();
       return ShoppingCartApi.instance;
     }
   }
   // eslint-disable-next-line no-useless-constructor
   private constructor () {
     super();
   }
}

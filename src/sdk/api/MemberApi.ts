import { WSAPI } from './WSApi';
import storage from '@/sdk/common/Storage';
import Cookie from 'js-cookie';
import { LoginResult } from '../../model/loginResult';
import { MemberResult } from '../../model/memberResult';
import Vue from 'vue';
import Proxy from '@/sdk/common/Proxy';
import lang from '@/lang';
export class MemberApi extends WSAPI {
  /**
   * 註冊會員
   * @param FirstName: string 名字
   * @param LastName: string 姓氏
   * @param Password: string 密碼
   * @param Mobile: string 電話
   * @param Email: string 郵箱
   */
  register (pas) {
    return this.instance.post(this.apiPath + '/Member/Register', pas).then(res => res.data);
  };

  /**
   * 用户登录
   * @param AppId: string
   * @param Account: string 賬戶
   * @param Password: string 密碼
   * @param RememberMe: boolean 記住我?
   */
  login (
    account: string,
    password: string,
    rememberMe: boolean
  ): Promise<LoginResult> {
    let _this = this;
    let tempId = Cookie.get('uid');
    let r = new Promise<LoginResult>((resolve, reject) => {
      this.instance
        .post(this.apiPath + '/Member/Login', {
          Account: account,
          Password: password,
          RememberMe: rememberMe,
          TempId: tempId
        })
        .then(
          function (response) {
            _this.log(response.data);
            let result = new LoginResult();
            var sucess = response.data.Succeed;
            var data = response.data.ReturnValue;
            if (data) {
              result.Code = sucess ? '1' : '0';
              result.Message = response.data.Message;
              result.ReturnValue = response.data.ReturnValue;
              // storage.set('access_token', data.access_token);
              Cookie.set('access_token', data.access_token);
              Vue.prototype.$Api.shoppingCart.getShoppingCart();
              resolve(result);
            } else {
              console.log(lang.messages);
              result.Message = (lang.messages[storage.get('locale')].Login as any).Loginerror as string;
              reject(result);
            }
          },
          function (response) {
            let result = new LoginResult();

            reject(result);
          }
        );
    });
    return r;
  }

  /**
   * FB登陸
   * @param fbId: string
   * @param key: string
   * @param userName: string
   * @param passWord: string
   */
  public fbLogin (id, key) {
    return this.instance.post(this.apiPath + '/Member/FBLogin', { fbId: id, key: key }).then((res) => {
      if (res.data.Succeeded) {
        Cookie.set('access_token', res.data.ReturnValue.access_token);
      }
      return res;
    });
  }

  /**
   * 用戶登出
   */
  logout (): Promise<any> {
    let _this = this;
    let r = new Promise<any>((resolve, reject) => {
      this.instance.post(this.apiPath + '/Member/Logout').then(
        function (response) {
          _this.log(response.data);
          let result = response.data.ReturnValue;
          let sucess = response.data.Succeeded;
          if (sucess) {
            resolve(sucess);
          } else {
            reject(new Error('登出系統失败！'));
          }
        },
        function (response) {
          reject(new Error('登出系統失败！'));
        }
      );
    });
    return r;
  }

  /**
   * 更改密码
   * @param id: string
   * @param code: string
   * @param password: string
   */
  updatePwdFM (id, code, password) {
    return this.instance.get(this.apiPath + '/Member/UpdatePwdFM', { params: { id: id, code: code, password: password } }).then(result => {
      return result.data;
    });
  }

  /**
   * 获取登入的会员信息
   */
  getAccount () {
    return this.instance.get(this.apiPath + '/Member/GetAccountInfo').then(res => res.data);
  };

  /**
   * 获取会员信息
   */
  getProfile (): Promise<any> {
    let _this = this;
    let r = new Promise<any>((resolve, reject) => {
      this.instance.get(_this.apiPath + '/Member/GetProfile', {}).then(
        function (response) {
          _this.log(response.data);
          let result = response.data.ReturnValue;
          let sucess = response.data.Succeeded;
          // storage.set('uid', result.MemberId);

          if (sucess) {
            // storage.set('logined', '1');
            Vue.prototype.CheckMemberInfo(result);
            resolve(result);
          } else {
            // storage.set('logined', '0');
            // if (result) {
            //   var l = Cookie.get('uLanguage');
            //   if (!l) {
            //     storage.set('uLanguage', result.LanguageCode);
            //     window.location.reload(true);
            //   }
            // }
            resolve();
          }
        },
        function (response) {
          let result = new Error('获取会员信息失败！');
          reject(result);
        }
      );
    });
    return r;
  }
  // @Proxy('MemberResult')
  getProfile2 (): Promise<any> {
    return this.instance.get(this.apiPath + '/Member/GetProfile', {
    }).then((result) => {
      // return result.data;
      let member = new MemberResult();
      if (result.data.Code === 1) {
        Object.keys(member).forEach((element) => {
          element = element.replace('_', '');
          member[element] = result.data.ReturnValue[element];
        });
        return Promise.resolve({ MemberResult: member });
      } else {
        return Promise.reject(result.data.Message);
      }
    });
  }

  // 此处被MAX由Object[]改为any
  /**
   * 更新會員資料
   * @param model
   */
  updateProfile (model: object): Promise<any> {
    let _this = this;
    let r = new Promise<object[]>((resolve, reject) => {
      this.instance.post(this.apiPath + '/Member/UpdateProfile', model).then(
        function (response) {
          _this.log(response.data);
          let result = response.data;
          var data = response.data;
          var sucess = response.data.Succeeded;
          if (result) {
            result.Message = data.Message;
            resolve(result);
          } else {
            result.Message = data.Message;

            reject(result);
          }
        },
        function () {
          reject(new Error('请求接口失败！'));
        }
      );
    });
    return r;
  }

  // 此处被MAX由Object[]改为any// 此处被MAX由Object[]改为any
  /**
   * 修改密碼
   * @param profile
   * @returns
   */
  updatePassword (profile: any): Promise<any> {
    let _this = this;
    let r = new Promise<[]>((resolve, reject) => {
      this.instance.post(this.apiPath + '/Member/UpdatePassword', profile).then(
        function (response) {
          let result = response.data;
          var data = response.data;
          var sucess = response.data.Succeeded;
          if (result) {
            result.Message = data.Message;
            resolve(result);
          } else {
            result.Message = data.Message;

            reject(result);
          }
        },
        function () {
          reject(new Error('请求接口失败！'));
        }
      );
    });
    return r;
  }

  /**
   * 重置密碼
   * @param account
   */
  resetPassword (account: any): Promise<[]> {
    let _this = this;
    let r = new Promise<[]>((resolve, reject) => {
      this.instance
        .get(_this.apiPath + '/Member/resetPassword', {
          params: { account: account }
        })
        .then(
          function (response) {
            let result = response.data;
            let success = result.Succeeded;
            if (success) {
              resolve(result);
            } else {
              // eslint-disable-next-line
                result.Message = lang.messages[storage.get('locale')].Input['emailNotFound'];
              // eslint-disable-next-line
                reject(result);
            }
          },
          function () {
            reject(new Error('请求接口失败！'));
          }
        );
    });
    return r;
  }

  /**
   * 獲取收藏列表
   */
  getFavorite () {
    return this.instance.get(this.apiPath + '/Product/GetFavorite').then(res => res.data);
  }

  /**
   * 添加到收藏列表
   * @param sku: string
   */
  addFavorite (sku: string) {
    return this.instance.get(this.apiPath + '/member/AddFavorite', { params: { sku: sku } }).then(res => res.data);
  }

  /**
   * 從收藏列表移除
   * @param sku: string
   */
  removeFavorite (sku: string) {
    return this.instance.get(this.apiPath + '/member/removeFavorite', { params: { sku: sku } }).then(res => res.data);
  }

  /**
   * 保存设定的界面语言
   * @param lang: string
   */
  setUILanguage (lang: string) {
    return this.instance.get(this.apiPath + '/Member/SaveUILang', { params: { lang: lang } }).then(res => res.data);
  }

  /**
   * 保存设定的界面貨幣
   */
  @Proxy('Currency')
  setCurrency (cur: string) {
    return this.instance.get(this.apiPath + '/Member/SetCurrency', { params: { currencyId: cur } }).then(res => res.data);
  }

  /**
   * 獲取用户优惠券列表
   * @param ExpiryDate: number
   * @param IsMoblie: boolean
   * @param PageInfo
   */
  getAllCoupon (pas) {
    return this.instance.post(this.apiPath + '/Member/GetAllCoupon', pas).then(res => res.data);
  };

  /**
   * 获取用户有效的优惠券
   * @param ExpiryDate: number
   * @param IsMoblie: boolean
   * @param PageInfo
   */
  getActiveCoupon (pas) {
    return this.instance.post(this.apiPath + '/Member/GetActiveCoupon', pas).then(res => res.data);
  }

  private static instance: MemberApi;
  //* * 单例 */
  public static getInstance (): MemberApi {
    if (MemberApi.instance) { return MemberApi.instance; } else {
      MemberApi.instance = new MemberApi();
      return MemberApi.instance;
    }
  }
}

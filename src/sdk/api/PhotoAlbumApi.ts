import { WSAPI } from './WSApi';

export default class PhotoAlbumApi extends WSAPI {
  /**
   * 根据文件夹ID获取文件夹内的所有文件
   * @param FolderId: number 相册文件夹ID
   * @param FileId: number 文件ID
   */
  searchFolderInfo (pas) {
    return this.instance.post(this.apiPath + '/PhotoAlbum/SearchFolderInfo', pas).then(res => res.data);
  }

  /**
   * 獲取指定條件的相冊數據
   * @param Id?: number ID
   * @param PId?: number 父ID
   * @param ChildEnabled: boolean 是否有子數據
   * @param NaviEnabled: boolean 是否需要導航數據
   * @param Name: string
   * @param List: Array<FileInfoN>
   * @param PageInfo
   */
  searchFolders () {
    return this.instance.post(this.apiPath + '/PhotoAlbum/SearchFolders').then(res => res.data);
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
  private static instance: PhotoAlbumApi;
  //* * 单例 */
  public static getInstance (): PhotoAlbumApi {
    if (PhotoAlbumApi.instance) { } else {
      PhotoAlbumApi.instance = new PhotoAlbumApi();
    }
    return PhotoAlbumApi.instance;
  }
}

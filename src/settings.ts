export default {
  // Admin Id
  AppId: 'c6389f4c-39eb-4d9d-86b1-dc0ca217a632',
  // api Authorization 身份認證，用於後端識別客戶端
  Authorization: 'YzYzODlmNGMtMzllYi00ZDlkLTg2YjEtZGMwY2EyMTdhNjMyOmQ2Y2IyODY0LTViY2UtNDg3Zi1hZjBiLTg3OWU4MTUyNzI4NA==',

  /* 網站基礎配置 */
  siteVersion: 3, // 網站版本 （1 => Plan A Startup Version 初創版, 2 => Plan B Enterprise Version 企業旗艦版, 3 => Plan C E-Commerce Version 品牌電商版）
  responsive: false, // 自適應網站開關
  defaultLang: 'C',
  defaultCurrency: 1,
  mobileBuilding: false,
  pcBuilding: false,
  MapRegion: false, // 地区区分加载開關，設置localStorage中的AreaCode（地區）和locale（語言）值
  calendar: false, // 月曆開關，默認開關顯示首頁
  // 自定義語言列表 ps: 如有添加語言，請在目錄 /src/lang 下添加對應語言包文件和修改index.ts相關設置代碼
  langList: [{
    name: '繁',
    value: 'C'
  }, {
    name: '简',
    value: 'S'
  }, {
    name: 'Eng',
    value: 'E'
  }],
  // 設置是否開啟固定頂部菜單
  // ps: 如開啟，fixedHeader默認獲取DefaultHeader組件，如排版改動不大，可通過組件間傳值showInFixed或css區分控制;
  //     如需重新排版,請在組件內添加相關內容( Eg. <Component> fixedHeader排版內容 </Component>  )
  fixedHeader: true,
  // 手機版側欄滑動菜單設置
  slideMenu: {
    direction: 'right', // 菜單滑出方向 => 默認值 'top', 可選值 'top', 'left', 'right'
    width: '100%', // 菜單寬度 => 默認值'100%'，僅在position值為非'top'的情況生效
    height: '100%', // 菜單高度 => 默認值'100%'，僅在position值為'top'的情況生效
    Embedded: false, // 菜單是否內嵌 => 默認值 false ，僅在position值為非'top'的情況生效
    maskBg: '#000', // 側欄菜單遮罩顏色
    maskOpacity: '.7' // 側欄菜單遮罩顏色透明度
  },
  // 电脑版側欄滑動菜單設置
  PCslideMenu: {
    direction: 'left', // 菜單滑出方向 => 默認值 'top', 可選值 'top', 'left', 'right'
    width: '25%', // 菜單寬度 => 默認值'100%'，僅在position值為非'top'的情況生效
    height: '100%', // 菜單高度 => 默認值'100%'，僅在position值為'top'的情況生效
    Embedded: false, // 菜單是否內嵌 => 默認值 false ，僅在position值為非'top'的情況生效
    maskBg: '#000', // 側欄菜單遮罩顏色
    maskOpacity: '0' // 側欄菜單遮罩顏色透明度
  }
};

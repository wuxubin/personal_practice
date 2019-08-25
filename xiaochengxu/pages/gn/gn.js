Page({
  /* 页面的初始数据*/
  data: {
      // 获取设备高度
      appHeight: '',

      // 筛选导航栏数据
      msgList: [
          { key: 1, name: '区域'},
          { key: 2, name: '售价'},
          { key: 3, name: '房型'},
          { key: 4, name: '更多'}
      ],
      // 判断导航栏列表是否显示
      meunShow: [
          { isShows: true },
          { isShows: true },
          { isShows: true },
          { isShows: true }
      ],

      // 区域数据
      // 西安市区
      areaLise: [
          { id: 0, name: '不限' },
          { id: 0, name: '未央' },
          { id: 1, name: '碑林' },
          { id: 2, name: '新城' },
          { id: 3, name: '雁塔' },
          { id: 4, name: '高新' },
          { id: 5, name: '灞桥' },
          { id: 6, name: '长安' }
      ],
      // 市区街道
      rowLise: {
          row_weiyang: { id: 0, name: ['未央1路', '未央2路', '未央3路', '未央4路', '未央5路', '未央6路', '未央7路', '未央8路'] },
          row_beilin: { id: 1, name: ['碑林1路', '碑林2路', '碑林3路', '碑林4路', '碑林5路', '碑林6路', '碑林7路', '碑林8路'] },
          row_xincheng: { id: 2, name: ['新城1路', '新城2路', '新城3路', '新城4路', '新城5路', '新城6路', '新城7路', '新城8路'] },
          row_yanta: { id: 3, name: ['雁塔1路', '雁塔2路', '雁塔3路', '雁塔4路', '雁塔5路', '雁塔6路', '雁塔7路', '雁塔8路'] },
          row_gaoxin: { id: 4, name: ['高新1路', '高新2路', '高新3路', '高新4路', '高新5路', '高新6路', '高新7路', '高新8路'] },
          row_baqiao: { id: 5, name: ['灞桥1路', '灞桥2路', '灞桥3路', '灞桥4路', '灞桥5路', '灞桥6路', '灞桥7路', '灞桥8路'] },
          row_changan: { id: 5, name: ['长安1路', '长安2路', '长安3路', '长安4路', '长安5路', '长安6路', '长安7路', '长安8路'] }
      },

      // 区域模块市区街道隐藏/显示
      rowShow: [
          { isShows: true },
          { isShows: true },
          { isShows: true },
          { isShows: true },
          { isShows: true },
          { isShows: true },
          { isShows: true},
          { isShows: true},
      ],

      // 区域右侧是否显示
      rigShow: true,

      // 售价
      price: [
          { id: 0, name: '不限' },
          { id: 1, name: '1万以下' },
          { id: 2, name: '1 - 1.5万' },
          { id: 3, name: '1.5 - 2.0万' },
          { id: 4, name: '2.0 - 2.5万' },
          { id: 5, name: '2.5 - 3.0万' },
          { id: 6, name: '3.0 - 3.5万' },
          { id: 7, name: '3.5 - 4.0万' },
          { id: 8, name: '4万以上' },
      ],

      // 房间型号
      roomModel: [
          { id: 0, name: '不限' },
          { id: 1, name: '一室' },
          { id: 2, name: '二室' },
          { id: 3, name: '三室' },
          { id: 4, name: '四室' },
          { id: 5, name: '五室以上' }
      ]

  },
  onLoad: function (options) {
      // 获取设备高度
      var res = wx.getSystemInfoSync();
      this.setData({
          appHeight: res.windowHeight
      });

      console.log(this.data.appHeight)
  },

  // 筛选导航栏事件
  menuClick: function(e){
      // 获取通过wxml  data-hi="{{ idx }}" 传过来的索引
      var menuNum = e.currentTarget.dataset.hi;

      // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
      var menuSrc = "meunShow[" + menuNum + "].isShows";

      // 循环data中设置的meunShow
      for (var n = 0; n < this.data.meunShow.length; n++){
          // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
          var menuSrcs = "meunShow[" + n + "].isShows";
          // 解决重复点击不能隐藏的问题
          if (n != menuNum){
              // 初始化，每次点击时先全部隐藏，但是重复点击不会隐藏
              this.setData({
                  [menuSrcs]: true
              });
          };
      };

      // 给当前点击的去反data中设置的meunShow，使之显示， 只写此处只会显示不能隐藏
      this.setData({
          [menuSrc]: !this.data.meunShow[e.currentTarget.dataset.hi].isShows
      });
  },

  // 区域列表事件
  rowClick: function(e){
      // 限制第一个 '不限' 不能点击
      if (e.currentTarget.dataset.hi != 0){
          // 获取wxml  data-hi="{{ index }}" 传过来的索引
          var rowNum = e.currentTarget.dataset.hi;
          // 同筛选导航栏事件，因第一个为不限不可点击， 所以减一
          var rowSrc = "rowShow[" + ( rowNum - 1 ) + "].isShows";
          // 隐藏所有的三级菜单
          for (var m = 0; m < this.data.rowShow.length; m++){
              var rowSrcs = "rowShow[" + m + "].isShows";
              this.setData({
                  [rowSrcs]: true
              });
          };
          // 同上
          this.setData({
              rigShow: false,
              [rowSrc]: !this.data.rowShow[e.currentTarget.dataset.hi].isShows
          });
      };
  },
});
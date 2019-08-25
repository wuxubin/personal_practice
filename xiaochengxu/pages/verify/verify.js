var http = require('../../utils/ajax.js');


Page({
  /**
   * 页面的初始数据
   */
  data: {

    //导航点击的id
    navOnclick_id: 0,
    //*****首页导航数据****
    navList: [],
    //** 轮播图数据***
    swiperList: [],
    //** 视频列表数据***
    videosList: []
  },


  login() {
    // const data = {
    //   password: "WOODENGINE34",
    //   rememberme: false,
    //   username: "admin"
    // }
    // http.httpPost('account/login/', data)
  },


  /**
   * 导航点击的事件
   * @author Lei
   */
  navOnclick(e) {
    // console.log(e);
    this.setData({
      navOnclick_id: e.target.dataset.index
    })
  },

  /**
   * 获取首页导航数据
   * @author Lei
   */
  getNavList() {
    //存储微信小程序 this
    let that = this;
    //利用微信小程序内置方法发送请求
    wx.request({
      url: 'http://sybolong.woodengine.cn/OrderMag/GetOrderst',
      success(res) {
        console.log(res);
        // if (res.data.code === 0) {
        //   that.setData({
        //     navList: res.data.data.navList
        //   })
        // }
      }
    })
  },
  /**
   * 获取首页轮播图数据
   * @author Lei
   */
  getSwiperList() {
    //存储微信小程序 this
    let that = this;
    //利用微信小程序内置方法发送请求
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/swiperList',
      success(res) {
        //console.log(res);
        if (res.data.code === 0) {
          that.setData({
            swiperList: res.data.data.swiperList
          })
        }
      }
    })
  },

  /**
 * 获取首页视频列表数据
 * @author Lei
 */
  getVideosList() {
    //存储微信小程序 this
    let that = this;
    //利用微信小程序内置方法发送请求
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/videosList',
      success(res) {
        //console.log(res);
        if (res.data.code === 0) {
          that.setData({
            videosList: res.data.data.videosList
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1, 获取首页导航数据
    // this.getNavList();
    // //2, 获取首页轮播图数据
    // this.getSwiperList();
    // //3, 获取首页视频列表数据
    // this.getVideosList(); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
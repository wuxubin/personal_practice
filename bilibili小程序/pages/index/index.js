Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndexNav: 0,
    navList: []
  },
  activeNav(e) {
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },
  getNavList() {
    //利用微信小程序内置方法发送请求
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/navList',
      success: (res) => {
        // console.log(res); return;
        if (res.data.code === 0) {
          this.setData({
            navList: res.data.data.navList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getNavList();
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
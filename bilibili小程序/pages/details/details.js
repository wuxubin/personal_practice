// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //视频详情
    videoInfo: [],
    //推荐视频
    othersList: [],
    //评论信息
    commentData: null
  },
  getIdByDetails(viode_id) {
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5ccc2cc89e5cbc7d96b29785/bili/videoDetail?id=' + viode_id,
      success(res) {
        //console.log(res);
        if (res.data.code === 0) {
          that.setData({
            videoInfo: res.data.data.videoInfo
          })
        }
      }
    })
  },
  /**
   * 根据id获取推荐视频
   * @author Lei
   */
  getIdByOthersList(viode_id) {
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/othersList?id=' + viode_id,
      success(res) {
        //console.log(res);
        if (res.data.code === 0) {
          that.setData({
            othersList: res.data.data.othersList
          })
        }
      }
    })
  },
  /**
   * 根据id获取评论详情
   * @author Lei
   */
  getIdByCommentData(viode_id) {
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5c1dfd98e8bfa547414a5278/bili/commentsList?id=' + viode_id,
      success(res) {
        //console.log(res);
        if (res.data.code === 0) {
          that.setData({
            commentData: res.data.data.commentData
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options);
    //视频id
    let viode_id = options.id;
    this.getIdByDetails(viode_id);
    this.getIdByOthersList(viode_id);
    this.getIdByCommentData(viode_id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

Page({

    /**
     * 页面的初始数据
     */
    data: {
        message: "JS的数据",
        sliderList: [],
        navList : []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {       
        /* 1.请求轮播图数据 */ 
        wx.request({
            url: "https://locally.uieee.com/slides",
            success: (res) => {
                console.log('sdfdsfindex',res);
                /**
                 *   this.setData 有两个功能：
                 *      1. 更新数据
                 *      2. 更新视图
                 * */
                this.setData({
                    sliderList: res.data
                });
            },
        });
        /* 2.请求导航 */ 
        wx.request({
            url: "https://locally.uieee.com/categories",
            success: (res) => {
                // console.log(res);
                /**
                 *   this.setData 有两个功能：
                 *      1. 更新数据
                 *      2. 更新视图
                 * */
                this.setData({
                    navList: res.data
                });
            },
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // console.log("B2:首页-监听页面初次渲染完成-onReady-3");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // console.log("C2:首页-监听页面显示-onShow-2");
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("D2:首页-监听页面隐藏");
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("E2:首页-监听页面卸载");
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

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shopList: [],
        // 由于第一次加载的时候就要自增1，所以默认值设置为0
        pageIndex: 0,
        pageSize: 20,
        catId: 1,
        // 2.1用于记录是否还有更多的数据
        hasMore: true
    },
    //  1.3. 自己定义的函数，用来加载数据
    loadMore: function () {

        // 2.2如果没有更多数据，就直接返回
        if (!this.data.hasMore) return;

        wx.request({
            url: "https://locally.uieee.com/categories/" + this.data.catId + "/shops",
            data: {
                _limit: this.data.pageSize,
                _page: ++this.data.pageIndex
            },
            success: (res) => {
                console.log(res);
                // bug：请求过来的数据把本来的替换掉了
                // 1.6. 解决bug思路，先获取本来的数据，再通过concat把新数据拼接起来。
                var newList = this.data.shopList.concat(res.data);
                // 2.3 获取数据的总数
                var count = parseInt(res.header['X-Total-Count']);
                // 2.4 用于判断比较是否还有更多数据
                var flag = this.data.pageIndex * this.data.pageSize < count;
                this.setData({
                    shopList: newList,
                    hasMore: flag,
                });
            },
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log("A3:店铺列表页-----监听页面加载");
        console.log(options);
        // 1.1. 根据首页传递过来的参数，设置导航条标题
        // 更多API学习方式：看文档。
        if (options.title) {
            wx.setNavigationBarTitle({
                title: options.title,
            });
        }
        // 1.2. 把获取的参数设置到data中，方便复用
        this.setData({
            catId: options.cat
        });
        // 1.4. 调用加载数据的函数
        this.loadMore();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // console.log("B3:店铺列表页-----监听页面初次渲染完成");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // console.log("C3:店铺列表页-----监听页面显示");
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("D3:店铺列表页-----监听页面隐藏");
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("E3:店铺列表页-----监听页面卸载");
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log("下拉事件");
        // 下拉刷新页面
        // 3.1 把数据先设置回默认值
        this.setData({
            shopList:[],
            pageIndex:0,
            hasMore:true,
        });  
        // 3.2 再重新请求数据
        this.loadMore();
        // 3.3 记得停止，否则在手机端一直存在
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("上拉触底");
        // 1.5. 触底再调用加载数据的函数
        this.loadMore();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
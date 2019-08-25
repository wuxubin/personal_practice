var config = {
    APPID: 'your id',
    BASE_URL: 'http://sybolong.woodengine.cn/',
}//引入配置文件

function Get(url, data) {
    wx.showNavigationBarLoading();//顶部显示loading效果
    wx.request({
        url: config.BASE_URL + url,
        data: data,
        success: (res) => {
            console.log(res);
            wx.hideNavigationBarLoading();//顶部隐藏loading效果
        },
        fail: (err) => {
            console.log(err)
            wx.hideNavigationBarLoading();
        }
    })
};

function Post(url, data) {
    wx.request({
        method: 'POST',
        url: config.BASE_URL + url,
        data: data,
        header: {
            "Content-Type": "application/x-www-form-urlencoded"//跨域请求
        },
        success: (res) => {
            console.log(res);
        },
        fail: (err) => {
            console.log(err);
        }
    });
};
//暴露接口
module.exports = {
    httpGet: Get,
    httpPost: Post
}
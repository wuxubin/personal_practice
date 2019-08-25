// pages/index/menu.js

// 全部 提交
// 审核驳回 等待付款
// 等待付款确认 付款确认不通过
// 待排产 生产中
// 开始出货 延误
const app = getApp()
Page({
  data: {
    dropDownMenuTitle: ['', '订单状态', '订单类型','筛选'],
    data1: [
      { id: 0, title: '全部' },
      { id: 1, title: '提交' },
      { id: 2, title: '审核驳回' },
      { id: 3, title: '等待付款' },
      { id: 4, title: '等待付款确认' },
      { id: 5, title: '付款确认不通过' },
      { id: 6, title: '待排产' },
      { id: 7, title: '生产中' },
      { id: 8, title: '开始出货' },
      { id: 9, title: '延误' },
    ],
    data2: [
      { id: 1, title: '全部' },
      { id: 2, title: '柜体' },
      { id: 3, title: '门板' },
    ],
    data3: [
      { id: 1, title: '全部' },
      { id: 2, title: '柜体' },
      { id: 3, title: '门板' },
    ],
  },
  onLoad: function () {

  },
  /**
* 生命周期函数--监听页面初次渲染完成
*/
  onReady: function () {

  },
  selectedItem: function (e) {
    console.log('id --' + e.detail.selectedId + "cityname = " + e.detail.selectedTitle);
  },
  showDialog: function (e) {

  },

})
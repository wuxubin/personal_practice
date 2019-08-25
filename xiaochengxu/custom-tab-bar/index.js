Component({
  data: {
    "color": "#919191",
    "selectedColor": "#03a9f4",
    "list": [
      {
        "pagePath": "/pages/welcome/welcome",
        "iconPath": "../image/icon-index.png",
        "selectedIconPath": "../image/icon-index-select.png",
        "text": "主页"
      },
      {
        "pagePath": "/pages/index/index",
        "iconPath": "../image/icon-add.png",
        "selectedIconPath": "../image/icon-add-select.png",
        "text": "添加"
      },
      {
        "pagePath": "/pages/gn/gn",
        "iconPath": "../image/icon-search.png",
        "selectedIconPath": "../image/icon-search-select.png",
        "text": "查询"
      },
      {
        "pagePath": "/pages/verify/verify",
        "iconPath": "../image/icon-my.png",
        "selectedIconPath": "../image/icon-my-select.png",
        "text": "我的"
      }
    ],
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})
//index.js
const app = getApp()

Page({
  data: {
    inputValue: '',
    list: []
  },
  handleSubmit: function(){
    this.list.push(this.inputValue)
    this.inputValue = ''
  }
})

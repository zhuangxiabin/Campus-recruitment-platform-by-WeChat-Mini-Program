const app = getApp()

Page({
  data: {
    url: 'zhuang853226645@gmail.com'
  },
  onLoad: function () {

  },
  copy: function () {
    let that = this
    wx.setClipboardData({
      data: that.data.url,
      success() {
        that.setData({
          url: 'url'
        })
        console.log('success')
        wx.showToast({
          title: '复制到剪贴板',
          icon: 'success',
          duration: 2000
        });
      }
    })
    wx.getClipboardData({
      success(res) {
        console.log(res.data)
      }
    })
  }
})

// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 'github',
        name: 'GitHub',
        open: false,
      },
      {
        id: 'Email',
        name: '邮箱',
        open: false,
      },

    ],
    github:'https://github.com/zhuangxiabin',
    email:'zhuang853226645@gmail.com'
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  copygithub:function(){
    let that = this
    wx.setClipboardData({
      data: that.data.github,
      success() {
        that.setData({
          github: 'github'
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
  },
  copyEmail:function(){
    let that = this
    wx.setClipboardData({
      data: that.data.email,
      success() {
        that.setData({
          email: 'email'
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
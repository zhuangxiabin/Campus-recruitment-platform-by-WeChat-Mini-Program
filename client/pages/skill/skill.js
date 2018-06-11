// pages/skill/skill.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    learnAbility: '60',
    compressionAbility: '60',
    leaderAbility: '60'
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.openId)
    that.setData({
      openid: options.openId
    })
    wx.request({
      url: app.globalData.getUserInfo,
      data: {
        openid: that.data.openid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        console.log(res.data[0]);
        that.setData({
          learnAbility: res.data[0].learnAbility,
          leaderAbility: res.data[0].leaderAbility,
          compressionAbility: res.data[0].compressionAbility
        })
      },
      fail: function () {
        //wx.hideLoading();
        console.log("get fail");//数据获取失败
      },
      complete: function () {

      }

    })
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
  listenerLearn:function(e){
    console.log(e.detail.value)
    this.setData({
      learnAbility: e.detail.value
    })
  },
  listenerCompression:function(e){
    console.log(e.detail.value)
    this.setData({
      compressionAbility: e.detail.value
    })
  },
  listenerLeader:function(e){
    console.log(e.detail.value)
    this.setData({
      leaderAbility: e.detail.value
    })
  },
  saveSkill:function(e){
    var skill = {
      openid:this.data.openid,
      learnAbility: this.data.learnAbility,
      compressionAbility: this.data.compressionAbility,
      leaderAbility: this.data.leaderAbility
    }
    console.log(skill)
    wx.request({
      url: app.globalData.insertSkill,
      data: {
        skill:skill
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        console.log(res.data);
        if (res.data) {
          wx.showToast({
            title: '已完成',
            icon: 'success',
            duration: 3000
          });
        } else {
          wx.showToast({
            title: '操作失败',
            icon: 'loading',
            duration: 3000
          });
        }
      },
      fail: function () {
        //wx.hideLoading();
        console.log("get fail");//数据获取失败
      },
      complete: function () {
      }

    })
  }
})
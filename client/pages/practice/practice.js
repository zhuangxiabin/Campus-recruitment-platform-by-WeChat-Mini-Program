// pages/edu/edu.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName: '',
    zhiweiName: '',
    startday: '',
    endday: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
        console.log(res.data[0].practice);
        var practice = res.data[0].practice;
        var practiceInfo = JSON.parse(practice)
        console.log(practiceInfo)
        console.log(typeof (practice))
        console.log(typeof (practiceInfo))
        that.setData({
          companyName: practiceInfo.companyName,
          zhiweiName: practiceInfo.zhiweiName,
          startday: practiceInfo.startday,
          endday: practiceInfo.endday
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
  bindstartDateChange: function (e) {
    this.setData({
      startday: e.detail.value
    })
    console.log(this.data.startday)
  },
  bindendDateChange: function (e) {
    this.setData({
      endday: e.detail.value
    })
    console.log(this.data.endday)
  },
  inputcompanyNames: function (e) {
    this.setData({
      companyName: e.detail.value
    })
    console.log(e.detail.value)
  },
  inputzhiweiNames: function (e) {
    this.setData({
      zhiweiName: e.detail.value
    })
    console.log(e.detail.value)
  },
  showTopTips: function () {
    var that = this
    console.log(that.data);
    if (that.data.companyName == '' || that.data.zhiweiName == '' || that.data.startday == '' || that.data.endday == '') {
      that.setData({
        showTopTips: true,
        tips: '不能为空',
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000)
    } else {
      var info = {
        openid: that.data.openid,
        companyName: that.data.companyName,
        zhiweiName: that.data.zhiweiName,
        startday: that.data.startday,
        endday: that.data.endday
      }
      console.log(info);
      wx.request({
        url: app.globalData.insertPractice,
        data: {
          Info: info
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
  }
})
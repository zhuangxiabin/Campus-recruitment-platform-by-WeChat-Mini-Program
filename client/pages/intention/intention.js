// pages/intention/intention.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    tips:'不能为空',
    likeposition:'',
    likecity:''
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
          likeposition: res.data[0].user_like,
          likecity: res.data[0].user_like_city
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
  inputPosition:function(e){
    console.log(e.detail.value)
    this.setData({
      likeposition: e.detail.value
    })
  },
  inputCity:function(e){
    console.log(e.detail.value)
    this.setData({
      likecity: e.detail.value
    })
  },
  save:function(){
    var that = this
    console.log(that.data.likeposition == '');
    console.log(that.data.likecity == '');
    if (that.data.likeposition == '' || that.data.likecity==''){
      that.setData({
        showTopTips: true,
        tips: '不能为空',
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000)
    }else{
      var intentionInfo = {
        openid: that.data.openid,
        likeposition: that.data.likeposition,
        likecity: that.data.likecity
      }

      likecity: that.data.likecity
      
      console.log(intentionInfo)
      wx.request({
        url: app.globalData.insertIntention,
        data: {
          intentionInfo: intentionInfo
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
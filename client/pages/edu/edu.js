// pages/edu/edu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xueli: ['大专', '本科', '硕士', '博士', '其他'],
    xueliIndex: '',
    schoolName:'',
    zhuanyeName:'',
    education:'',
    day:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      openid:options.openId
    })
    wx.request({
      url: app.globalData.getUserInfo,
      data: {
        openid: that.data.openid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        console.log(res.data[0].edu);
        var edu = res.data[0].edu;
        var eduInfo = JSON.parse(edu)
        console.log(eduInfo)
        console.log(typeof(edu))
        console.log(typeof (eduInfo))
        that.setData({
          schoolName: eduInfo.schoolName,
          zhuanyeName: eduInfo.zhuanyeName,
          education: eduInfo.education,
          day: eduInfo.day
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      day: e.detail.value
    })
    console.log(this.data.date)
  },
  bindxueliChange: function (e) {
    //console.log('picker country 发生选择改变，携带值为', e.detail.value);
    var education = this.data.xueli[e.detail.value];
    this.setData({
      education: education,
      xueliIndex: e.detail.value
    })
    console.log(this.data.education);
  },
  inputschoolNames:function(e){
    this.setData({
      schoolName: e.detail.value
    })
    console.log(e.detail.value)
  },
  inputzhuanyeNames:function(e){
    this.setData({
      zhuanyeName: e.detail.value
    })
    console.log(e.detail.value)
  },
  showTopTips:function(){
    var that = this
    console.log(that.data);
    if (that.data.schoolName == '' || that.data.zhuanyeName == '' || that.data.education == '' || that.data.day == '') {
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
      var info = {
        openid :that.data.openid,
        schoolName: that.data.schoolName,
        zhuanyeName: that.data.zhuanyeName,
        education: that.data.education,
        day: that.data.day 
      }
      console.log(info);
      wx.request({
        url: app.globalData.insertEdu,
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
// pages/detail/detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscollection:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let id = options.id;
    console.log(id);
    wx.getStorage({
      key: id.toString(),
      success: function(res) {
        that.setData({
          iscollection: true
        })
      },
    })
    wx.request({
      url: app.globalData.getJobDetail,
      data: {
        id: id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        console.log(res.data[0]);
        that.setData({
          detail: res.data[0]
        })
      },
      fail: function () {
        console.log("get fail");//数据获取失败
      },
      complete: function () {
        // complete
        // if (!that.data.havadone) {

        // } else {
        //   that.setData({
        //     showloadmore: true
        //   })
        //   var oldarr = that.data.jobList;
        //   var newarr = that.data.newjobList;
        //   console.log(oldarr.concat(newarr));
        //   var arr = oldarr.concat(newarr);
        //   var newpage = that.data.page + 1
        //   that.setData({
        //     jobList: arr,
        //     page: newpage,
        //     jobListBackup: arr
        //   })
        // }
      }
    })

  },
  callphone:function(e){
    var that =this
    console.log(e.currentTarget.dataset.phone)
    var phone = e.currentTarget.dataset.phone
    wx.setClipboardData({
      data: phone,
      success() {
        that.setData({
          phone: phone
        })
        console.log('success')
        wx.showToast({
          title: '已经复制微信号',
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
  clickCompany:function(e){
    console.log(e.currentTarget.dataset.companyid)
    wx.getStorage({
      key: 'collection',
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  //点击收藏
  clickCollection:function(e){
    var that = this
    var value = that.data.detail;
    // 隐藏收藏图标
    that.setData({
      iscollection:true
    })
    // 标记本页面已经收藏
    wx.setStorage({
      key: that.data.detail.id.toString(),
      data: that.data.iscollection,
    })
    wx.getStorage({
      key: 'collection',
      success: function(res) {
        console.log(res.data)
        that.setData({
          historyVal:res.data
        })
      },
      fail:function(e){
        console.log(e)
        that.setData({
          historyVal: []
        })
      },
      complete:function(){
        console.log(that.data.historyVal)
        var historyVal = that.data.historyVal
        var inputVal = historyVal.push(value)
        console.log(historyVal)
        wx.setStorage({
          key: 'collection',
          data: historyVal,
        })
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
  movieToAdd:function(){
    var that = this;
    console.log(that.data.detail.latitude);
  
    var latitude = parseFloat(that.data.detail.latitude);
    var longitude = parseFloat(that.data.detail.longitude);
    console.log(latitude);
    console.log(longitude);
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  }
})
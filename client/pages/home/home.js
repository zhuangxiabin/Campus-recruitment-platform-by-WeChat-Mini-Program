var app = getApp();
var util = require('../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  getList:function(){
    wx.request({
      url: 'https://www.easy-mock.com/mock/5909e0457a878d73716eb24a/Boss/jobList',
      data: {
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        this.setData({
          jobList: res.data.data,
          jobListBackup: res.data.data
        })
        wx.hideLoading();//关闭提示框
        console.log('jobList get success');//数据获取成功
        console.log(this.data.jobList);
      },
      fail: function () {
        wx.hideLoading();
        console.log("get fail");//数据获取失败
      },
      complete: function () {
        // complete
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("主页开始加载");
    console.log(app.globalData.url)
    console.log(wx.getSystemInfoSync().windowHeight);
    app.globalData.windowHeight = wx.getSystemInfoSync().windowHeight;
    console.log('app.globalData.windowHeight',app.globalData.windowHeight)
    // 加载提示框
    // wx.showLoading({
    //   title: '正在加载…',
    //   mask: true,
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })

    // //请求数据
    // this.getList();
    
    
  },

  SearchKeyWord:function(e){
    //获取点击的text的值，通过自定义的data-type获取
    console.log(e.currentTarget.dataset.type);
    
    var that = this;
    wx.request({
      url: app.globalData.getListurl,
      data: {
        dateInfo: e.currentTarget.dataset.type,
        page:1
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        console.log(res.data.havedone);
        if (res.data.havedone){
          that.setData({
          jobList: []
        })
        }else{
          that.setData({
          jobList: res.data 
        })
        }
      },
      fail: function () {
        //wx.hideLoading();
        console.log("get fail");//数据获取失败
      },
      complete: function () {
        // complete
        console.log(typeof (that.data.jobList));
        console.log(typeof(e.currentTarget.dataset.type));
        wx.navigateTo({
          url: '../search/search?List=' + JSON.stringify(that.data.jobList) + "&searchValue=" + e.currentTarget.dataset.type,
        })
      }
      
    })
  },

/**
   * 跳转到搜索页面
   */
  bindToSearch:function(){
      wx.navigateTo({
        url: '../globalSearch/globalSearch',
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
  
    wx.showNavigationBarLoading();
    this.onLoad();
    wx.stopPullDownRefresh();  
    wx.hideNavigationBarLoading()
    
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
    
  }
})
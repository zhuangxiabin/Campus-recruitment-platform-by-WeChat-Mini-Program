//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
    // wxSearchData:{
    //   view:{
    //     isShow: true
    //   }
    // }
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['职位', '公司',],//下拉列表的数据
    index: 0//选择的下拉列表下标
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,43,['Java','Web前端','Html5','react','JavaScript']);
    WxSearch.initMindKeys(['weappdev.com','微信小程序开发','微信开发','微信小程序','前端']);
  },
  //点击搜索
  wxSearchFn: function(e){
    var that = this
    var index = that.data.index
    var selectData = that.data.selectData
    //搜索类型
    var searchKey = selectData[index]
    //搜索数据
    var searchVal = that.data.wxSearchData.value
    console.log(that)
    console.log(searchKey, searchVal)
    //增加搜索历史
    WxSearch.wxSearchAddHisKey(that);
    //请求后端数据
    wx.request({
      url: app.globalData.getSearchList,
      data: {
          searchKey: searchKey,
          searchVal: searchVal
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        console.log(res.data);
        this.setData({
          jobList: res.data
        })
        //wx.hideLoading();
      },
      fail: function () {
        //wx.hideLoading();
        console.log("get fail");//数据获取失败
      },
      complete: function () {
        // complete
        // console.log(typeof (that.data.jobList));
        // console.log(typeof (e.currentTarget.dataset.type));
        wx.navigateTo({
          url: '../search/search?List=' + JSON.stringify(that.data.jobList) + "&searchValue=" + searchVal,
        })
      }

    })
    
  },
  wxSearchInput: function(e){
    console.log(e.detail.value)
    var that = this
    that.setData({
      searchVal: e.detail.value
    })
    WxSearch.wxSearchInput(e,that);
  },
  wxSerchFocus: function(e){
    var that = this
    WxSearch.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this
    WxSearch.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    WxSearch.wxSearchKeyTap(e,that);
  },
  wxSearchDeleteKey: function(e){
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e){
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  }
})

// pages/infodetail/infodetail.js
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var slug = options.slug;
    console.log(options.slug);
    
    wx.request({
      url: 'https://zhuanlan.zhihu.com/api/posts/' + slug,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        // success
        console.log(res.data.publishedTime);
        var authorImage = 'http://pic1.zhimg.com/' + res.data.author.avatar.id + '_xl.jpg'
        console.log(authorImage);
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        this.setData({
          title: res.data.title,
          titleImage: res.data.titleImage,
          authorImage: authorImage,
          authorName: res.data.author.name
        })
        let that = this;
        let ceshi = res.data.content;
        WxParse.wxParse('article', 'html', ceshi, that, 5);

        console.log('get success');//数据获取成功
      },
      fail: function () {
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

  }
})
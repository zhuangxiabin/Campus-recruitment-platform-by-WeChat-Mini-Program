Page({
  data: {
    slider: [
      {
        picUrl: 'https://img.bosszhipin.com/beijin/upload/image/20180126/7d01db02b4b7eab5128008ebcc424ad9.png',
        key: "java"
      },
      {
        picUrl: 'https://img.bosszhipin.com/beijin/upload/image/20180202/90ef8474e52bded755283fe9b180801d.jpg',
        key: "算法工程师"
      },
      {
        picUrl: 'https://img.bosszhipin.com/beijin/upload/image/20180124/d5b36d93f7c6496f85912f1e6723766b.png',
        key: "UI"
      },

    ],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    swiperCurrent: 0,
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  swiperKey: function (e) {
    console.log(e.currentTarget.dataset.key);
  },
  moveTodetail: function (e) {
    // console.log(e);
    let slug = e.currentTarget.dataset.slug;
    console.log(slug);
    wx.navigateTo({
      url: '../infodetail/infodetail?slug=' + slug,
      success: function (res) {
        // success
        // console.log('success');

      }
    })
  },
  onLoad: function () {
    console.log(wx.getSystemInfoSync().windowHeight)
    var windowHeight = getApp().globalData.windowHeight;
    var width = wx.getSystemInfoSync().windowWidth;
    console.log(width);
    var height = width * 112 / 235;
    this.setData({
      swiperHeight: height,
      windowHeight: windowHeight
    })
    // console.log('windowheight',this.data.windowHeight)
    // console.log('swiperheight:',this.data.swiperHeight)
    // console.log('scrollheight',this.data.windowHeight - this.data.swiperHeight )
    wx.request({
      url: 'http://zhuanlan.zhihu.com/api/columns/ilovemyjob/posts?limit=10&offset=0',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        // success
        console.log(res.data);
        this.setData({
          infoList: res.data
        })

        console.log('get success');//数据获取成功
      },
      fail: function () {
        console.log("get fail");//数据获取失败
      },
      complete: function () {
        // complete
      }
    })
  },
  onReady:function(){
    // var that = this
    // wx.getSystemInfo({
    //   success({ windowHeight }) {
    //     that.setData({
    //       windowHeight: windowHeight
    //     })
    //     console.log('windowheight', that.data.windowHeight)
    //     console.log('swiperheight:', that.data.swiperHeight)
    //     console.log('scrollheight', that.data.windowHeight - that.data.swiperHeight)
    //   }
    // });
  }
})

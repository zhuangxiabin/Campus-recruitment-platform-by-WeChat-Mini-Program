// 获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobList: [],
    showloadmore: true,
    havadone:true,
    page:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.List).length == 0);
    if (JSON.parse(options.List).length==0){
      this.setData({
        jobList:[]
      })
    }else
    console.log(options.searchValue);
    this.setData({
      jobList: JSON.parse(options.List),
      jobListBackup: JSON.parse(options.List),
      searchValue: options.searchValue
    });
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      windowHeight: windowHeight
    });
    console.log(this.data.windowHeight)
    
    
  },
  scrolltolower: function () {
    var that = this;
    if(!that.data.havadone){
      console.log("到底了,没数据");
    }else{
      console.log("到底了,请求数据");
      this.setData({
        showloadmore: false
      })
      wx.request({
        url: app.globalData.getListurl,
        data: {
          dateInfo: that.data.searchValue,
          page: that.data.page
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: (res) => {
          console.log(res.data.havedone);
          if (res.data.havedone) {
            that.setData({
              havadone: false,
              showloadmore: true,
            })
          } else {
            that.setData({
              newjobList: res.data
            })
          }
          //wx.hideLoading();
        },
        fail: function () {
          //wx.hideLoading();
          console.log("get fail");//数据获取失败
        },
        complete: function () {
          // complete
          if (!that.data.havadone) {

          } else {
            that.setData({
              showloadmore: true
            })
            var oldarr = that.data.jobList;
            var newarr = that.data.newjobList;
            console.log(oldarr.concat(newarr));
            var arr = oldarr.concat(newarr);
            var newpage = that.data.page + 1
            that.setData({
              jobList: arr,
              page: newpage,
              jobListBackup:arr
            })
          }
        }
      })
    }
  },
  moveTodetail:function(e){
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
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
  inputIntroduce: function (e) {
    var introduce = e.detail.value;
    var introductionNum = introduce.length
    this.setData({
      introductionNum: introductionNum,
      introduce: introduce
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    console.log(this.data.inputVal)
  },
  //点击回车
  bindconfirm: function (e) {
    // 先初始化数据
    this.setData({
      jobList: this.data.jobListBackup
    });
    console.log(this.data.inputVal);
    let Arr = this.data.jobList;
    let jobCity = [];
    let jobName = [];
    let jobCompany = [];
    let jobNull = [];
    if (this.data.inputVal == '') {
      this.setData({
        jobList: this.data.jobListBackup
      })
    } else
      for (var i = 0; i < Arr.length; i++) {
        switch (this.data.inputVal) {
          case Arr[i].city:
            jobCity.push(Arr[i]);
            this.setData({
              jobList: jobCity
            })
            console.log(jobCity)
            break;
          case Arr[i].title:
            jobName.push(Arr[i]);
            this.setData({
              jobList: jobName
            })
            break;
          case Arr[i].company:
            jobCompany.push(Arr[i]);
            this.setData({
              jobList: jobCompany
            })
            break;
          default: 
            if (jobCity.length == 0 && jobCompany.length==0 && jobName.length==0){
            this.setData({
              jobList: []
            });
            //console.log("无匹配")
          }else{
            console.log("无匹配");
            // console.log(this.data.jobList);
            // console.log(jobCity.length==0)
          }
          
        }
      }
  },
})
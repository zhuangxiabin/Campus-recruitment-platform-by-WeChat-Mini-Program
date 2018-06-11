const app = getApp();
Page({
  data: {
    showTopTips: false,
    introductionNum: 7,
    sexy: ['男', '女'],
    index: '',
    xueli: ['大专', '本科', '硕士', '博士', '其他'],
    xueliIndex: '',
    work: ['应届毕业生', '1年', '2年', '3年', '4年', '5年', '5年以上'],
    workIndex: '',
    truthName: "",
    sex: '',
    birthday: '',
    education: '',
    worklife: '',
    phoneNum: '',
    email: '',
    introduce: '',
    isAgree: false
  },
  onLoad: function (options){
    const moment = require("../utils/moment-timezone-with-data.js");
    var that = this;
    console.log('openId传递成功',options.openId);
    that.setData({
      openId: options.openId
    })
    console.log("userInfo page openid is", that.data.openId)
    wx.request({
      url: app.globalData.getUserInfo,
      data: {
        openid: that.data.openId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        console.log(res.data[0]);
        var date = res.data[0].user_birthday;
        //UTC转换
        var localdate = moment(date).format('YYYY-MM-DD')
        that.setData({
          truthName: res.data[0].user_name,
          sex: res.data[0].user_sex,
          birthday: localdate,
          education: res.data[0].user_edu,
          worklife: res.data[0].user_worklife,
          phoneNum: res.data[0].user_phone,
          email: res.data[0].user_email,
          introduce: res.data[0].user_introduce,
        })
      },
      fail: function () {
        //wx.hideLoading();
        console.log("get fail");//数据获取失败
      },
      complete: function () {
        // complete
        // console.log(typeof (that.data.jobList));
        // console.log(typeof (e.currentTarget.dataset.type));
        // wx.navigateTo({
        //   url: '../search/search?List=' + JSON.stringify(that.data.jobList) + "&searchValue=" + e.currentTarget.dataset.type,
        // })
      }

    })
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    var sex = this.data.sexy[e.detail.value];

    this.setData({
      index: e.detail.value,
      sex: sex
    })
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
  bindworkChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    var worklife = this.data.work[e.detail.value];
    this.setData({
      worklife: worklife,
      workIndex: e.detail.value
    })
    console.log(this.data.worklife);
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      birthday: e.detail.value
    })
    console.log(this.data.date)
  },
  inputNames: function (e) {
    console.log(e.detail.value);
    this.setData({
      truthName: e.detail.value
    })
  },
  inputPhone: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  inputEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  inputIntroduce: function (e) {
    var introduce = e.detail.value;
    var introductionNum = introduce.length
    this.setData({
      introductionNum: introductionNum,
      introduce: introduce
    })
  },
  // 电话号码校验
  checkTel:function(tel) {
    var mobile = /^[1][3,4,5,7,8][0-9]{9}$/, phone = /^0\d{2,3}-?\d{7,8}$/;
    return mobile.test(tel) || phone.test(tel);
  },
  // 校验电子邮箱
  isEmail:function(mail) {  
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;  
    if(filter.test(mail)) {
      return true;
    } else {  
      return false;  
    }
  },




  showTopTips: function (e) {
    //console.log(this.data);
    var that = this;
    var userInfo = {
      openId:this.data.openId,
      truthName: this.data.truthName,
      sex: this.data.sex,
      birthday: this.data.birthday,
      education: this.data.education,
      worklife: this.data.worklife,
      phoneNum: this.data.phoneNum,
      email: this.data.email,
      introduce: this.data.introduce,
    };
    console.log(userInfo.birthday=='');
    if (userInfo.truthName == '' || userInfo.sex == '' || userInfo.birthday == '' || userInfo.education == '' || userInfo.worklife == '' || userInfo.phoneNum == '' || userInfo.email == '' || userInfo.introduce == ''){
      // var that = this;
      that.setData({
        showTopTips: true,
        tips:'请全填'
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000)
    }else{
        // 校验电话号码
      if (that.checkTel(userInfo.phoneNum)){
        console.log("电话号码正确");
        if (that.isEmail(userInfo.email)){
        console.log('电子邮箱正确')
        //发起请求
        console.log(userInfo);
        var that = this;
        wx.request({
          url: app.globalData.insertUserInfo,
          data: {
            userInfo:userInfo
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: (res) => {
            console.log(res);
            if(res.data){
              wx.showToast({
                title: '已完成',
                icon: 'success',
                duration: 3000
              });
            }else{
              wx.showToast({
                title: '操作失败',
                icon: 'loading',
                duration: 3000
              });
            }
            // if (res.data.havedone) {
            //   that.setData({
            //     jobList: []
            //   })
            // } else {
            //   that.setData({
            //     jobList: res.data
            //   })
            // }
          },
          fail: function () {
            //wx.hideLoading();
            console.log("get fail");//数据获取失败
          },
          complete: function () {
            // complete
            // console.log(typeof (that.data.jobList));
            // console.log(typeof (e.currentTarget.dataset.type));
            // wx.navigateTo({
            //   url: '../search/search?List=' + JSON.stringify(that.data.jobList) + "&searchValue=" + e.currentTarget.dataset.type,
            // })
          }

        })
        }else{
          that.setData({
            showTopTips: true,
            tips: '电子邮箱不正确'
          });
          setTimeout(function () {
            that.setData({
              showTopTips: false
            });
          }, 3000)
        }
      }else{
        that.setData({
          showTopTips: true,
          tips: '电话号码不正确'
        });
        setTimeout(function () {
          that.setData({
            showTopTips: false
          });
        }, 3000)
      }
    }
    //   var that = this;
    //   this.setData({
    //     showTopTips: true
    //   });
    //   setTimeout(function () {
    //     that.setData({
    //       showTopTips: false
    //     });
    //   }, 3000);
  },

});
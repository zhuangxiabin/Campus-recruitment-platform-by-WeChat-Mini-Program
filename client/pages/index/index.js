//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../utils/util.js')
const app = getApp()
Page({
  data: {
    userInfo: {},
    logged: false,
    hiddenmodalput: true,
    flag:true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    console.log(app.globalData.userInfo)
    console.log(this.data.canIUse)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        logged:true
      })
    } else if (this.data.canIUse) {
      this.setData({
        flag: false
      })
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    var that =this
    console.log('获取用户信息成功，未写入数据库',e)
    //判断用户是否同意授权
    if (e.detail.userInfo){
      util.showBusy('获取中')
      app.globalData.userInfo = e.detail.userInfo,
      console.log()
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        logged: true
      }),
        qcloud.login({
          success(result) {
            util.showSuccess('登录成功');
            that.setData({
              userInfo: result,
              logged: true
            })
            console.log('first login', result)
          },

          fail(error) {
            util.showModel('登录失败', error)
            console.log('登录失败', error)
          }
        })
    }else{
      //如果用户拒绝授权
      this.setData({
        logged:false,
        hasUserInfo: false,
        // flag:false
      })
    }
    
    
    console.log(this.data.userInfo)
  },


  // 用户登录
  login: function () {
    console.log(this.data.logged)
    if (!this.data.logged){
      this.setData({
        flag: false
      })
    }else{

    util.showBusy('获取中')
    var that = this

    // 调用登录接口
    qcloud.login({

      success(result) {
        if (result) {
          util.showSuccess('登录成功');

          that.setData({
            userInfo: result,
            logged: true
          })
          console.log('first login',result)
        } else {
          //console.log(result)
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('完成')
              console.log('request success', result)
              that.setData({
                userInfo: result.data.data,
                openId: result.data.data.openId,
                logged: true
              })
              wx.navigateTo({
                url: '../resume/resume?openId='+that.data.openId,
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
    }
  },
  // 退出当前账号，数据未清除
  signout: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      logged: false,
      hiddenmodalput: true
    })
    wx.clearStorage()
  },
  show: function(){
    this.setData({
      flag:false
    })
  },
  hide:function(){
    this.setData({
      flag: true
    })
  },

  // 扫一扫
  toScanCode:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        var id = res.result;
        wx.navigateTo({
          url: '../detail/detail?id=' + id,
        })
      }
    })
  },
  //我的收藏
  movieToCollection:function(e){
    wx.navigateTo({
      url: '../collection/collection',
    })
  },
  //客服功能
  movieToContact:function(){
    wx.navigateTo({
      url: '../contact/contact',
    })
  },
  //关于我们
  movieToAboutus:function(){
    wx.navigateTo({
      url: '../about/about',
    })
  }
})

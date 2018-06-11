Page({
  data: {
    list: [
      {
        id: 'user',
        name: '编辑用户信息',
        open: false,
        pages: ['button', 'list', 'input', 'slider', 'uploader']
      },
      {
        id: 'intention',
        name: '求职意向',
        open: false,
        pages: ['article', 'badge', 'flex', 'footer', 'gallery', 'grid', 'icons', 'loadmore', 'panel', 'preview', 'progress']
      },
      {
        id: 'practice',
        name: '实习经历',
        open: false,
        pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
      },
      {
        id: 'edu',
        name: '教育经历',
        open: false,
        pages: ['navbar', 'tabbar']
      },
      {
        id: 'skill',
        name: '技能评价',
        open: false,
        pages: ['searchbar']
      }
    ],
    openId:''
  },
  onLoad:function(options){
    console.log('openId传递成功', options.openId);
    this.setData({
      openId: options.openId
    })
    console.log("userInfo page openid is", this.data.openId)

  },

  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  naviTouser: function (e) {
    wx.navigateTo({
      url: '../userInfo/userInfo?openId=' + this.data.openId,
    })
    console.log(e);
  },
  naviTointention: function (e) {
    wx.navigateTo({
      url: '../intention/intention?openId=' + this.data.openId,
    })
    console.log(e);
  },
  naviTopractice: function (e) {
    wx.navigateTo({
      url: '../practice/practice?openId=' + this.data.openId,
    })
    console.log(e);
  },
  naviToedu: function (e) {
    wx.navigateTo({
      url: '../edu/edu?openId=' + this.data.openId,
    })
    
    console.log(e);
  },
  naviToskill: function (e) {
    wx.navigateTo({
      url: '../skill/skill?openId=' + this.data.openId,
    })
    console.log(e);
  },
});

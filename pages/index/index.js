// pages/index/index.js
const app = getApp()

Page({
  data: {
    overviewImage: ''
  },

  onLoad() {
    // 设置小区平面图
    this.setData({
      overviewImage: app.globalData.overviewImage
    })
  },

  onShow() {
    // 页面显示时的逻辑
    console.log('首页显示')
  },

  // 预览小区平面图
  previewOverview() {
    wx.previewImage({
      current: this.data.overviewImage,
      urls: [this.data.overviewImage],
      success: () => {
        console.log('预览图片成功')
      },
      fail: (err) => {
        console.error('预览图片失败', err)
        wx.showToast({
          title: '图片加载失败',
          icon: 'none'
        })
      }
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '徐桥嘉苑（南苑）安置房 - 小区平面图',
      path: '/pages/index/index',
      imageUrl: this.data.overviewImage
    }
  },

  // 分享图片
  shareImage() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    wx.showToast({
      title: '请点击右上角分享',
      icon: 'none'
    })
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '徐桥嘉苑（南苑）安置房 - 小区平面图',
      imageUrl: this.data.overviewImage
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
})
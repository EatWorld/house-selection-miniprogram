// pages/notice/notice.js
const noticesData = require('../../data/notices.js')

Page({
  data: {
    notices: [],
    loading: true,
    useCloudData: true // 是否使用云数据库
  },

  async onLoad() {
    console.log('选房通知页面加载')
    await this.loadNotices()
  },

  // 加载通知数据
  async loadNotices() {
    if (this.data.useCloudData) {
      await this.loadFromCloud()
    } else {
      this.loadFromLocal()
    }
  },

  // 从云数据库加载通知
  async loadFromCloud() {
    try {
      wx.showLoading({ title: '加载通知中...' })
      
      const db = wx.cloud.database()
      const result = await db.collection('notices')
        .where({ status: 'active' })
        .orderBy('sort', 'asc')
        .get()
      
      if (result.data && result.data.length > 0) {
        this.setData({
          notices: result.data,
          loading: false
        })
        
        // 缓存到本地存储
        wx.setStorageSync('notices_cache', {
          data: result.data,
          timestamp: Date.now()
        })
        console.log('从云数据库加载通知成功')
      } else {
        // 云数据库没有数据，使用本地配置
        this.loadFromLocal()
      }
    } catch (error) {
      console.error('从云数据库加载通知失败:', error)
      // 尝试使用缓存数据
      const cache = wx.getStorageSync('notices_cache')
      if (cache && cache.data) {
        console.log('使用缓存数据')
        this.setData({
          notices: cache.data,
          loading: false
        })
      } else {
        // 缓存也没有，使用本地配置文件
        console.log('使用本地配置文件')
        this.loadFromLocal()
      }
    } finally {
      wx.hideLoading()
    }
  },

  // 从本地配置文件加载通知
  loadFromLocal() {
    console.log('从本地配置文件加载通知')
    this.setData({
      notices: noticesData.notices,
      loading: false
    })
  },

  onShow() {
    console.log('选房通知页面显示')
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '徐桥嘉苑（南苑）安置房 - 选房通知',
      path: '/pages/notice/notice'
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '徐桥嘉苑（南苑）安置房 - 选房通知'
    }
  },

  // 下拉刷新
  async onPullDownRefresh() {
    console.log('下拉刷新通知数据')
    await this.loadNotices()
    wx.stopPullDownRefresh()
  },

  // 点击通知卡片
  onNoticeClick(e) {
    const noticeId = e.currentTarget.dataset.id
    const notice = this.data.notices.find(item => item.id == noticeId)
    
    if (notice) {
      wx.showModal({
        title: notice.title,
        content: notice.content || notice.summary,
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#007AFF'
      })
    }
  }
})
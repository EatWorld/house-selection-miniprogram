// pages/buildings/buildings.js
const app = getApp()

Page({
  data: {
    buildings: []
  },

  onLoad() {
    // 获取楼栋数据
    this.setData({
      buildings: app.globalData.buildings
    })
  },

  onShow() {
    console.log('楼栋页面显示')
  },

  // 查看户型图
  viewFloorPlan(e) {
    const building = e.currentTarget.dataset.building
    
    // 显示加载提示
    wx.showLoading({
      title: '加载中...'
    })

    // 预览户型图
    wx.previewImage({
      current: building.image,
      urls: [building.image],
      success: () => {
        console.log('预览户型图成功', building.name)
        wx.hideLoading()
      },
      fail: (err) => {
        console.error('预览户型图失败', err)
        wx.hideLoading()
        wx.showToast({
          title: '图片加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    })

    // 统计点击事件
    this.trackBuildingView(building)
  },

  // 统计楼栋查看次数
  trackBuildingView(building) {
    try {
      const viewHistory = wx.getStorageSync('building_views') || {}
      const buildingId = building.id.toString()
      
      if (!viewHistory[buildingId]) {
        viewHistory[buildingId] = {
          name: building.name,
          count: 0,
          lastView: null
        }
      }
      
      viewHistory[buildingId].count += 1
      viewHistory[buildingId].lastView = new Date().toISOString()
      
      wx.setStorageSync('building_views', viewHistory)
      console.log('统计数据已保存', viewHistory)
    } catch (err) {
      console.error('保存统计数据失败', err)
    }
  },

  // 长按楼栋卡片显示详细信息
  onBuildingLongPress(e) {
    const building = e.currentTarget.dataset.building
    
    wx.showModal({
      title: building.name,
      content: `户型信息：${building.details}\n\n点击确定查看户型图`,
      confirmText: '查看户型图',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.viewFloorPlan(e)
        }
      }
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '徐桥嘉苑（南苑）安置房 - 楼栋户型',
      path: '/pages/buildings/buildings'
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '徐桥嘉苑（南苑）安置房 - 楼栋户型'
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    // 重新加载数据
    this.setData({
      buildings: app.globalData.buildings
    })
    
    setTimeout(() => {
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '刷新完成',
        icon: 'success',
        duration: 1000
      })
    }, 1000)
  }
})
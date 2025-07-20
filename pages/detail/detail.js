// pages/detail/detail.js
const app = getApp()

Page({
  data: {
    buildingInfo: {},
    buildingFeatures: []
  },

  onLoad(options) {
    // 从参数或全局数据获取楼栋信息
    let buildingInfo = {}
    
    if (options.id) {
      // 通过ID查找楼栋信息
      const buildings = app.globalData.buildings
      buildingInfo = buildings.find(b => b.id == options.id) || {}
    } else if (options.name && options.image) {
      // 通过参数构建楼栋信息
      buildingInfo = {
        name: decodeURIComponent(options.name),
        image: decodeURIComponent(options.image),
        details: options.details ? decodeURIComponent(options.details) : '',
        color: options.color || '#007AFF'
      }
    }

    // 设置楼栋特色信息
    const features = this.getBuildingFeatures(buildingInfo.name)
    
    this.setData({
      buildingInfo,
      buildingFeatures: features
    })

    // 设置页面标题
    wx.setNavigationBarTitle({
      title: buildingInfo.name || '户型详情'
    })
  },

  // 获取楼栋特色信息
  getBuildingFeatures(buildingName) {
    const featuresMap = {
      '一二三四号楼': [
        { icon: '🏠', text: '标准户型，布局合理' },
        { icon: '🌳', text: '绿化环境优美' },
        { icon: '🚗', text: '停车位充足' }
      ],
      '五六号楼': [
        { icon: '🏢', text: '大户型设计，空间宽敞' },
        { icon: '🌅', text: '采光通风良好' },
        { icon: '🛒', text: '生活配套便利' }
      ],
      '七八九十号楼': [
        { icon: '🏘️', text: '多样化户型选择' },
        { icon: '🎯', text: '性价比高' },
        { icon: '🚌', text: '交通便利' }
      ]
    }
    
    return featuresMap[buildingName] || []
  },

  // 预览户型图
  previewImage() {
    if (!this.data.buildingInfo.image) {
      wx.showToast({
        title: '图片不存在',
        icon: 'none'
      })
      return
    }

    wx.previewImage({
      current: this.data.buildingInfo.image,
      urls: [this.data.buildingInfo.image],
      success: () => {
        console.log('预览户型图成功')
      },
      fail: (err) => {
        console.error('预览户型图失败', err)
        wx.showToast({
          title: '图片加载失败',
          icon: 'none'
        })
      }
    })
  },

  // 分享户型图
  shareImage() {
    wx.showActionSheet({
      itemList: ['分享给朋友', '保存到相册'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 分享给朋友
          this.shareToFriend()
        } else if (res.tapIndex === 1) {
          // 保存到相册
          this.saveToAlbum()
        }
      }
    })
  },

  // 分享给朋友
  shareToFriend() {
    // 触发分享
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // 保存到相册
  saveToAlbum() {
    wx.downloadFile({
      url: this.data.buildingInfo.image,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
          fail: () => {
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            })
          }
        })
      },
      fail: () => {
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        })
      }
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: `${this.data.buildingInfo.name} - 户型图`,
      path: `/pages/detail/detail?name=${encodeURIComponent(this.data.buildingInfo.name)}&image=${encodeURIComponent(this.data.buildingInfo.image)}`,
      imageUrl: this.data.buildingInfo.image
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: `${this.data.buildingInfo.name} - 户型图`,
      imageUrl: this.data.buildingInfo.image
    }
  }
})
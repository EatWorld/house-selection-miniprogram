// app.js
App({
  onLaunch() {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'images11-7g2qku1i1f5f6949', // 请替换为您的云开发环境ID
        traceUser: true,
      })
    }
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功', res.code)
      }
    })
  },
  
  globalData: {
    userInfo: null,
    // 云存储图片URL
    overviewImage: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/overview.jpg',
    buildings: [
      { id: 1, name: '一号楼', details: '90/90/90/90', image: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/building-1-4.jpg', color: '#FF6B6B' },
      { id: 2, name: '二号楼', details: '90/90/90/90', image: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/building-1-4.jpg', color: '#4ECDC4' },
      { id: 3, name: '三号楼', details: '90/90/90/90', image: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/building-1-4.jpg', color: '#45B7D1' },
      { id: 4, name: '四号楼', details: '90/90/90/90', image: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/building-1-4.jpg', color: '#96CEB4' },
      { id: 5, name: '五号楼', details: '135/90/90/135', image: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/building-5-6.jpg', color: '#FFEAA7' },
      { id: 6, name: '六号楼', details: '135/90/90/135', image: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/building-5-6.jpg', color: '#DDA0DD' },
      { id: 7, name: '七号楼', details: '90/45/45/90', image: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/building-7-10.jpg', color: '#98D8C8' },
      { id: 8, name: '八号楼', details: '90/45/45/90', image: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/building-7-10.jpg', color: '#F7DC6F' },
      { id: 9, name: '九号楼', details: '90/45/45/90', image: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/building-7-10.jpg', color: '#BB8FCE' },
      { id: 10, name: '十号楼', details: '90/45/45/90', image: 'cloud://images11-7g2qku1i1f5f6949.696d-images11-7g2qku1i1f5f6949-1370080334/building-7-10.jpg', color: '#85C1E9' }
    ]
  }
})
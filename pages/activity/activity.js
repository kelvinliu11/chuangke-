import util from './../../utils/util.js';
// pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: [],
    sortindex:0,  //排序索引
    sortid:null,  //排序id
    activitylist:[], //会议室列表列表
    page: 0,  //分页
    scrolltop:null //滚动位置
  },

  fetchSortData:function(){ //获取筛选条件
    this.setData({
      "sort": [
          {
              "id": 0,
              "title": "热门点击"
          },
          {
              "id": 1,
              "title": "最新发布"
          },
          {
              "id": 2,
              "title": "最多参与"
          },
      ]
    })
  },
  fetchConferenceData:function(){  //获取会议室列表
    console.log("fetchConferenceData，加上新数据")
    const perpage = 10;
    this.setData({
      page:this.data.page+1
    })
    const page = this.data.page;
    const newlist = [];
    for (var i = (page-1)*perpage; i < page*perpage; i++) {
      newlist.push({
        "id":i+1,
        "name":"云栖技术分享日（云栖TechDay"+(i+1)+"）",
        "status": util.getRandomArrayElement(["进行中","报名中","已结束"]),
        "time": "2016/07/12 14:00",
        "coments": Math.floor(Math.random()*1000),
        "address":"杭州云栖小镇咖啡馆  （杭州云计算产业园内）",
        "imgurl":"../../images/banner_02.jpg"
      })
    }
    this.setData({
      activitylist:this.data.activitylist.concat(newlist)
    })
  },

  setSortBy:function(e){ //选择排序方式
    const d= this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      sortindex:dataset.sortindex,
      sortid:dataset.sortid
    })
    console.log('排序方式id：'+this.data.sortid);
  },
  goToTop:function(){ //回到顶部
    this.setData({
      scrolltop:0
    })
  },
  /** 
   * 这个还不清楚是什么作用
  */
  scrollHandle:function(e){ //滚动事件
    this.setData({
      scrolltop:e.detail.scrollTop
    })
  },
  scrollLoading:function(){ //滚动加载
    console.log("scrollLoading")
    this.fetchConferenceData();
  },
  onPullDownRefresh:function(){ //下拉刷新
    this.setData({
      page:0,
      activitylist:[]
    })
    this.fetchConferenceData();
    this.fetchSortData();
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchConferenceData();
    this.fetchSortData();
  },
})
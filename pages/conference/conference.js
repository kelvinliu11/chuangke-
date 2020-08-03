import util from './../../utils/util.js';
Page({
  data: {
    filterdata:{},  //筛选条件数据
    showfilter:false, //是否显示下拉筛选
    showfilterindex:null, //显示哪个筛选类目
    sortindex:0,  //排序索引
    sortid:null,  //排序id
    filter:{},
    conferencelist:[], //会议室列表列表
    scrolltop:null, //滚动位置
    page: 0,  //分页,
    choosedEquipments: {0:false} // 这个是用来标识选中了哪些设备并且只是样式渲染作用（数据已经包含在了filter里面）。主要是不确定如何在wxml中使用indexOf函数，待后续优化
  },

  fetchFilterData:function(){ //获取筛选条件
    this.setData({
      filterdata:{
        "sort": [
            {
                "id": 0,
                "title": "价格最低"
            },
            {
                "id": 1,
                "title": "容量最多"
            },
            {
                "id": 2,
                "title": "设备最全"
            },
        ],
        "contain": [
            {
                "id": 0,
                "title": "4人以下"
            },
            {
                "id": 1,
                "title": "5-8人"
            },
            {
                "id": 2,
                "title": "8-12人"
            },
             {
                "id": 3,
                "title": "12-20人"
            },
            {
                "id": 4,
                "title": "20人以上"
            },
        ],
        "equipments": [
            {
                "id": 0,
                "title": "投影仪"
            },
            {
                "id": 1,
                "title": "欢迎屏"
            },
            {
                "id": 2,
                "title": "视屏设备"
            },
            {
                "id": 3,
                "title": "电话会议设备"
            },
            {
                "id": 4,
                "title": "钢笔"
            },
            {
                "id": 5,
                "title": "麦克风"
            },
        ],
      }
    })
  },
  fetchConferenceData:function(){  //获取会议室列表
    const perpage = 10;
    this.setData({
      page:this.data.page+1
    })
    const page = this.data.page;
    const newlist = [];
    for (var i = (page-1)*perpage; i < page*perpage; i++) {
      newlist.push({
        "id":i+1,
        "name":"A区会议室"+(i+1),
        "contain": Math.floor(Math.random()*50),
        "area": Math.floor(Math.random()*(200-20)+20),
        "price" : Math.floor(Math.random()*50)*10,
        "equipments":util.getRandomArray(["投影仪","欢迎屏","视屏设备","电话会议设备","钢笔","麦克风"],Math.floor(Math.random()*6)),
        "imgurl":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3390669789,3215835488&fm=26&gp=0.jpg"
      })
    }
    this.setData({
      conferencelist:this.data.conferencelist.concat(newlist)
    })
  },
  setFilterPanel: function(e){ //展开筛选面板
    const d = this.data;
    const i = e.currentTarget.dataset.findex;
    if(d.showfilterindex == i){
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    }else{    
      this.setData({
        showfilter: true,
        showfilterindex:i,
      })
    }
  },
  setSort:function(e){ //选择排序方式
    const d= this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      sortindex:dataset.sortindex,
      sortid:dataset.sortid
    })
    console.log('排序方式id：'+this.data.sortid);
  },
  hideFilter: function(){ //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
  },
  chooseContain:function(e){  //选择会议室容纳人数
    this.setData({
      filter: Object.assign({},this.data.filter,{
        containid:e.currentTarget.dataset.id
      })
    })
    console.log('选择的会议室容量id：'+this.data.filter.containid);
  },
  chooseEquipment:function(e){  //选择会议室设备
    const equipments = this.data.filter.equipments || [];
    const eid = e.currentTarget.dataset.id;
    var choosedEquipments = this.data.choosedEquipments;
    choosedEquipments[eid] = choosedEquipments[eid] == true ? false : true;
    this.setData({
      choosedEquipments: choosedEquipments,
      filter: Object.assign({},this.data.filter,{
        equipments:equipments.indexOf(eid)>-1 ? equipments.filter(i=>i!=eid):equipments.concat([eid])
      })
    })
    console.log('选择的会议室设备id：'+this.data.filter.equipments);
  },
  inputStartTime:function(e){
    var filter = this.data.filter;
    filter.starttime = e.detail.value;
    // this.setData({filter: filter});// 这里不确定是什么情况，当输入任何一个数字的时候，输入框会被清空，但是data里的starttime是有数据的，所以只能先不设置，此时，数据其实也已经在data.filter中存在了。

    // this.setData({
    //   filter: Object.assign({},this.data.filter,{
    //     // starttime:e.detail.value
    //   })
    // })  //输入会议开始时间
  },
  inputEndTime:function(e){
    var filter = this.data.filter;
    filter.endtime = e.detail.value;
    // this.setData({filter: filter});
    // this.setData({
    //   filter: Object.assign({},this.data.filter,{
    //     endtime:e.detail.value
    //   })
    // })  //输入会议结束时间
  },
  cleanFilter:function(){ //清空筛选条件
    this.setData({
      filter:{},
      choosedEquipments:{},
    })
  },
  submitFilter:function(){ //提交筛选条件
    console.log(this.data.filter);
  },

  onLoad: function (options) {
    this.fetchConferenceData();
    this.fetchFilterData();
  },

  
  // 滚动相关事件
  scrollHandle:function(e){ //滚动事件
    this.setData({
      scrolltop:e.detail.scrollTop
    })
  },
  goToTop:function(){ //回到顶部
    this.setData({
      scrolltop:0
    })
  },
  scrollLoading:function(){ //滚动加载
    this.fetchConferenceData();
  },
  onPullDownRefresh:function(){ //下拉刷新
    this.setData({
      page:0,
      conferencelist:[]
    })
    this.fetchConferenceData();
    this.fetchFilterData();
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },1000)
  }
})
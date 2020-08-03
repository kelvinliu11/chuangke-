import util from './../../utils/util.js';
Page({

  data: {
    showfootertab:0,  //底部标签页索引
    questions:[], //问题列表
    tabnav:{},  //顶部选项卡数据
    showtab:0,  //顶部选项卡索引
    showtabtype:'', //选中类型
  },

  showTab:function(e){  //切换选项卡
    const eindex = e.currentTarget.dataset.index;
    if(eindex==1 && !this.data.questions){
      console.log("text");
    }
    wx.setNavigationBarTitle({
      title:eindex==1?"常见问题":"问题反馈"
    })
    this.setData({
      showfootertab:eindex
    });
  },
  fetchQuestions:function(){  //获取问题列表
    const newquestions = [];
    for (let i = 0; i < 50; i++) {
      newquestions.push({
        "id":i+1,
        "type": util.getRandomArrayElement(["A","B","C","D"]),
        "q":"意外保护服务内容是什么-"+(i+1)+"？",
        "a":"服务名称适用品类服务实施详情服务期限服务生效时间摔碰管修一年笔记本本服务有效期内，如客户的数码摄照产品在正常使用过程中由于不慎将产品坠落、挤压、碰撞，而产生的硬件故障，本服务将免费提供硬件维修或更换，使产品重新恢复正常运行。12个月购机满30天后开始生效摔碰管修两年笔记本、数码相机、摄像机、手机、小数码"
      })
    }
    this.setData({
      questions:newquestions,
      questionsall:newquestions
    })
  },
  setTab:function(e){ //设置选项卡选中索引
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: edata.tabindex,// 当前是选中第几个tab，即index
      showtabtype: edata.type,// 这个貌似没有用到
      questions: !edata.type ? this.data.questionsall:this.data.questionsall.filter(l=>l.type === edata.type),
      showquestionindex: this.data.showtab==edata.tabindex?this.data.showquestionindex:null
    })
  },
  foldQuestion:function(e){ //点击问题列表的问题，展开收起效果，展开会把问题的A部分全部展开
    const eindex = e.currentTarget.dataset.qindex;
    const oldqindex = this.data.showquestionindex;
    this.setData({
      showquestionindex: eindex===oldqindex?null:eindex
    })
  },

  chooseImage:function() {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function(res) {
        if (!res.cancel) {
          if(res.tapIndex == 0){
            _this.chooseWxImage('album')
          }else if(res.tapIndex == 1){
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage:function(type){
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        _this.setData({
          uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths)
        })
      }
    })
  },
  editImage:function(){
    this.setData({
      editable: !this.data.editable
    })
  },
  deleteImg:function(e){
    
    // var fruits = ["Banana", "Orange", "Apple", "Mango"];
    // fruits.splice(2,1,"Lemon","Kiwi"); // Banana,Orange,Lemon,Kiwi,Mango
    // 但是这里好像不是这样的，splice(i,j)是从第i位置删除j个元素，并把删除了哪些元素返回回来
    // var indexRemove = 0
    // var testArr = [10,9,8]
    // console.log(testArr.splice(indexRemove,1))  // 输出10
    // console.log(testArr)  // 输出9,8

    var index = e.currentTarget.dataset.index
    var imgs = this.data.uploadimgs
    imgs.splice(index, 1) // 如果写成 imgs = imgs.splice(index, 1)也不对，因为splice是返回被删除的元素，imgs会踢掉呗删除的，留下的就是没删的
    this.setData({
      uploadimgs: imgs
    })
  },

  questionSubmit:function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    

    this.fetchQuestions();
    this.setData({
      tabnav:{
        tabnum:5,
        tabitem:[
          {
            "id":0,
            "type":"",
            "text":"全部"
          },
          {
            "id":1,
            "type":"A",
            "text":"服务咨询"
          },
          {
            "id":2,
            "type":"B",
            "text":"空间查询"
          },
          {
            "id":3,
            "type":"C",
            "text":"活动咨询"
          },
          {
            "id":4,
            "type":"D",
            "text":"入驻信息"
          }
        ]
      },
      uploadimgs:[]
    })
  },
})
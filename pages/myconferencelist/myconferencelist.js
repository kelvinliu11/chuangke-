Page({
  data: {
    reservelist:[]
  },
  onLoad: function () {
    this.fetchData();
  },
  fetchData:function(){
    this.setData({
      reservelist:[
        {
          "id": 1,
          "name": "张江第一会议室",
          "time": "2016/08/25 13:00",
          "reserver": "张先生",
          "imgurl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596455052202&di=1799a291c59b66cb540754420714f45e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fe24f765cbcfb19885047ec424b432d840ee03217.jpg"
        },
        {
          "id": 2,
          "name": "方糖小镇会议室",
          "time": "2016/08/25 13:00",
          "reserver": "张先生",
          "imgurl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596455052202&di=1799a291c59b66cb540754420714f45e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fe24f765cbcfb19885047ec424b432d840ee03217.jpg"
        },
        {
          "id": 3,
          "name": "盛大研发中心会议室",
          "time": "2016/08/25 13:00",
          "reserver": "张先生",
          "imgurl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596455052202&di=1799a291c59b66cb540754420714f45e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fe24f765cbcfb19885047ec424b432d840ee03217.jpg"
        },
        {
          "id": 4,
          "name": "科创中心会议室",
          "time": "2016/08/25 13:00",
          "reserver": "张先生",
          "imgurl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596455052202&di=1799a291c59b66cb540754420714f45e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fe24f765cbcfb19885047ec424b432d840ee03217.jpg"
        },
        {
          "id": 5,
          "name": "长三角创业会会议室",
          "time": "2016/08/25 13:00",
          "reserver": "张先生",
          "imgurl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596455052202&di=1799a291c59b66cb540754420714f45e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fe24f765cbcfb19885047ec424b432d840ee03217.jpg"
        },
        {
          "id": 6,
          "name": "长阳谷优客工场会议室",
          "time": "2016/08/25 13:00",
          "reserver": "张先生",
          "imgurl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596455052202&di=1799a291c59b66cb540754420714f45e&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Fe24f765cbcfb19885047ec424b432d840ee03217.jpg"
        }
      ]
    })
  }
})

// 0 引入 用来发送请求的 方法 一定要把路径补全
import { request } from "../../request/index.js";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        catesList:[],
        floorList:[]
    },
    /**
     * 生命周期函数--监听页面加载
     * 页面加载就会触发
     */
    onLoad: function (options) {
        //发送异步请求，获取轮播图数据 优化的手段可以通过es6的 promise来解决这个问题
       /* wx - wx.request({
             //这个url导入的路径是其他人给的，想要变换图片需要在修改
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
            success: (result) => {
                this.setData({
                    swiperList: result.data.message
                })

            },
        })
        */
        this.getSwiperList();
        this.getCatesList();
        this.getFloorList();
    },
    //获取轮播图数据
    getSwiperList(){
        //promise形式下的展现模式，通过导入最开始的内容，跟外部文件进行集合，可以更清楚的呈现代码的形式
        request({url:"/home/swiperdata"})
            .then(result=>{
                this.setData({
                    swiperList: result.data.message
                })
            })
    },
    //获取分类数据
    getCatesList(){
        //promise形式下的展现模式，通过导入最开始的内容，跟外部文件进行集合，可以更清楚的呈现代码的形式
        request({url:"/home/catitems"})
            .then(result=>{
                this.setData({
                    catesList: result.data.message
                })
            })
    },
    //获取楼层数据
    getFloorList(){
        //promise形式下的展现模式，通过导入最开始的内容，跟外部文件进行集合，可以更清楚的呈现代码的形式
        request({url:"/home/floordata"})
            .then(result=>{
                this.setData({
                    floorList: result.data.message
                })
            })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
// pages/category/index.js
import {request} from "../../request/index.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧的菜单数据
        leftMenuList:[],
        // 右侧的商品数据
        rightContent: [],
        // 被点击的左侧的菜单
        currentIndex: 0,
        // 右侧内容的滚动条距离顶部的距离
        scrollTop: 0
    },
    // 接口的返回数据
    Cates: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /*
            0 web中的本地存储和 小程序中的本地存储的区别
              1 写代码的方式不一样了
                web: localStorage.setItem("key","value") localStorage.getItem("key")
            小程序中: wx.setStorageSync("key", "value"); wx.getStorageSync("key");
              2:存的时候 有没有做类型转换
                web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
              小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型
            1 先判断一下本地存储中有没有旧的数据
              {time:Date.now(),data:[...]}
            2 没有旧数据 直接发送新请求
            3 有旧的数据 同时 旧的数据也没有过期 就使用 本地存储中的旧数据即可
             */


        this.getCates()
    },
    //获取分类数据
    getCates() {
        request({
            url: "/categories"
        })
            .then(res => {
                //相当于里面有数值了
                this.Cates=res.data.message;
                //构造左侧的大菜单数据
                let leftMenuList = this.Cates.map(v =>v.cat_name);
                //构造左侧的大菜单数据
                let rightContent = this.Cates[0].children;
                this.setData({
                    //回调获取
                    leftMenuList,
                    rightContent
                })
            })
    },
    //左侧菜单的点击事件
    handleItemTap(e){
        //特别重要的一点
        /*
            1 获取被点击的标题身上的索引
            2 给data中的currentIndex赋值就可以了
            3 根据不同的索引来渲染右侧的商品内容
            //相当于解放全部的属性值
             */
        const { index } = e.currentTarget.dataset;

        let rightContent = this.Cates[index].children;
        this.setData({
            currentIndex: index,
            rightContent,
            // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
            scrollTop: 0
        })
    }


})
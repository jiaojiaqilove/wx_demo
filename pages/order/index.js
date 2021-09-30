
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

     /**
      * 页面的初始数据
      */
     data: {
          tabs: [
               {
                    id: 0,
                    value: "全部",
                    isActive: true
               },
               {
                    id: 1,
                    value: "待付款",
                    isActive: false
               },
               {
                    id: 2,
                    value: "代发货",
                    isActive: false
               },
               {
                    id: 1,
                    value: "退款/退货",
                    isActive: false
               }
               ]
     },
     onShow(options){


          // 1 获取当前的小程序的页面栈-数组 长度最大是10页面
          let pages = getCurrentPages();
// 2 数组中 索引最大的页面就是当前页面
          let currentPage = pages[pages.length - 1];
          console.log(currentPage.options)
          // 3 获取url上的type参数
          const { type } = currentPage.options;
// 4 激活选中页面标题 当 type=1 index=0
          this.getOrders(type);
     },
     // 获取订单列表的方法
     async getOrders(type) {
          const res = await request({ url: "/my/orders/all", data: { type } });
          console.log(res)
     },
     // 标题点击事件 从子组件传递过来
     handleTabsItemChange(e){
          // 1 获取被点击的标题索引
          const {index}=e.detail;
          // 2 修改源数组
          let {tabs}=this.data;
          tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
          // 3 赋值到data中
          this.setData({
               tabs
          })
     },


})
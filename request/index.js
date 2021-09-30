//用于连接url，十分重要的方法
// 同时发送异步代码的次数
let ajaxTimes=0;
export const request=(params)=>{
    // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
    let header={...params.header};
    if(params.url.includes("/my/")){
        // 拼接header 带上token
        header["Authorization"]=wx.getStorageSync("token");
    }

    ajaxTimes++;
// 显示加载中 效果
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    //定义公共的url
    // url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    // url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    const baseUrl= "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
    wx.request({
     ...params,
        url:baseUrl+params.url,
     success:(result)=>{
       resolve(result);
     },
     fail:(err)=>{
       reject(err);
     },
        complete:()=> {
         //在出现好多同时加载的时候，使用这个东西便可以实现一次加载即可
            ajaxTimes--;
            if (ajaxTimes===0){
         //关闭正在等待的图标
            wx.hideLoading();
            }
        }
    });
  })
}
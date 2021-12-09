// 当打开浏览器的时候清除缓存
localStorage.clear();

let detaillist = document.querySelector(".detaillist")
let nextBottom = document.querySelector(".nextBottom")
let nextouba = document.querySelector(".nextouba")
let rightdetail = document.querySelector(".rightdetail")

let showCont = document.querySelector(".showCont")
let despricer = document.querySelector(".despricer")
console.log("showCont",despricer);

// 登录后
let username = document.querySelector("#username")
let password = document.querySelector("#password")

let newParentTop = document.querySelector(".newParentTop")

let comeBtnback = document.querySelector(".comeBtnback")
let registrback = document.querySelector(".registrback")
let flag = false;
window.onload = function () {
    let res = location.search.match(/\?id=(\w+)/)
    console.log('res=', res);
    if (!res) {
        window.location.href("./list.html")
    }
    let id = res[1]
    pAjax({
        url: `https://muse.huaban.com/api/v2/services/${id}`,
    }).then((res) => {
        let res1 = JSON.parse(res);
        let str = "";
        let str2 = "";
        let str3 = "";
        res1.cover.forEach((item, index) => {
            return str += `
                         <dd style="width: 100%;height: 140px;
                         display:flex;flex-direction:column;
                         ">
                           <p style="height:50%;
                           line-height:105px;font-size:18px;color:#ddd;
                           ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;设计服务&nbsp;>>${res1.name}</p>
                           <p style="flex:1;font-size:26px;font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${res1.name}</p>
                            </dd>
                         <dd style="flex: 1;width: 100%;">
                    
                        <img src="https://muse-img.huabanimg.com/${item.key}" style="width:100%;height:100%" alt="">
                        
                      
                            </dd>
                        `
        })
        detaillist.innerHTML = str;

        res1.desc.forEach(({
            image
        }, index) => {
            // console.log('descitem',image);
            return str2 += `
                        <img src="https://muse-img.huabanimg.com/${image.key}"  alt="">
            `
        })
        nextBottom.innerHTML = str2;
        // console.log("res1.complete_in",res1.complete_in.number);
        res1.cover.forEach((item, index) => {
            console.log('item=',res1.created_at);
            console.log('responsetime',res1.user.extra.response_time);
            
            console.log('dateres=',JSON.parse(res));
            // console.log('thirds',thirds);
            let price;
            if (res1.price == 0) {
                price = "价格面议"
            } else {
                price = `￥${res1.price}/单`
            }
            return str3 += `
            <dd style="width: 100%;height: 30%;background-color: #ffffff;">
            <section style="display: flex;flex-direction: column;align-items: center;">
                <p style="height: 130px;width: 85%;border-bottom: 1px solid #ccc;">
                    <span style="height: 50%;
                    justify-content: center;align-items: flex-end;font-size: 30px;font-weight: bold;
                    ">${price}</span>
                    <span
                    style="justify-content: center;align-self: center;margin-top: 15px;font-size: 20px;
                    color: #aaa;
                    "
                    >基础服务价格<i style="color: darkgoldenrod;margin-left: 14px;font-style: normal;">了解更多</i></span>
                </p>
                <p style="width: 85%;height: 150px;display: flex;align-items: center;border-bottom: 1px solid #ccc;">
                <span
                style="font-size: 21px;color: #aaa;"
                >成交<br>评价</span>
                <span
                style="font-size: 21px;color: orange;width: 71%;display:flex;flex-direction:column;text-align:right"
                >
              <a style="color:orange">
               ${res1.order_count}
              </a>
              
               <a style="color:orange">
                    <i class="iconfont icon-wujiaoxing-" style="font-size:22px"></i>
                <i class="iconfont icon-wujiaoxing-" style="font-size:22px"></i>
                <i class="iconfont icon-wujiaoxing-" style="font-size:22px"></i>
                <i class="iconfont icon-wujiaoxing-" style="font-size:22px"></i>
                <i class="iconfont icon-wujiaoxing-" style="font-size:22px;"></i>
                   </a>
              
                </span>
                </p>
                <p style="width: 85%;height: 15%;display: flex;justify-content: center;align-items: center;">
               <button
               style="width: 100%;height: 60px;background-color: darkgoldenrod;margin-top: 50px;color: #ccc;font-size: 18px;"
               >点击购买</button>
                </p>
            </section>
            </dd>
            <dd style="margin-top: 20px;height: 30%;background-color: #ffffff;">
            <section style="display: flex;flex-direction: column;align-items: center;">
                <p
                style="width: 85%;height: 150px;border-bottom: 1px solid #ccc;
                display: flex;align-items: center;
                "
                >
                <img src="https://hbimg.huabanimg.com/${res1.user.avatar.key}_/both/70x70" alt="" style="width: 35%;height: 65%;">
                <span style="width: 150px;height: 65%;display: flex;flex-direction: column;">
                <i style="height: 50%;font-size: 24px;line-height: 60px;font-style: normal;text-align: center;">${res1.user.username}</i>
                <i style="width:100px;margin-left:10px;border-radious:5px;height: 50%;font-size: 17px;font-style: normal;line-height: 50px;background-color: #bbb;text-align: center;"><i class="iconfont icon-liaotian" style="font-size:22px"></i>聊天</i>
                </span>
                </p>
                <p
                style="width: 85%;height:150px;border-bottom: 1px solid #ccc;display: flex;flex-direction: column;
                font-size: 18px;color: #aaa;
                "
                >
                <span style="height: 50%;line-height: 110px;"><i class="iconfont icon-naozhong" style="font-size:18px;font-weight:bold"></i>&nbsp;平均响应时间<i style="width:60%;text-align:right;overflow:hidden">${transTime(res1.user.extra.response_time)}</i></span>
                <span style="height: 50%;line-height: 50px;"><i class="iconfont icon-shenfenzhengrenzheng" style="font-size:18px;font-weight:bold"></i>&nbsp;实名认证<i style="width:60%;text-align:right;overflow:hidden">已认证</i></span>
                </p>
                <p
                style="width: 85%;height: 180px;display: flex;justify-content: center;align-items: center;"
                >
                <span style="width: 100%;height: 80%;background-color: white;">${res1.user.desc}</span>
            </p>
            </section>
            </dd>
            <dd style="margin-top: 20px;height: 400px; background-color: #ffffff;">
            <section  style="display: flex;flex-direction: column;align-items: center;">
                <p style="width: 80%;height: 270px;border-bottom:  1px solid #ccc;display: flex;flex-direction: column;">
                <span style="height: 80px;display: flex;align-items: center;font-size: 18px;color: #aaa;">购买流程</span>
                <span style="padding: 12px 3px;display: flex;flex-wrap: wrap;font-size: 19px;width: 95%;">勾选服务项目进行购买后，填写需求订单，等待设计师确认；设计师确认订单后，需要您再次确认并付款；
                    您的付款将托管在美思平台，只有项目结束后得双方同意后，款项才会转到服务方账号。</span>
                </p>
                <p style="width: 80%;height: 129px;
                display: flex;flex-direction: column;
                ">
                <span style="height: 40%;font-size: 18px;color: #aaa;display: flex;align-items: flex-end;">还有疑问</span>
                <span style="flex: 1;font-size: 20px;margin-top: 10px;color: darkgoldenrod;">查看帮助文档&nbsp;|&nbsp;联系客服</span>
                </p>
            </section>
            </dd>
                        `
        })
        rightdetail.innerHTML = str3;
    })
    // 登录验证
    let resSubs = getCookie("username")
    console.log("resubsDetail",resSubs); 
    if(!resSubs){
        alert("您还未登录，请先登录！！")
        window.location.href ="./list.html";
    }else{
        newParentTop.style.display="flex";
        comeBtnback.innerHTML = "@"+resSubs;
        comeBtnback.style.borderBottom ="4px solid #aaa"
        comeBtnback.style.fontSize = "15px"
    }

    // 点击退出,回到主页
    registrback.onclick = function(){
        if(!flag){
            window.confirm("确定要退出吗？")
        }
            flag = false;
             deleteCookie("username");
        window.location.href="./list.html";
    }

}
// 回到顶部
// function myScroll(){
//     let topY=document.body.scrollTop||document.documentElement.scrollTop;

// }
// 点击显现
// showCont.onclick = function(e){

// }

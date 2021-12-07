"use strict";

// 当打开浏览器的时候清除缓存
localStorage.clear();
var detaillist = document.querySelector(".detaillist");
var nextBottom = document.querySelector(".nextBottom");
var nextouba = document.querySelector(".nextouba");
var rightdetail = document.querySelector(".rightdetail");
var showCont = document.querySelector(".showCont");
var despricer = document.querySelector(".despricer");
console.log("showCont", despricer); // 登录后

var username = document.querySelector("#username");
var password = document.querySelector("#password");
var newParentTop = document.querySelector(".newParentTop");
var comeBtnback = document.querySelector(".comeBtnback");
var registrback = document.querySelector(".registrback");
var flag = false;

window.onload = function () {
  var res = location.search.match(/\?id=(\w+)/);
  console.log('res=', res);

  if (!res) {
    window.location.href("./list.html");
  }

  var id = res[1];
  pAjax({
    url: "https://muse.huaban.com/api/v2/services/".concat(id)
  }).then(function (res) {
    console.log("res", res);
    var res1 = JSON.parse(res);
    console.log(res1);
    var str = "";
    var str2 = "";
    var str3 = "";
    res1.cover.forEach(function (item, index) {
      return str += "\n                         <dd style=\"width: 100%;height: 140px;\n                         display:flex;flex-direction:column;\n                         \">\n                           <p style=\"height:50%;\n                           line-height:105px;font-size:18px;color:#ddd;\n                           \">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u8BBE\u8BA1\u670D\u52A1&nbsp;>>".concat(res1.name, "</p>\n                           <p style=\"flex:1;font-size:26px;font-weight:bold\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").concat(res1.name, "</p>\n                            </dd>\n                         <dd style=\"flex: 1;width: 100%;\">\n                    \n                        <img src=\"https://muse-img.huabanimg.com/").concat(item.key, "\" style=\"width:100%;height:100%\" alt=\"\">\n                        \n                      \n                            </dd>\n                        ");
    });
    detaillist.innerHTML = str;
    res1.desc.forEach(function (_ref, index) {
      var image = _ref.image;
      // console.log('descitem',image);
      return str2 += "\n                        <img src=\"https://muse-img.huabanimg.com/".concat(image.key, "\"  alt=\"\">\n            ");
    });
    nextBottom.innerHTML = str2; // console.log("res1.complete_in",res1.complete_in.number);

    res1.cover.forEach(function (item, index) {
      console.log('item=', res1.created_at);
      console.log('responsetime', res1.user.extra.response_time);
      var res = res1.user.extra.response_time / (60 * 60 * 24);
      console.log('dateres=', res);
      var dayline = res1.user.extra.response_time / (60 * 60 * 24);
      var middline = res1.user.extra.response_time;
      var hours;
      var seconds; // 1511339383

      if (dayline >= 1) {
        dayline = parseInt(dayline);
        hours = parseInt((middline - 60 * 60 * 24 * dayline) / (60 * 60));
        seconds = parseInt((middline - (60 * 60 * 24 * dayline + 60 * 60 * hours)) / 60);
        thirds = middline - (60 * 60 * 24 * dayline + 60 * 60 * hours + 60 * seconds);
      } else {
        hours1 = parseInt(middline / (60 * 60));
        seconds1 = parseInt((middline - 60 * 60 * hours) / 60);
        thirds1 = parseInt(middline - (60 * 60 * hours + 60 * seconds));
      } // let days = 
      // console.log('thirds',thirds);


      var price;

      if (res1.price == 0) {
        price = "价格面议";
      } else {
        price = "\uFFE5".concat(res1.price, "/\u5355");
      }

      return str3 += "\n            <dd style=\"width: 100%;height: 30%;background-color: #ffffff;\">\n            <section style=\"display: flex;flex-direction: column;align-items: center;\">\n                <p style=\"height: 130px;width: 85%;border-bottom: 1px solid #ccc;\">\n                    <span style=\"height: 50%;\n                    justify-content: center;align-items: flex-end;font-size: 30px;font-weight: bold;\n                    \">".concat(price, "</span>\n                    <span\n                    style=\"justify-content: center;align-self: center;margin-top: 15px;font-size: 20px;\n                    color: #aaa;\n                    \"\n                    >\u57FA\u7840\u670D\u52A1\u4EF7\u683C<i style=\"color: darkgoldenrod;margin-left: 14px;font-style: normal;\">\u4E86\u89E3\u66F4\u591A</i></span>\n                </p>\n                <p style=\"width: 85%;height: 150px;display: flex;align-items: center;border-bottom: 1px solid #ccc;\">\n                <span\n                style=\"font-size: 21px;color: #aaa;\"\n                >\u6210\u4EA4<br>\u8BC4\u4EF7</span>\n                <span\n                style=\"font-size: 21px;color: orange;width: 71%;display:flex;flex-direction:column;text-align:right\"\n                >\n              <a style=\"color:orange\">\n               ").concat(res1.order_count, "\n              </a>\n              \n               <a style=\"color:orange\">\n                    <i class=\"iconfont icon-wujiaoxing-\" style=\"font-size:22px\"></i>\n                <i class=\"iconfont icon-wujiaoxing-\" style=\"font-size:22px\"></i>\n                <i class=\"iconfont icon-wujiaoxing-\" style=\"font-size:22px\"></i>\n                <i class=\"iconfont icon-wujiaoxing-\" style=\"font-size:22px\"></i>\n                <i class=\"iconfont icon-wujiaoxing-\" style=\"font-size:22px;\"></i>\n                   </a>\n              \n                </span>\n                </p>\n                <p style=\"width: 85%;height: 15%;display: flex;justify-content: center;align-items: center;\">\n               <button\n               style=\"width: 100%;height: 60px;background-color: darkgoldenrod;margin-top: 50px;color: #ccc;font-size: 18px;\"\n               >\u70B9\u51FB\u8D2D\u4E70</button>\n                </p>\n            </section>\n            </dd>\n            <dd style=\"margin-top: 20px;height: 30%;background-color: #ffffff;\">\n            <section style=\"display: flex;flex-direction: column;align-items: center;\">\n                <p\n                style=\"width: 85%;height: 150px;border-bottom: 1px solid #ccc;\n                display: flex;align-items: center;\n                \"\n                >\n                <img src=\"https://hbimg.huabanimg.com/").concat(res1.user.avatar.key, "_/both/70x70\" alt=\"\" style=\"width: 35%;height: 65%;\">\n                <span style=\"width: 150px;height: 65%;display: flex;flex-direction: column;\">\n                <i style=\"height: 50%;font-size: 24px;line-height: 60px;font-style: normal;text-align: center;\">").concat(res1.user.username, "</i>\n                <i style=\"width:100px;margin-left:10px;border-radious:5px;height: 50%;font-size: 17px;font-style: normal;line-height: 50px;background-color: #bbb;text-align: center;\"><i class=\"iconfont icon-liaotian\"></i>\u804A\u5929</i>\n                </span>\n                </p>\n                <p\n                style=\"width: 85%;height:150px;border-bottom: 1px solid #ccc;display: flex;flex-direction: column;\n                font-size: 18px;color: #aaa;\n                \"\n                >\n                <span style=\"height: 50%;line-height: 110px;\"><i class=\"iconfont icon-naozhong\" style=\"font-size:18px;font-weight:bold\"></i>&nbsp;\u5E73\u5747\u54CD\u5E94\u65F6\u95F4<i style=\"width:60%;text-align:right;overflow:hidden\">3\u59295\u65F613\u520629\u79D2</i></span>\n                <span style=\"height: 50%;line-height: 50px;\"><i class=\"iconfont icon-shenfenzhengrenzheng\" style=\"font-size:18px;font-weight:bold\"></i>&nbsp;\u5B9E\u540D\u8BA4\u8BC1<i style=\"width:60%;text-align:right;overflow:hidden\">\u5DF2\u8BA4\u8BC1</i></span>\n                </p>\n                <p\n                style=\"width: 85%;height: 180px;display: flex;justify-content: center;align-items: center;\"\n                >\n                <span style=\"width: 100%;height: 80%;background-color: white;\">").concat(res1.user.desc, "</span>\n            </p>\n            </section>\n            </dd>\n            <dd style=\"margin-top: 20px;height: 400px; background-color: #ffffff;\">\n            <section  style=\"display: flex;flex-direction: column;align-items: center;\">\n                <p style=\"width: 80%;height: 270px;border-bottom:  1px solid #ccc;display: flex;flex-direction: column;\">\n                <span style=\"height: 80px;display: flex;align-items: center;font-size: 18px;color: #aaa;\">\u8D2D\u4E70\u6D41\u7A0B</span>\n                <span style=\"padding: 12px 3px;display: flex;flex-wrap: wrap;font-size: 19px;width: 95%;\">\u52FE\u9009\u670D\u52A1\u9879\u76EE\u8FDB\u884C\u8D2D\u4E70\u540E\uFF0C\u586B\u5199\u9700\u6C42\u8BA2\u5355\uFF0C\u7B49\u5F85\u8BBE\u8BA1\u5E08\u786E\u8BA4\uFF1B\u8BBE\u8BA1\u5E08\u786E\u8BA4\u8BA2\u5355\u540E\uFF0C\u9700\u8981\u60A8\u518D\u6B21\u786E\u8BA4\u5E76\u4ED8\u6B3E\uFF1B\n                    \u60A8\u7684\u4ED8\u6B3E\u5C06\u6258\u7BA1\u5728\u7F8E\u601D\u5E73\u53F0\uFF0C\u53EA\u6709\u9879\u76EE\u7ED3\u675F\u540E\u5F97\u53CC\u65B9\u540C\u610F\u540E\uFF0C\u6B3E\u9879\u624D\u4F1A\u8F6C\u5230\u670D\u52A1\u65B9\u8D26\u53F7\u3002</span>\n                </p>\n                <p style=\"width: 80%;height: 129px;\n                display: flex;flex-direction: column;\n                \">\n                <span style=\"height: 40%;font-size: 18px;color: #aaa;display: flex;align-items: flex-end;\">\u8FD8\u6709\u7591\u95EE</span>\n                <span style=\"flex: 1;font-size: 20px;margin-top: 10px;color: darkgoldenrod;\">\u67E5\u770B\u5E2E\u52A9\u6587\u6863&nbsp;|&nbsp;\u8054\u7CFB\u5BA2\u670D</span>\n                </p>\n            </section>\n            </dd>\n                        ");
    });
    rightdetail.innerHTML = str3;
  }); // 登录验证

  var resSubs = getCookie("username");
  console.log("resubsDetail", resSubs);

  if (!resSubs) {
    alert("您还未登录，请先登录！！");
    window.location.href = "./list.html";
  } else {
    newParentTop.style.display = "flex";
    comeBtnback.innerHTML = "@" + resSubs;
    comeBtnback.style.borderBottom = "4px solid #aaa";
    comeBtnback.style.fontSize = "15px";
  } // 点击退出,回到主页


  registrback.onclick = function () {
    if (!flag) {
      window.confirm("确定要退出吗？");
    }

    flag = false;
    deleteCookie("username");
    window.location.href = "./list.html";
  };
}; // 回到顶部
// function myScroll(){
//     let topY=document.body.scrollTop||document.documentElement.scrollTop;
// }
// 点击显现
// showCont.onclick = function(e){
// }
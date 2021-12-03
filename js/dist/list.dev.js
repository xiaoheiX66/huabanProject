"use strict";

// 当打开浏览器的时候清除缓存
localStorage.clear(); // 首页内容渲染

var nav_list = document.querySelector(".nav_list");
var nav_list2 = document.querySelector(".nav_list2");
var nav_sub = document.querySelector(".nav_sub");
var list = document.querySelector(".list");
var submitTop = document.querySelector(".submitTop");
var registrTop = document.querySelector(".registrTop"); // 登录前

var formParentTop = document.querySelector("#formParentTop");
var formSubRegis = document.querySelector("#formSubRegis");
var username = document.querySelector("#username");
var password = document.querySelector("#password"); // 登录后

var newParentTop = document.querySelector(".newParentTop");
var comeBtnback = document.querySelector(".comeBtnback");
var registrback = document.querySelector(".registrback"); // 分页器

var page = document.querySelector(".pagenation");
new Pagination(page, {
  pageInfo: {
    pagenum: 1,
    pagesize: 20,
    total: 1000,
    totalpage: 100
  },
  textInfo: {
    first: "首页",
    prev: "上一页",
    next: "下一页",
    last: "末尾"
  },
  change: function change(idx) {
    var category = localStorage.getItem("category");
    var sub_category = localStorage.getItem("sub_category");
    var str = "".concat(category ? "category=" + category : "", "&").concat(sub_category ? "sub_category=" + sub_category : "", "&limit=20&page=").concat(idx);
    getListData(str);
    scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
});
nav(); // nav

function nav() {
  pAjax({
    url: "../nav.json"
  }).then(function (res) {
    // localStorage.setItem('navData',res)
    var str = "";
    var res1 = JSON.parse(res);
    res1.forEach(function (item, index) {
      return str += "\n                    <a class=\"item\" style=\"cursor:pointer;\" href=\"#\" index=".concat(index, "  data=").concat(item.category, ">").concat(item.name, "</a>\n                    ");
    });
    nav_list.innerHTML = str;
    localStorage.setItem("navData", res); // console.log("res1==",res1);
  });
}

nav_list.onclick = function (e) {
  if (e.target.className == 'item') {
    var category = e.target.getAttribute('data');
    $(this).addClass("active");
    console.log("this===", $(this));

    if (!category) {
      pAjax({
        url: "https://muse.huaban.com/api/v1/services/"
      }).then(function (res) {
        var res2 = JSON.parse(res);
        var str = "";
        res2.forEach(function (item, index) {
          var price;

          if (item.price == 0) {
            price = "价格面议";
          } else {
            price = "\uFFE5".concat(item.price, "/\u5355");
          }

          return str += "\n                        <dl>\n                        <dt>\n                            <a href=\"./detail.html?".concat(item.service_id, "\">\n                        <img src=\"https://muse-img.huabanimg.com/").concat(item.cover[0].key, "_/both/280x280\" alt=\"\"></a>\n                     </dt>\n                        <dd>").concat(item.name, "</dd>\n                        \n                     <dd><a style=\"width:30%;height:100%;display:flex;\n                        justify-content:center;align-items:center;border-top:1px solid #ddd;color:black\n                        \">").concat(price, "</a></dd>\n                         </dl>\n                        ");
        });
        list.innerHTML = str;
        getListData({
          category: category
        });
      });
      return;
    }

    pAjax({
      url: "https://muse.huaban.com/api/v1/services/",
      data: "category=".concat(category)
    }).then(function (res) {
      var res1 = JSON.parse(res);
      var str = "";
      res1.forEach(function (item, index) {
        var price;

        if (item.price == 0) {
          price = "价格面议";
        } else {
          price = "\uFFE5".concat(item.price, "/\u5355");
        }

        return str += "\n                        <dl>\n                        <dt>\n                            <a href=\"./detail.html?id=".concat(item.service_id, "\">\n                        <img src=\"https://muse-img.huabanimg.com/").concat(item.cover[0].key, "_/both/280x280\" alt=\"\">\n                        </a>\n                     </dt>\n                        <dd>").concat(item.name, "</dd>\n                       \n                     <dd><a style=\"width:30%;height:100%;display:flex;\n                        justify-content:center;align-items:center;border-top:1px solid #ddd;color:black\n                        \">").concat(price, "</a></dd>\n                         </dl>\n                        ");
      });
      list.innerHTML = str;
    });
    localStorage.setItem("category", category);
    var index = e.target.getAttribute('index'); // 子类进行渲染,缓存渲染

    var res1 = JSON.parse(localStorage.getItem("navData"));
    var str = "";
    res1[index].sub.forEach(function (item) {
      return str += "\n            <a class=\"item1\" style=\"cursor:pointer;\n           margin-left:10px;color:black;\n            \" href=\"#\" category=".concat(category, " sub_category=").concat(item.sub_category, ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").concat(item.name, "</a>\n            ");
    });
    nav_list2.innerHTML = str;
  }
};

nav_list2.onclick = function (e) {
  if (e.target.className == 'item1') {
    var sub_category = e.target.getAttribute('sub_category');
    var category = e.target.getAttribute('category');
    pAjax({
      url: "https://muse.huaban.com/api/v1/services/",
      data: {
        category: category,
        sub_category: sub_category
      }
    }).then(function (res) {
      var res1 = JSON.parse(res);
      console.log(res1);
      var str = "";
      res1.forEach(function (item, index) {
        var price;

        if (item.price == 0) {
          price = "价格面议";
        } else {
          price = "\uFFE5".concat(item.price, "/\u5355");
        }

        return str += "\n                        <dl>\n                        <dt>\n                            <a href=\"./detail.html?id=".concat(item.service_id, "\">\n                        <img src=\"https://muse-img.huabanimg.com/").concat(item.cover[0].key, "_/both/280x280\" alt=\"\">\n                        </a>\n                     </dt>\n                        <dd>").concat(item.name, "</dd>\n                       \n                     <dd><a style=\"width:30%;height:100%;display:flex;\n                        justify-content:center;align-items:center;border-top:1px solid #ddd;color:black\n                        \">").concat(price, "</a></dd>\n                         </dl>\n                        ");
      });
      list.innerHTML = str;
      localStorage.setItem("sub_category", sub_category);
      getListData({
        category: category,
        sub_category: sub_category
      });
    });
  }
};

getListData();

function getListData(option) {
  var res, res1;
  return regeneratorRuntime.async(function getListData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(pAjax({
            url: "https://muse.huaban.com/api/v1/services/",
            data: option
          }));

        case 2:
          res = _context.sent;
          res1 = JSON.parse(res);
          allData(res1);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function allData(res1) {
  var str = res1.map(function (item) {
    var price;

    if (item.price == 0) {
      price = "价格面议";
    } else {
      price = "\uFFE5".concat(item.price, "/\u5355");
    }

    return "\n                        <dl>\n                        <dt>\n                            <a href=\"./detail.html?id=".concat(item.service_id, "\">\n                        <img src=\"https://muse-img.huabanimg.com/").concat(item.cover[0].key, "_/both/280x280\" alt=\"\"></a>\n                     </dt>\n                        <dd>").concat(item.name, "</dd>\n                     <dd><a style=\"width:30%;height:100%;display:flex;\n                        justify-content:center;align-items:center;border-top:1px solid #ddd;color:black\n                        \">").concat(price, "</a></dd>\n                         </dl>\n                        ");
  }).join("");
  list.innerHTML = str;
} // 顶部稀烂
//   点击登录


submitTop.onclick = function (e) {
  formParentTop.style.display = "block";
};
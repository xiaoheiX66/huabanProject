// 当打开浏览器的时候清除缓存
localStorage.clear();
// 首页内容渲染
let nav_list = document.querySelector(".nav_list")
let nav_list2 = document.querySelector(".nav_list2")
let nav_sub = document.querySelector(".nav_sub")
let list = document.querySelector(".list")
let submitTop = document.querySelector(".submitTop")
let registrTop = document.querySelector(".registrTop")
// 登录前
let formParentTop = document.querySelector("#formParentTop")
let formSubRegis = document.querySelector("#formSubRegis")
let username = document.querySelector("#username")
let password = document.querySelector("#password")

// 登录后
let newParentTop = document.querySelector(".newParentTop")
let comeBtnback = document.querySelector(".comeBtnback")
let registrback = document.querySelector(".registrback")
// 分页器
let page = document.querySelector(".pagenation")
new Pagination(page, {
    pageInfo: {
        pagenum: 1,
        pagesize: 20,
        total: 1000,
        totalpage: 100,
    },
    textInfo: {
        first: "首页",
        prev: "上一页",
        next: "下一页",
        last: "末尾",
    },
    change(idx) {
        let category = localStorage.getItem("category")
        let sub_category = localStorage.getItem("sub_category")
        let str = `${category ? "category=" + category : ""}&${
            sub_category ? "sub_category=" + sub_category : ""
        }&limit=20&page=${idx}`;
        getListData(str);
        scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
})


nav();
// nav
function nav() {
    pAjax({
        url: "../nav.json",
    }).then((res) => {
        // localStorage.setItem('navData',res)
        let str = "";
        let res1 = JSON.parse(res)
        res1.forEach((item, index) => {
            return str += `
                    <a class="item" style="cursor:pointer;" href="#" index=${index}  data=${item.category}>${item.name}</a>
                    `
        })
        nav_list.innerHTML = str;
        localStorage.setItem("navData", res);
        // console.log("res1==",res1);
    })

}

nav_list.onclick = function (e) {
    if (e.target.className == 'item') {
        let category = e.target.getAttribute('data')
        $(this).addClass("active")
        console.log("this===",$(this));

        if (!category) {
            pAjax({
                url: "https://muse.huaban.com/api/v1/services/",
            }).then((res) => {
                let res2 = JSON.parse(res)
                let str = "";
                res2.forEach((item, index) => {
                    let price;
                    if (item.price == 0) {
                        price = "价格面议"
                    } else {
                        price = `￥${item.price}/单`
                    }
                    return str += `
                        <dl>
                        <dt>
                            <a href="./detail.html?${item.service_id}">
                        <img src="https://muse-img.huabanimg.com/${item.cover[0].key}_/both/280x280" alt=""></a>
                     </dt>
                        <dd>${item.name}</dd>
                        
                     <dd><a style="width:30%;height:100%;display:flex;
                        justify-content:center;align-items:center;border-top:1px solid #ddd;color:black
                        ">${price}</a></dd>
                         </dl>
                        `
                })
                list.innerHTML = str;
                getListData({category:category})
            })
            return
        }
        pAjax({
            url: "https://muse.huaban.com/api/v1/services/",
            data: `category=${category}`,
        }).then((res) => {
            let res1 = JSON.parse(res)
            let str = ""
            res1.forEach((item, index) => {
                let price;
                if (item.price == 0) {
                    price = "价格面议"
                } else {
                    price = `￥${item.price}/单`
                }
                return str += `
                        <dl>
                        <dt>
                            <a href="./detail.html?id=${item.service_id}">
                        <img src="https://muse-img.huabanimg.com/${item.cover[0].key}_/both/280x280" alt="">
                        </a>
                     </dt>
                        <dd>${item.name}</dd>
                       
                     <dd><a style="width:30%;height:100%;display:flex;
                        justify-content:center;align-items:center;border-top:1px solid #ddd;color:black
                        ">${price}</a></dd>
                         </dl>
                        `
            })
            list.innerHTML = str;
        })
        localStorage.setItem("category", category);
        let index = e.target.getAttribute('index')
        // 子类进行渲染,缓存渲染
        let res1 = JSON.parse(localStorage.getItem("navData"));
        let str = "";
        res1[index].sub.forEach((item) => {
            return str += `
            <a class="item1" style="cursor:pointer;
           margin-left:10px;color:black;
            " href="#" category=${category} sub_category=${item.sub_category}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.name}</a>
            `
        })
        nav_list2.innerHTML = str;
    }
}
nav_list2.onclick = function (e) {
    if (e.target.className == 'item1') {
        let sub_category = e.target.getAttribute('sub_category')
        let category = e.target.getAttribute('category')
        pAjax({
            url: "https://muse.huaban.com/api/v1/services/",
            data: {
                category: category,
                sub_category: sub_category
            },
        }).then((res) => {
            let res1 = JSON.parse(res)
            console.log(res1);
            let str = ""
            res1.forEach((item, index) => {
                let price;
                if (item.price == 0) {
                    price = "价格面议"
                } else {
                    price = `￥${item.price}/单`
                }
                return str += `
                        <dl>
                        <dt>
                            <a href="./detail.html?id=${item.service_id}">
                        <img src="https://muse-img.huabanimg.com/${item.cover[0].key}_/both/280x280" alt="">
                        </a>
                     </dt>
                        <dd>${item.name}</dd>
                       
                     <dd><a style="width:30%;height:100%;display:flex;
                        justify-content:center;align-items:center;border-top:1px solid #ddd;color:black
                        ">${price}</a></dd>
                         </dl>
                        `
            })
            list.innerHTML = str;
            localStorage.setItem("sub_category", sub_category);
            getListData({category:category,sub_category:sub_category})
        })
    }
}

getListData();
async function getListData(option) {
    let res = await pAjax({
        url: "https://muse.huaban.com/api/v1/services/",
        data: option,
    })
    let res1 = JSON.parse(res);
    allData(res1);
}

function allData(res1) {
    let str = res1.map((item) => {
        let price;
        if (item.price == 0) {
            price = "价格面议"
        } else {
            price = `￥${item.price}/单`
        }
        return `
                        <dl>
                        <dt>
                            <a href="./detail.html?id=${item.service_id}">
                        <img src="https://muse-img.huabanimg.com/${item.cover[0].key}_/both/280x280" alt=""></a>
                     </dt>
                        <dd>${item.name}</dd>
                     <dd><a style="width:30%;height:100%;display:flex;
                        justify-content:center;align-items:center;border-top:1px solid #ddd;color:black
                        ">${price}</a></dd>
                         </dl>
                        `
    }).join("")
    list.innerHTML = str;
}
// 顶部稀烂
//   点击登录
submitTop.onclick = function (e) {
    formParentTop.style.display = "block"
}


## 根据 nav.json 渲染二级导航

## 默认显示的是全部 分类的数据

-   接口地址：`https://muse.huaban.com/api/v1/services/`

## 当点击分类的导航 请求对应的接口数据 进行渲染

-   接口地址：`https://muse.huaban.com/api/v1/services/?category=对应这个数据的category属性的属性值`

## 点击每一个分类的子类的时候 也需要请求对应的接口数据 进行渲染

- 接口地址：`https://muse.huaban.com/api/v1/services/?category=logo_brand&sub_category=business_card_brand 
- `
x`
## 点击每一个产品之后 需要跳转到详情页，并且把 id 传递给详情页

-   详情页根据传递过来的 id 请求对应的数据
-   详情页面接口地址：`https://muse.huaban.com/api/v2/services/传递过来的id值`


## 点击用户相关的内容的时候 跳转到用户页面，并且把用户 id 传递给用户页面

-   用户信息数据接口：`https://muse.huaban.com/api/v1/users/用户id`
-   服务设计数据接口：`https://muse.huaban.com/api/v1/users/用户id/services/?limit=100`
-   原创数据接口：`https://muse.huaban.com/api/v1/users/用户id/boards/`



## 设计师页面
-   根据nav.json渲染导航，不需要子类
-   全部的数据接口：`https://muse.huaban.com/api/v1/users/`
-   点击其他分类的时候，数据接口：`https://muse.huaban.com/api/v1/users/?category=对应这个分类的category属性的属性值`

http://hbimg.huabanimg.com/20db2c12159e19f32e3b458c958708ed933a665235735-B0i5bv_/both/70x70">
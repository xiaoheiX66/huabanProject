# huabanProject
## 整体布局：顶部导航、内容导航、内容区、底部版权区
## 顶部导航暂定顶部固定，后期进行美化优化
## 内容导航主要通过请求相关接口实现数据的动态渲染，通过点击一类导航获取属性category,通过此属性获取到二级需要的sub_category,从而进行二类点击时可以通过相关接口实现动态内容区渲染
## 内容区根据官网的布局进行模仿，通过对图片添加id属性，点击图片时获取id属性值，请求相关接口进行详情页的渲染
## 详情页的内容区则也是通过请求数据接口进行动态渲染内容区
## 底部版权区则是简单的html和css组合而成，后期准备通过其他技术实现动态渲染
## 初期定稿就是这样，后期则进行代码优化和压缩上线。

## 211129--21:41:00
## 今天用了封装cookie的方法，主要有--setCookie(name,value,expires)--getCookie(name)--deleteCookie(name,expires=-1)
## 通过cookie简单实现登录功能，利用封装的登录接口进行操作，前端通过输入提交发起请求，后台通过req.query拿到当前的输入内容
## 利用mysql语句向数据库搜索有关内容，搜索到则给前端一个登陆成功的信息，反则登陆失败未查询到信息
## 登陆成功后利用cookie将用户名暂时存储起来，同时点击退出则删除cookie，若是在详情页点击退出，则确认信息后跳转到首页
## 将冗余的css代码进行封装，防止首页和详情页因部分代码而出现彼此限制的场景
## 遇到的问题：登录成功的判断有时候会出现错乱，connects.query(err,data)，有时候if(err)可以进行判断，有时候if(data[0])可以进行判断，这种场景遇到不是一次两次，待明天回来好好钻研
## ······虽说访问的数据是不会有跨域的限制，但有时候估计是因为网络的原因，偶尔会报404的错误信息或者其他信息
## 后期设想：页面美化，代码优化，实现注册登录，实现设计师页面以及利用user接口请求到相关信息的渲染，实现分页器

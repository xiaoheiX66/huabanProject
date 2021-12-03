function header(){
    return `
    <section>
    <div>
        <ul class="logoTopcont">
            <li style="font-style: normal;height: 70px;width: 220px;" class="huabanImg">
            <img src="./logos.png" alt="" width="100%" height="100%">
            </li>
        <li>首页</li>
        <li style="cursor: pointer;position: relative;" class="despricer">设计师&nbsp;<i class="iconfont icon-xiajiantou1"></i>
          <ul style="position: absolute;width: 460px;height: 345px;background-color: #ffffff;z-index: 10;
          top: 65px;left: -45px;border: 1px solid #ddd; " class="showCont">
              <li>窝嫩叠</li>
          </ul>
        </li>
        <li>设计服务</li>
        </ul>
        
    </div>
</section>
<section>
    <div style="position: relative;">
        <div class="newParentTop">
            <button class="comeBtnback">登录</button>
            <button class="registrback">退出</button>
        </div>
        <button class="submitTop">登录</button>
        <button class="registrTop">注册</button>
    </div>
</section>
    `
}

export default header;
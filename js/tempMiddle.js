function renderXing(num) {
    let str = "";
    switch (Math.round(num)) {
        case 5:
            for (var i = 0; i < 5; i++) {
                str += `<i class="iconfont icon-wujiaoxing- active2"></i>`;
            }
            break;
        case 4:
            for (var i = 0; i < 4; i++) {
                str += `<i class="iconfont icon-wujiaoxing- active2"></i>`;
            }
            str += `<i class="iconfont icon-wujiaoxing-"></i>`;
            break;
        case 3:
            for (var i = 0; i < 3; i++) {
                str += `<i class="iconfont icon-wujiaoxing- active2"></i>`;
            }
            for (var i = 0; i < 2; i++) {
                str += `<i class="iconfont icon-wujiaoxing-"></i>`;
            }
            break;
        case 2:
            for (var i = 0; i < 2; i++) {
                str += `<i class="iconfont icon-wujiaoxing- active2"></i>`;
            }
            for (var i = 0; i < 3; i++) {
                str += `<i class="iconfont icon-wujiaoxing-"></i>`;
            }
            break;
        case 1:
            for (var i = 0; i < 1; i++) {
                str += `<i class="iconfont icon-wujiaoxing- active2"></i>`;
            }
            for (var i = 0; i < 4; i++) {
                str += `<i class="iconfont icon-wujiaoxing-"></i>`;
            }
            break;
        case 0:
            for (var i = 0; i < 5; i++) {
                str += `<i class="iconfont icon-wujiaoxing-"></i>`;
            }
    }
    return str;
}

let info = {
    designer: "平面设计师",
    photographer: "摄影师",
    illustrator: "插画师",
    graphic: "漫画师",
    artisan: "手工艺人",
    stylist:"造型师",
    industrial_designer:"设计师专家",
    animator:"动画师",
    game_designer:"游戏设计师",
    ui_designer:"UI设计师",
    interior_designer:"3D设计师",
    household_desiger:"家居达人",
    architect:"绘画师",
    costume_designer:"独立插画师",
    other: "其他",
};

function setTimess(time) { 
    　　 var date = new Date();
    　　 date.date = Math.floor(time / (1000 * 60 * 60 * 24));
    　　 date.hours = Math.floor(( time / (1000 * 60 * 60)) % 24);
    　　 date.minutes = Math.floor(( time / (1000 * 60)) % 60);
    　　 date.seconds = Math.floor(( time / 1000) % 60);
    　　 date.milliseconds = Math.floor(time % 1000);
    　　 return date;
     }

     function transTime(timestamp) {
        var result = "";
        if (timestamp >= 86400) {
            $days = Math.floor(timestamp / 86400);
            timestamp = timestamp % 86400;
            result = $days + '天 ';
            if (timestamp > 0) {
                result += ' ';
            }
        }
        if (timestamp >= 3600) {
            $hours = Math.floor(timestamp / 3600);
            timestamp = timestamp % 3600;
            if ($hours < 10) {
                $hours = '0' + $hours;
            }
            result += $hours + '时';
            
        }
        if (timestamp >= 60) {
            $minutes = Math.floor(timestamp / 60);
            timestamp = timestamp % 60;
            if ($minutes < 10) {
                $minutes = '0' + $minutes;
            }
            result += $minutes + '分';
        }
        $secend = Math.floor(timestamp);
        if ($secend < 10) {
            $secend = '0' + $secend;
        }
        result += $secend + '秒';
        //console.log(result)
        return result;
    }
    
  
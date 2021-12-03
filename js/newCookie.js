/**
 * 
 * @param {String} key 
 * @param {String || number} value 
 * @param {String} expires 
 * 
 */
function setCookie(key,value,expires){
    if(!key){
        throw new Error('key是必填参数')
    }
    // 如果value有值 并且数据是字符串的时候 才表示这个value的值
    let types = Object.prototype.toString.call(value)
     let val =  (value && types == '[object String]') ? value : "";
    
    // 针对过期时间判断给的是分钟/小时/秒数
    // 如果value有值 并且数据是数字的时候 表示这个值的expires的值
    // 如果本身expires值存在 那么就用这个值当做过期时间
    // 如果不存在 并且值的类型为数字的时候 那么久把value 当成expires
    expires = expires ? expires : (types == '[object Number]' ? value : "");
    if(expires){
        let date = new Date()
        let time = date.getTime() - 8*60*60*1000 + expires*60*1000
        date.setTime(time)
        // 设置路径，表示设置在项目的根目录下，这个项目的所有文件都可以访问这个cookie
        // 否则不是每个文件夹都能访问cookie
        document.cookie = `${key}=${val};expires=${date};path=/`;

        return
    }
    document.cookie(`${key}=${val};path=/`)

}
/**
 * 
 * @param {String} key 
 */
let obj = {}
function getCookie(key){
    let res = document.cookie;
    let arr = res.split("; ")
    arr.forEach((item)=>{
        let [key,value] = item.split("=")
        obj[key] = value;
    })
    if(key){
        return obj[key]
    }
    return obj;
}



// 打开首页，判断是否有登录
// 如果有就显示首页
// 没有就跳到登录页

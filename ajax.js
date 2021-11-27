/**
 * 参数
    * url:地址
    * type:类型
    * data:请求携带的参数，默认为''
    * async:true || false,默认为true
    * success:function(){}请求成功的回调函数
    * error:function(){}请求失败的回调函数
 * 因有些对象是可选的，故以对象的方式进行选择，也防止一些参数未填
 * 导致出现错乱
    * 
 */

/**
 * 
 * @param {*} option 
 * 【1】判断参数是否有填写
 * 【2】type:get || post
 * 【3】data的类型判断【string,object,number】
 * 【4】async取值默认为异步(true),取值只能为布尔值
 * 【5】回调函数，请求成功的时候去调用
 * 一般情况下判断错误，然后终止代码不再执行
 */
function ajax(option){
    if(!option.url){
        throw new Error('url地址必填')
    }

    // if(option.success){
    //     throw new Error('success地址必填')
    // }

    let params = {
        url:option.url,
        type:option.type || 'get',
        data:option.data || '',
        async:option.async == false ? false : true,
        success:option.success,
        error:option.error || function(){}
    }

    if(!(params.type == 'get' || params.type == 'post')){
        throw new Error('请选择正确的请求方式get||post')
    }

    // 判断data参数
    // Object.prototype.toString.call('123') == '[object String]'
    let data =Object.prototype.toString.call(params.data)
    if(!(data == '[object String]' || data == '[object Object]')){
        throw new Error('data参数必须是字符串或者对象')
    }
    // 如果参数是字符串类型 必须有=    ，key=value
    if(params.data && data == '[object String]' && !params.data.includes('=')){
        throw new Error('参数字符串类型必须有=')
    }

    // 判断回调函数是否是函数
    if(Object.prototype.toString.call(params.success) !='[object Function]'){
        throw new Error('success必须是函数')
    }

    // 如果data是一个对象的是{username:123,age:18}==>username=123
    // 需要把对象形式转换为字符串格式
    if(data == '[object Object]'){
        let str = "";
        for(let key in params.data){
            str +=key + "=" + params.data[key] + "&";
        }
        params.data = str.slice(0,-1);
    }
    // console.log(params);
    let xhr = new XMLHttpRequest();
    // 如果是get请求，那么直接把参数拼接在url后面，
    // 若是post请求，直接把参数写在send里,
    if(params.type == 'get'){
         xhr.open(params.type,params.url + '?'+params.data,params.async);
    xhr.send();
    }else{
        xhr.open(params.type,params.url,params.async);
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(params.data);
    }

    // http请求的状态码
    /**
     * ajax 用于发送http请求
     * 状态码为1开头：请求正在继续
     * 状态码为2开头：请求成功
     * 状态码为3开头：表示请求成功，但数据是从缓存中获取
     * 状态码为4开头：请求失败 且  客户端出错【前端出错】
     * 状态码为5开头：请求失败 且  服务端出错【后端出错】
     */
    


//    true为异步，false为异步
    if(params.async == false){
        if(/^[23]\d{2}$/.test(xhr.status)){
             params.success(xhr.responseText)
        }
            params.error(xhr.statusText)
        return;
    }

    xhr.onload = function(){
        if(/^[23]\d{2}$/.test(xhr.status)){
            params.success(xhr.responseText)
       }
           params.error(xhr.statusText)
    }

    
   
}
// 封装promise对象
function pAjax(option){
    let p = new Promise((resolve,reject)=>{
        ajax({
            url:option.url,
            type:option.type,
            data:option.data,
            async:option.async,
            success:function(res){
                resolve(res)
            },
            error:function(res){
                reject(res)
            }
        })
    })
    return p;
}

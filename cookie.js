/**
 * 
 * @param {String} name 传入的name。
 * @param {String||Number} value 传入的值
 * @param {String} expires 过期时间
 */
function setCookie(name,value,expires){
    if(expires){
         document.cookie = `${name}=${value};expires=${expires}`;
    }else{
        document.cookie = `${name}=${value};`;
    }
}
/**
 * 根据用户传入的时间毫秒时间差构建返回一个时间字符串
 * @param {number} timeMillsDiffer 为正时返回将来时间，否则是过去时间
 */
function getExpires(timeMillsDiffer){
   let newTimeStamp = new Date().getTime() - 8*3600*1000 + timeMillsDiffer;
   return new Date(newTimeStamp).toString()
}
/**
 * 
 * @param {String} name 
 */
function deleteCookie(name){
    document.cookie = `${name}='过期名字';expires=${getExpires(-1)}`
}
/**
 * 
 * @param {*} name 
 */
function getCookie(name){
  const arr = document.cookie.split("; ")
  for(let i=0;i<arr.length;i++){
    const kv = arr[i].split("=")
    if(kv[0] === name){
        return kv[1]
    }
  }
}


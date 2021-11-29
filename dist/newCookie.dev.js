"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * 
 * @param {String} key 
 * @param {String || number} value 
 * @param {String} expires 
 * 
 */
function setCookie(key, value, expires) {
  if (!key) {
    throw new Error('key是必填参数');
  } // 如果value有值 并且数据是字符串的时候 才表示这个value的值


  var types = Object.prototype.toString.call(value);
  var val = value && types == '[object String]' ? value : ""; // 针对过期时间判断给的是分钟/小时/秒数
  // 如果value有值 并且数据是数字的时候 表示这个值的expires的值
  // 如果本身expires值存在 那么就用这个值当做过期时间
  // 如果不存在 并且值的类型为数字的时候 那么久把value 当成expires

  expires = expires ? expires : types == '[object Number]' ? value : "";

  if (expires) {
    var date = new Date();
    var time = date.getTime() - 8 * 60 * 60 * 1000 + expires * 60 * 1000;
    date.setTime(time); // 设置路径，表示设置在项目的根目录下，这个项目的所有文件都可以访问这个cookie
    // 否则不是每个文件夹都能访问cookie

    document.cookie = "".concat(key, "=").concat(val, ";expires=").concat(date, ";path=/");
    return;
  }

  document.cookie("".concat(key, "=").concat(val, ";path=/"));
}
/**
 * 
 * @param {String} key 
 */


var obj = {};

function getCookie(key) {
  var res = document.cookie;
  var arr = res.split("; ");
  arr.forEach(function (item) {
    var _item$split = item.split("="),
        _item$split2 = _slicedToArray(_item$split, 2),
        key = _item$split2[0],
        value = _item$split2[1];

    obj[key] = value;
  });

  if (key) {
    return obj[key];
  }

  return obj;
} // 打开首页，判断是否有登录
// 如果有就显示首页
// 没有就跳到登录页
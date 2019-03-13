/*
*   cookies的增减删除
*/
const setCookie = function (name, value, days) {
  let d=new Date();
  //cookies 设置时间以毫秒计
  d.setTime(d.getTime()+1000*60*60*24*days);
  document.cookie=name+"="+value+";path/;expires="+d.toGMTString();
}

const getCookie = function (name) {
  let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

const deleteCookie = function (name) {
  setCookie(name, '', -1);
}

export default {
  setCookie,
  getCookie,
  deleteCookie,
}

/**
 * Created by MangoGan on 2018/5/27.
 */
/*
 *  unix时间戳的转换函数
 */
const getTimeAmount = function (time) {
  return Math.round(new Date(time).getTime() / 1000);
}

const resolveTime = function (time) {
  let date = new Date(time * 1000),
    year = date.getFullYear(),
    month = date.getMonth()+1, //month是0-11
    day = date.getDate(),
    hours = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours(),
    minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}
const resolvectime=function (ctime) {
  let time=new String(ctime)
  let date=time.substr(0,4)+'-'+time.substr(4,2)+'-'+time.substr(6,2);
  return date;
}
export default {
  getTimeAmount,
  resolveTime,
  resolvectime
}

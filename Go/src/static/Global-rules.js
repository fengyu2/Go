/**
 * Created by MangoGan on 2018/5/31.
 */
   const IP='47.92.28.15',
 // const IP='127.0.0.1',
  PORT='8080',
  URL="http://"+IP+":"+PORT;

//实现对象的深拷贝
function deepCopy(obj){
  let newObjec = obj.constructor === Array ? []:{};
  newObjec.constructor = obj.constructor;
  if(typeof obj !== "object"){
    return ;
  } else if(window.JSON){
    //若需要考虑特殊的数据类型，如正则，函数等，需把这个else if去掉即可
    newObjec = JSON.parse(JSON.stringify(obj));
  } else {
    for(let prop in obj){
      if(obj[prop].constructor === RegExp ||obj[prop].constructor === Date){
        newObjec[prop] = obj[prop];
      } else if(typeof obj[prop] === 'object'){
        //递归
        newObjec[prop] = deepCopy(obj[prop]);
      } else {
        newObjec[prop] = obj[prop];
      }
    }
  }
  return newObjec;
}

/*
*   cookies三连击
*/
function setCookie(name,value,days) {
  let d=new Date();
  //cookies 设置时间以毫秒计
  d.setTime(d.getTime()+1000*60*60*24*days);
  document.cookie=name+"="+value+";path/;expires="+d.toGMTString();
}
function getCookie(name) {
  let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v?v[2]:null;
}
function deleteCookie(name) {
  setCookie(name,'',-1);
}
/*
*   权限翻译
*/
function getIdentity(user) {
  let iden=['承运商','贸易员','物流员','门卫','理货员']
  if (user.auth === undefined) return iden[0]
  else  return iden[user.auth]
}
/*
   unix时间戳相关函数
 */
function getTimeAmount(time) {
  return Math.round(new Date(time).getTime()/1000)
}
function resolveTime(time) {
  let date=new Date(time*1000);
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" "+(date.getHours()>=10?date.getHours():"0"+date.getHours())+":"+(date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes())
}
function resolvectime(ctime) {
  let time=new String(ctime)
  let date=time.substr(0,4)+'-'+time.substr(4,2)+'-'+time.substr(6,2);
  return date;
}
function unctime(time){
  if(time) {
    let date = new Date(time);
    let year = new String(date.getFullYear())
    let month = new String(date.getMonth() + 1)
    if ((date.getMonth() + 1) <= 9) {
      month = '0' + month
    }
    let day = new String(date.getDate())
    if ((date.getDate()) <= 9) {
      day = '0' + day
    }
    return year + month + day
  }

}
function getTime() {
  let date=new Date()
  return date.getFullYear();
}
function getYear(ctime) {
  let time=new String(ctime)
  let date=time.substr(0,4)
  let date1=parseInt(date)
  return date1;
}
/*
 * 表单验证相关函数,创建了一个对象
 */
let formValidator = {
  namePattern : /[^\u4e00-\u9fa5]/,
  phonePattern : /^1[0-9]\d{9}$/,
  pCodePattern : /^[0-9]?\.?[0-9]*$/,
  positivePattern : /^[1-9][0-9]*$/,
  authdata:/["贸易员"，"物流员","门卫","理货员"]/,

  accountPass : function(rule, value, callback){
    if (value === '') {
      callback(new Error('请输入账号'));
    } else if (isNaN(value)||!(value.indexOf('.')===-1)){
      callback(new Error('请输入数字'));
    } else if ( value.toString().length<8||value.toString().length>20) {
      callback(new Error('账号长度在8~20之间'));
    } else {
      callback()
    }
  },
  passwordPass: function(rule, value, callback){
    if (value === '') {
      callback(new Error('请输入密码'));
    } else if ( value.toString().length<8||value.toString().length>16) {
      callback(new Error('账号长度在8~16之间'));
    }else {
      callback()
    }
  },

  phonePass : function(rule,value,callback){
    if (value !== '' && !formValidator.phonePattern.test(value)){
      callback(new Error('请输入手机号的正确格式'))
    } else {
      callback()
    }
  },

  nophonePass : function(rule,value,callback){
    if (value !== '' && !formValidator.phonePattern.test(value)){
      callback(new Error('手机号码为11位哦'))
    } else if(value==''){
      callback(new Error('手机号不能为空'))
    }
    else{
      callback()
    }
  },


  //确定输入的是数字而已
  numberPass : function(rule,value,callback){
    if (value!=='' && isNaN(value)||!(value.indexOf('.')===-1)){
      callback(new Error('请输入数字'))

    }else {
      callback()
    }
  },


}

export default {
  URL,
  deepCopy,
  setCookie,
  getCookie,
  deleteCookie,
  resolveTime,
  getTimeAmount,
  formValidator,
  resolvectime,
  unctime,
  getTime,
  getYear
}


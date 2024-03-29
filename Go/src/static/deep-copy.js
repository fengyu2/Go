//实现对象的深拷贝
const  DeepCopy = function (obj) {
  let newObjec = obj.constructor === Array ? []:{};
  newObjec.constructor = obj.constructor;
  if (typeof obj !== 'object') {
    return ;
  } else if (window.JSON){
    //若需要考虑特殊的数据类型，如正则，函数等，需把这个else if去掉即可
    newObjec = JSON.parse(JSON.stringify(obj));
  } else {
    for(let prop in obj){
      if(obj[prop].constructor === RegExp || obj[prop].constructor === Date){
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
export default DeepCopy


/**
 * 判断数据是否为json对象
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export default function isJson(obj){
    var isjson = typeof(obj) == "object" && 
      Object.prototype.toString.call(obj).toLowerCase() == "[object object]" &&
      !obj.length;

    return isjson;
}

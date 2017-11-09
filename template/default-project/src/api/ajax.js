import { getDeviceidAndToken } from './getHeaderRequest'
import { browserRedirect } from './util';
import axios from 'axios';
import {RootURL,tsURL,headerTest} from 'config/constants'
import isJson from './isJson.js'
/**
 * 统一处理 http 请求返回的数据非 JSON 的情况
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function httpErrorHandler(res) {
  if (!isJson(res)) {
    summer.toast({
      msg: "老板，服务器小哥跑去乘凉了，请稍等哦~"
    });

  }
}
let header;

if ($summer.os == 'pc') {
  header = {};
} else {
  header = getDeviceidAndToken();
}

/**
 * [ajax description] 统一封装 http 请求方案
 * @param  {[type]} paramObj        [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallback   [description]
 * @param  {[type]} haveFunFlag     [description]
 * @return {[type]}                 [description]
 */

export const ajax = (paramObj, successCallback, errorCallback, showLoading = false) => {
  //判断网络连接是否可用
  if ($summer.os != 'pc' && !summer.getNetworkInfo().Type) {
    summer.toast({
      msg: '网络连接不可用'
    });
    summer.refreshFooterLoadDone();
    summer.refreshHeaderLoadDone();
    summer.hideProgress();
    return;
  }
  // 修改 url 为经过拼接处理的 url
  if ($summer.os != 'pc') {
    paramObj.url = getPath(paramObj);
  }

  //ajax请求时 显示loading
  /**
   * window.ajaxLoadState 用以记录ajax的状态
   * init 初始状态 loading数据请求中 服务器还没有相应 success服务器相应请求成功 failed服务器相应请求失败
   * */
  if (window.ajaxLoadState) {
    window.ajaxLoadState = "loading";
    if (showLoading) {
      summer.showProgress();
    }
  }else {
    window.ajaxLoadState = "init";
    window.ajaxLoadState = "loading";
    if (showLoading) {
      summer.showProgress();
    }
  }
  if (browserRedirect() == "ios") {
    // IOS
    summerHTTP(paramObj, successCallback, errorCallback)
  } else {
    // browser or android
    axiosHTTP(paramObj, successCallback, errorCallback)
  }
}

/**
 * [summerHTTP description]
 * @return {[type]} [description]
 */
function summerHTTP(paramObj, successCallback, errorCallback) {
  //ios设置的超时
  window.cordovaHTTP.settings = {"timeout": 10000}
  if (paramObj.contentType) header["Content-Type"] = paramObj.contentType;
  const { type, url, param } = paramObj;
  summer.ajax({
    type: type,
    url: url,
    param: param,
    header: header // 考虑接口安全，每个请求都需要将这个公共header带过去
  }, function (response) {
    httpErrorHandler(response);

    var data = JSON.parse(response.data);
    var tokenerror = summer.getStorage("G-TOKEN-ERROR");

    if (tokenerror) return false
    if (data.code == "sys.token.error") {
      setGtoken();
      return false;
    }
    if (data.flag == 0) {
      window.ajaxLoadState = "success";
      summer.hideProgress();
    }else {
      window.ajaxLoadState = "failed";
    }
    summer.hideProgress();
    successCallback(data);
  }, function (response) {
    if (response.status && response.status != 200) {
      summer.toast({
        msg: '不好意思，服务器开小差了!'
      });
      summer.refreshFooterLoadDone();
      summer.refreshHeaderLoadDone();
      summer.hideProgress();
      return;
    }

    window.ajaxLoadState = "failed";
    summer.hideProgress();
    errorCallback(response)
  });

}

/**
 * 传contentType 的时候，http请求走 request body
 * @param  {[type]} url    [description]
 * @param  {[type]} header [description]
 * @return {[type]}        [description]
 */
export function axiosHTTP(paramObj, successCallback, errorCallback) {
  const { type, url, param } = paramObj;

  if ($summer.os == 'pc') header = headerTest;
  if (paramObj.contentType) header["Content-Type"] = paramObj.contentType;
  let reqParam = {
    method: type,
    url: url,
    headers: header,
    timeout: 10000  // 请求超过 10s , 请求将被中断
  }

    /*if (type.toUpperCase() == "POST") {
     // `data` is the data to be sent as the request body
     reqParam.data = param
     if (paramObj.contentType) header["Content-Type"] = paramObj.contentType;
     if(paramObj.isParam) reqParam.params = param
     } else {
     // `params` are the URL parameters to be sent with the request
     reqParam.params = param
     }*/

  if (paramObj.contentType) {
    // `data` is the data to be sent as the request body
    reqParam.data = param
  } else {
    // `params` are the URL parameters to be sent with the request
    reqParam.params = param
  }
  axios(reqParam).then(function (res) {
    httpErrorHandler(res);

    if (!( $summer.os == 'pc' )) {
      var tokenerror = summer.getStorage("G-TOKEN-ERROR");

      if (tokenerror) return false;
      if (res.data.code == "sys.token.error") {
        setGtoken();
        return false;
      } else {
        window.localStorage.removeItem('G-TOKEN-ERROR')
      }
    }
    if (res.data.flag == 0) {
      window.ajaxLoadState = "success";
      summer.hideProgress();
    }else {
      window.ajaxLoadState = "failed";
    }
    summer.hideProgress();
    successCallback(res.data)
  }).catch(function (e) {
      /*首页报错，直接跳转登录页关闭启动页*/
    if(url.indexOf('/auth/validate')>0){
      setGtoken()
    }else {
      console.log(e);
      console.log(e.response);
      if (e.response && e.response.status != 200) {
        summer.toast({
          msg: '不好意思，服务器开小差了!'
        });
        summer.refreshFooterLoadDone();
        summer.refreshHeaderLoadDone();
        summer.hideProgress();
        return;
      }
    }

    window.ajaxLoadState = "success";
    summer.hideProgress();
    errorCallback();
      /*if (e.response.status != 200) {
       summer.toast({
       msg: '不好意思，服务器开小差了!'
       });
       summer.hideProgress();
       return;
       }*/
  });
}

/**
 * [getPath description]
 * @return {[type]} [description]
 */
function getPath(params) {
  const { fullUrl, url } = params;

  if (fullUrl) {
    //fullUrl微信登录时调用微信的地址
    return url;
  } else {
      /*if (env == "dev") {
       return devRootURL + url;
       } else if (env == "prod") {
       return prodRootURL + url;
       }*/
    return RootURL + url;
  }
}

/**
 * [setGtoken description]
 */
function setGtoken() {
  // 设置token标志
  summer.setStorage("G-TOKEN-ERROR", true);
  // 清除userinfo，直接退出之后，再进入可以直接跳入到登录
  summer.rmStorage("userinfo");
  // 提示框
  summer.toast({
    msg: "您长时间未登录，请重新登录"
  });
   //全局去除遮罩层
   summer.hideProgress();
  //  退出有信
  var params = {
    "method": "YYIM.logout",
    "params": {}
  }
  cordova.exec(null, null, "XService", "callSync", [params]);

  // 跳转到登录页面
  setTimeout(function () {
    summer.openWin({
      id: "login",
      url: "Account/Login.html",
      "addKeyBoardListener": "_login.addKey()",
      isKeep: false
    });
  }, 500);
}

/**
 * 统一处理 http 请求返回的数据非 JSON 的情况
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function httpErrorHandler(res) {
  if (!isJson(res)) {
    summer.toast({
      msg: "老板，服务器小哥跑去乘凉了，请稍等哦~"
    });

    return false;
  }
}

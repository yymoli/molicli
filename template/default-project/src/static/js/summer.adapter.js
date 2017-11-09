
;(function(w){
    w.summer["cordova"] = w.cordova;
    w.summer.pageParam = {};

    w.summer.ajax = function(params,success,err){
        var testPath = "https://wstest.yonyoucloud.com";
        if (params.url == testPath+"/auth/validate"){
            success({
                "data" : JSON.stringify({
                    "data": {
                        "androidUpgradeUrl": "http://a.app.qq.com/o/simple.jsp?pkgname=com.yonyou.uclture",
                        "androidVersion": "1.1.0",
                        "bootPageUrl": "http://hongbao-cdn.yonyoucloud.com/uculture/app/good-image/yyfaxgroup.jpg",
                        "expiration": 1507964668092,
                        "forceUpgrade": false,
                        "iosUpgradeUrl": "http://a.app.qq.com/o/simple.jsp?pkgname=com.yonyou.uclture",
                        "iosVersion": "1.1.0",
                        "token": "c18e6581-db92-45fd-a069-5dd259e3eaa0"
                    },
                    "flag": 0
                })
            });
        }
    }
    w.summer.exitApp = function(){

    }
    w.summer.refreshFooterLoadDone = function(){

    }
    w.summer.refreshHeaderLoadDone = function(){}
    w.summer.hideProgress =function(){}
    w.summer.getNetworkInfo = function(){
        return {
            Type: 1
        }
    }
})(window);
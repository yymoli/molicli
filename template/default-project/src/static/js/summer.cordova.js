
;(function(w){

    if(navigator.platform.toLowerCase().indexOf("win")>= 0 || navigator.platform.toLowerCase().indexOf("mac")>= 0){
        // is pc
    }else{
        return;
    }

    w.cordova = {
        require:function(pluginName){
            //console.log(pluginName + " require done! ");
            return {
                handle: function(params, success, error){
                    try{
                        console.log('getPermission success done! params is ' + JSON.stringify(params));
                        if(typeof success == 'function'){
                            success();
                        }
                    }catch(e){
                        console.log('getPermission error done! params is ' + JSON.stringify(params));
                        if(typeof error == 'function'){
                            error();
                        }
                    }
                },
                getPermission: function(params, success, error){
                    this.handle(params, success, error);
                },
                openWin: function(params, success, error){
                    var url = window.location.origin + "/" + params.url;
                    if (params.isKeep == undefined || params.isKeep.toString() == "true") {
                        var childWindow = window.open(url);
                   
                        childWindow.addEventListener('DOMContentLoaded', function () {
                        //childWindow.document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                        debugger;
                        if (params.actionBar) {
                            var div = document.createElement("div");
                            var actionBar = params.actionBar;
                            var backgroundLeft = '../' + actionBar.leftItem.image;
                            var backFn = actionBar.leftItem.method ? actionBar.leftItem.method : "summer.closeWin()"
                            backFn = "document.getElementById('"+params.id + "_iframe"+"').contentWindow." + backFn;
                            var backgroundColor = actionBar.backgroundColor;
                            var header =
                                '<div class="um-header" style="position:absolute;top:0,left:0;z-index:9;background: ' + backgroundColor + '">' +
                                '<a class="um-header-left" onclick=' + backFn + ' >' +
                                '<img src="' + backgroundLeft + '" alt="" style="width: 24px;height: 24px">' +
                                '</a>' +
                                '<h3 style="color:' + actionBar.titleColor + '">' + actionBar.title + '</h3>' +
                                '</div>'
                            div.innerHTML = (header);
                        }
                        childWindow.document.body.appendChild(div.children[0]);
                        childWindow.document.body.style.marginTop="44px";
                        return;
                        var um_win = childWindow.document.querySelector(".um-win");
                        var um_header = childWindow.document.querySelector(".um-header");
                        if(um_header){
                            um_header.insertBefore(div.childNodes[0], um_header.childNodes[0]);
                        }else{
                            um_win.insertBefore(div.childNodes[0], um_win.childNodes[0]);
                        }
                    }, false);
                            
                    }else{
                        window.location.href = window.location.origin + "/" +params.url;
                    }
                },
                openWin2: function(params, success, error){
                    //this.proxy(params, success, error);
                    //debugger;
                    window.open(params.url);
                    return;

                    if(1==1){

                        var parent = window.parent;

                        while(window != window.parent && parent && parent.parent && parent.parent != parent){
                            
                                parent = parent.parent;
                            
                        }
                        if(parent){
                            window.winManager = parent.winManager;//初始化当前window的winManager
                        }
                    }


                    /*
                    点击之前判断  是否已经打开过
                     */
                    var flag = false;
                    for(var i = 0; i<winManager.windows.length;i++){
                        if(winManager.windows[i].id == params.id){
                            flag = true;
                            break;
                        }
                    }
                    if( flag ) {
                        winManager.changePage(params);
                    }else {
                        if (params.isKeep == undefined || params.isKeep.toString() == "true") {
                            //window.open(window.location.origin + "/" +params.url, 'newwindow', 'height=400, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
                            /*
                             var isIE = (document.all) ? true: false; //这里仅仅简单的对是否是IE进行判断，详细浏览器判断：请参考浏览器类型侦测
                             var ua = navigator.userAgent.toLowerCase().match(/msie ([/d.] + ) / )[1];
                             if (ua == "9.0") {
                             isIE = false;
                             }
                             var oFrame = isIE ? document.createElement("<iframe name=/"" + this._FrameName + " / ">") : document.createElement("iframe");
                             oFrame.name = "iframName";
                             */
                            var newDom = document.createElement("div");
                            newDom.setAttribute("id", params.id);
                            newDom.setAttribute("class", "um-win");
                            if (params.actionBar) {
                                var actionBar = params.actionBar;
                                var backgroundLeft = '../' + actionBar.leftItem.image;
                                var backFn = actionBar.leftItem.method ? actionBar.leftItem.method : "summer.closeWin()"
                                backFn = "document.getElementById('"+params.id + "_iframe"+"').contentWindow." + backFn;
                                var backgroundColor = actionBar.backgroundColor;
                                var header =
                                    '<div class="um-header active" style="background: ' + backgroundColor + '">' +
                                    '<a class="um-header-left" onclick=' + backFn + ' >' +
                                    '<img src="' + backgroundLeft + '" alt="" style="width: 24px;height: 24px">' +
                                    '</a>' +
                                    '<h3 style="color:' + actionBar.titleColor + '">' + actionBar.title + '</h3>' +
                                    '</div>'
                                newDom.innerHTML = (header);
                            }
                            var content = document.createElement("div");
                            content.setAttribute("class", "um-content");
                            content.style.overflow = "hidden";
                            var iframe = document.createElement("iframe");
                            iframe.setAttribute("id", params.id + "_iframe");
                            iframe.setAttribute("src", window.location.origin + "/" + params.url);
                            //iframe.setAttribute("style","z-index:999;position:absolute;top:0;left:0;width:100%;height:100%;border:0px;");
                            iframe.setAttribute("style", "width:100%;height:100%;border:0px;");

                            content.appendChild(iframe);
                            newDom.appendChild(content);
                            document.body.appendChild(newDom);
                            //document.body.insertBefore(iframe, document.body.querySelector('.um-win'));
                            document.__WinId = params.id;
                            params.window = window;
                            winManager.windows.push(params);
                            winManager.changePage(params);
                        }else{
                            window.location.href = window.location.origin + "/" +params.url;
                        }
                    }
                },
                closeWin: function(param){
                    debugger;
                    var id = param ? param.id : null;
                    //1、DOM消除
                    var curWin = window;
                    var frm = curWin.document.getElementById(id);
                    if(param && id) {
                        while (!frm && curWin != curWin.parent) {
                            curWin = curWin.parent;
                            frm = curWin.document.getElementById(id);
                        }
                        if (frm) {
                            frm.parentNode.removeChild(frm);
                        } else {
                            alert("closeFrame 警告！没有frame[" + id + "]")
                        }
                    }else{
                        curWin = curWin.parent;
                        frm = curWin.document.getElementById(id);

                        if (frm) {
                            frm.parentNode.removeChild(frm);
                        } else {
                            var currId = curWin.winManager.windows[curWin.winManager.windows.length-1].id;
                            var frm2 = curWin.document.getElementById(currId);
                            frm2.parentNode.removeChild(frm2);
                        }
                    }
                    //2、windows出栈
                    curWin.winManager.windows.pop();
                },

                openFrameGroup: function(params, success, error){
                    //var id = winManager.frameGroups[winManager.frameGroups.length-1].id;

                    winManager.frameGroups.push(params);

                    //创建多个frame
                    for(var i = 0, len = params.frames.length;i<len;i++){
                        if(params.index == i){
                            this.createFrame(params, params.frames[i],success, error, true);    
                        }else{
                            this.createFrame(params, params.frames[i],success, error, false);
                        }
                    }

                    //设置index对应的frame可见


                },
                setFrameGroupAttr:function(params){
                    if(params.id){
                        var index = params.index
                        var group = winManager.getFrameGroupById(params.id); 
                        var old = group.index;
                        group.index = index;

                        //设置对应的iframe 显示，其余的隐藏
                        var div = document.getElementById(group.frames[index].id);
                        div.classList.add("active");
                        div.classList.remove("inactive");
                        

                        var div2 = document.getElementById(group.frames[old].id);
                        div2.classList.add("inactive");
                        div2.classList.remove("active");

                        //div.setAttribute("class", cls);
                    }
                    
                },
                openFrame: function(params, success, error){
                    var flag = false;
                    if(winManager.frames!=null){
                        for(var i = 0; i<winManager.frames.length;i++){
                            if(winManager.frames[i].id == params.id){
                                flag = true;
                                break;
                            }
                        }
                    }
                    if( flag ) {
                        winManager.changePage(params);
                    }else {
                        var curWin = winManager.getCurrentWin();
                        if(curWin){
                            params.winId = curWin.id;
                        }
                        

                        this.createFrame(null, params, success, error, true);

                        params.window = window;
                        winManager.frames.push(params);
                        
                    }
                },
                createFrame: function(gparams, params, success, error, visible){
                    
                        //window.open(window.location.origin + "/" +params.url, 'newwindow', 'height=400, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
                        /*
                         var isIE = (document.all) ? true: false; //这里仅仅简单的对是否是IE进行判断，详细浏览器判断：请参考浏览器类型侦测
                         var ua = navigator.userAgent.toLowerCase().match(/msie ([/d.] + ) / )[1];
                         if (ua == "9.0") {
                         isIE = false;
                         }
                         var oFrame = isIE ? document.createElement("<iframe name=/"" + this._FrameName + " / ">") : document.createElement("iframe");
                         oFrame.name = "iframName";
                         */
                        var top = 0;
                        var bottom = 0;
                        if(gparams){
                            top = gparams.position.top;
                            bottom = gparams.position.bottom;
                        }else{
                            top = params.position.top;
                            bottom = params.position.bottom;
                        }


                        var newDom = document.createElement("div");
                        newDom.setAttribute("id", params.id);
                        if(visible){
                            newDom.setAttribute("class", "um-iframe active");
                        }else{
                            newDom.setAttribute("class", "um-iframe inactive");
                        }
                        newDom.setAttribute("style", "top:" + top + "px" + ";bottom:" + bottom + "px");

                        var iframe = document.createElement("iframe");
                        iframe.setAttribute("id", params.id + "_iframe");
                        iframe.setAttribute("src", window.location.origin + "/" + params.url);
                        //iframe.setAttribute("style","z-index:999;position:absolute;top:0;left:0;width:100%;height:100%;border:0px;");
                        iframe.setAttribute("style", "width:100%;height:100%;border:0px;");

                        newDom.appendChild(iframe);
                        if(visible && false){
                            debugger;
                            var iframes_act = document.querySelectorAll(".um-iframe.active");
                            if(iframes_act){
                                for(var i=0,len=iframes_act.length;i<len;i++){
                                    iframes_act[i].classList.add("inactive");
                                    iframes_act[i].classList.remove("active");
                                }
                            }
                        }
                        document.body.appendChild(newDom);
                        //document.body.insertBefore(iframe, document.body.querySelector('.um-win'));
                        
                        return newDom;


                    
                },
                closeFrame: function(params){
                    var id = params.id;

                    //1、DOM消除
                    var curWin = window;
                    var frm = curWin.document.getElementById(id);
                    while(!frm && curWin != curWin.parent){
                        curWin = curWin.parent;
                        frm = curWin.document.getElementById(id);
                    }
                    if(frm){
                        frm.parentNode.removeChild(frm);
                    }else{
                        alert("closeFrame 警告！没有frame["+id+"]")
                    }

                    //2、Frame出栈
                    curWin.winManager.frames.pop();

                },
                execScript: function(params){
                    //debugger;
                    /*
                    {
                      id:'root',
                      script:'pub_changeShowState()'
                    }
                    */
                    var the_win = window;
                    if(params.id == "root"){
                        while(the_win.parent != the_win){
                            the_win = the_win.parent;
                        }
                        
                    }else{
                        alert(params.id);
                    }
                    /*
                    if(typeof the_win[params.script.substring(0,params.script.indexOf("("))] == "function"){
                        the_win.eval(pub_changeShowState);
                    }
                    */
                    the_win.eval(params.script);

                },
                removeStartPage: function(params, success, error){
                    this.handle(params, success, error);
                },
                call: function(){
                    this.handle();
                },
                getNetworkInfo:function(){
                    return {
                        Type : true
                    }
                },
                getDeviceInfo:function(){
                    return{
                        deviceId:"69T7N15823020185867875020178155"
                    }
                },
                toast: function(){
                    return {
                        call: function(){
                            
                        }
                    }
                },
                showProgress: function(){

                },
                hideProgress: function(){

                },
                setRefreshHeaderInfo: function(json, successFn, errFn){
                    try{
                        successFn();
                    }catch(e){
                        if(typeof errFn == "function")
                            errFn();
                        else
                            alert(e);
                    }
                },
                refreshHeaderLoadDone: function(json, successFn, errFn){
                    try{
                        if(typeof successFn == "function")
                            successFn();
                    }catch(e){
                        if(typeof errFn == "function")
                            errFn();
                        else
                            alert(e);
                    }
                },
                setRefreshFooterInfo: function(json, successFn, errFn){
                    try{
                        successFn();
                    }catch(e){
                        if(typeof errFn == "function")
                            errFn();
                        else
                            alert(e);
                    }
                },
                refreshFooterLoadDone: function(json, successFn, errFn){
                    try{
                        if(typeof successFn == "function")
                            successFn();
                    }catch(e){
                        if(typeof errFn == "function")
                            errFn();
                        else
                            alert(e);
                    }
                }

            };
        },
        exec:function(){

        }
        
    }



    w.summerBridge = {
        callSync: function(srvName,strJson){
            var result = {};
            if(srvName == "UMDevice.getDeviceInfo"){
                result = {
                    "deviceid":"69T7N15823020185867875020178155"
                }
            }else if(srvName=="XUpgrade.getAppVersion"){
                result = {"versionName":"1.1.0"}
            }
            return JSON.stringify(result);
        }
    }
    w.Wechat = {
        isInstalled:  function(){
                
        }
    }
})(window);
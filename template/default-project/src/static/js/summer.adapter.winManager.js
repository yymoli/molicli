
;(function(w){

    if(navigator.platform.toLowerCase().indexOf("win")>= 0 || navigator.platform.toLowerCase().indexOf("mac")>= 0){
        // is pc
    }else{
        return;
    }

    w.winManager = {
        windows : [],//{id,frameId,frameGroupId}
        frames: [],//{id,winId,frameGroupId}
        frameGroups:[],//{id,winId}
        changePage:function(params){
            UM.win._init();
            UM.win.changePage({
                target: "#" + params.id,
                isReverse: 0,
                transition: "um"
            })
        },
        back:function(){
            UM.win.back();
        },
        getFrameGroupById: function(id){
            for(var i=0,len=this.frameGroups.length;i<len;i++){
                if(this.frameGroups[i].id == id){
                    return this.frameGroups[i];
                }
            } 
        },
        getFrameById:function(id){
            for(var i=0,len=this.frames.length;i<len;i++){
                if(this.frames[i].id == id){
                    return this.frames[i];
                }
            } 
        },
        getWinById:function(id){
            for(var i=0,len=this.windows.length;i<len;i++){
                if(this.windows[i].id == id){
                    return this.windows[i];
                }
            } 
        },
        getCurrentWin: function(){
            return this.windows[this.windows.length-1];
        }


    };
})(window);
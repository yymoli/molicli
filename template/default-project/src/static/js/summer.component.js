
;(function(w){
   
    w.ComponentManager = function(params,success,err){
        
        this._components = {};//has
        this._dataModel = {};
        this._metaDataModel = {};

    }

    w.ComponentManager.prototype.getComponentById = function(id){
        return this._components[id];
    }
    w.ComponentManager.prototype.getComponentsByName = function(name){
        var ret = [];
        for(var i=0,len=this_components.length;i<len;i++){
            if(this._components[i].componentName == name){
                ret.push(this._components[i]);
            }
        }
        return ret;
    }
    w.ComponentManager.prototype.getDataModel = function(){
        return this._dataModel;
    }
    w.ComponentManager.prototype.getMetaData = function(){
        return this._metaDataModel;   
    }

    w.ComponentManager.prototype.requestComponent = function(params){
        //向后台请求指定组件
        if(!params){
            params = {
                name: "orderList"
                params:
            }
        }
    }
    w.ComponentManager.prototype.execComponentAction = function(params){
        //执行指定组件的一个Action
        if(!params){
            params = {
                componentId: "orderList",
                componentName: "orderList",
                componentAction: "load"
                componentParams:{
                    id: "20171017001"
                },
                callback: function(){}
            }
        }

        var com = this.getComponentById(params.componentId);
        com.execAction(params);

    }
    













    w.ComponentBase = function(params,success,err){
        this._dataModel = {};
        this._metaDataModel = {};
        this._actions = {
            "load": {
                "actionType" : "CRUD",
                "actionParams" : {
                    "id" : "20171017001"
                }
            },
            "numVerify": {
                "actionType" : "custome",
                "actionName" : function(){

                },
                "actionParams" : {}
            }
        }
    }
    w.ComponentBase.prototype.init = function(data, metaData, actions){
        //加载数据、元数据、Action列表
        this._dataModel = data;
        this._metaDataModel = metaData;
        this._actions = actions;

    }
    w.ComponentBase.prototype.Mounting = function(){
        constructor()
        componentWillMount()
        render()
        componentDidMount()

    }
    w.ComponentBase.prototype.updating = function(){
        componentWillReceiveProps()
        shouldComponentUpdate()
        componentWillUpdate()
        render()
        componentDidUpdate()
    }
    w.ComponentBase.prototype.execAction = function(params){
        params = params ? params : {
            actionName: "load",
            actionParams : {id : "20171017001"}
        };

        var act = this._actions[params.actionName];
        if(typeof act == "function"){
            var ret = act(params.actionParams);
            if(typeof params.callback == "function"){
                params.callback(ret);
            }
        }else{
            console.log("the component[" +params.actionName+ "] has not a action which name is " + params.actionName);
        }
    }
    w.ComponentBase.prototype.Unmounting = function(){
        componentWillUnmount()
    }
    
    w.ComponentBase.prototype.receiveNotify = function(){
        
    }
    w.ComponentBase.prototype.setUIModel = function(){
        
    }

   
    
})(window);



var componentMgr = new ComponentManager();
componentMgr.init({

})
componentMgr.ajax({
    
})








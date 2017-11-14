
import BusinessComponent from './BusinessComponent.js';

class ComponentManager {
	constructor() {
    	this._components = {};
    	this._componentsStack = [];
        this._componentsConf = {};
	}

	init(conf){
        this._componentsConf = conf;
		for(id in this._components){
			let com = this._components[id];
			com.init();
		}

		console.log("init");
	}
 	getComponentById(id) {
    	return this._components[id];
  	}

  	getComponentsByName(name){
	    var ret = [];
	    for(var i=0,len=this_components.length;i<len;i++){
	        if(this._components[i].componentName == name){
	            ret.push(this._components[i]);
	        }
	    }
	    return ret;
	}
    

    requestComponent(params){
        //向后台请求指定组件
        if(!params){
            params = {
                name: "orderList",
                params: ""
            }
        }
    }
    execComponentAction(params){
        //执行指定组件的一个Action
        if(!params){
            params = {
                componentId: "orderList",
                componentName: "orderList",
                componentAction: "load",
                componentParams:{
                    id: "20171017001"
                },
                callback: function(){}
            }
        }

        var com = this.getComponentById(params.componentId);
        com.execAction(params);

    }

    openComponent(params){
        //执行指定组件的一个Action
        if($summer.os != "pc"){
            summer.openComponent(params);
            return false;
        }
        if(!params){
            params = {
                componentId: "orderList",
                componentName: "orderList",
                componentOpenType: "createAndOpen",// createAndOpen | openIfExists | openIfExistOrCreateOpen 
                componentParams:{
                    id: "20171017001"
                },
                callback: function(){}
            }
        }
        //this.request(params);

        

        var div = document.createElement("div");
        div.setAttribute("id", params.componentId);
       
        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", params.componentId + "_iframe");
        var startPage = params.componentParams.startPage;
        if(!startPage.indexOf(window.location.origin)){
        	startPage = window.location.origin + "/" + startPage;
        }
        
        iframe.setAttribute("src", startPage);
        iframe.setAttribute("style", "z-index:99;position:absolute;top:0px;left:0px;width:100%;height:100%;border:0px;");

        div.appendChild(iframe);
       
        document.body.appendChild(div);

        iframe.contentWindow["data_params"] = JSON.stringify(params.componentParams);

        var com = this.getComponentById(params.componentId);
        if(com){
        	com.openComponent();
		}
        var bc = new BusinessComponent();
        bc.init(params);
        this._components[params.componentName] = bc;
        bc.componentDidMount();
    }

    closeComponent(params){
        if($summer.os != "pc"){
            summer.closeComponent(params);
            return false;
        }
		var bc = this._components[params.componentId];
		bc.unmount();
		delete this._components[params.componentId];

		//删除iframe
		var div = document.getElementById(params.componentId);
		div.parentNode.removeChild(div);

    }

    request(params){
        //执行指定组件的一个Action
        if(!params){
            params = {
                componentId: "orderList",
                componentName: "orderList",
                componentAction: "load",
                componentParams:{
                    id: "20171017001"
                },
                callback: function(){}
            }
        }
        
        ajax(params, function(){

        });
        

    }

}
    
	



export default ComponentManager;
//export let b = 2;
//export let c =3;

/*
//示例代码
class NewsListComponent extends ComponentBase {  
 	constructor(x, y, z) {  
    	super(x, y, z);
  	}

  	load(id) {  
  		let params = {
	        actionName: "load",
	        actionParams : {id : "20171017001"}
	    }


	    ComponentManager.ajax(params,function(){

	    });



	}  
}  




var newslist = NewsListComponent(); 
newslist.load();
    
curComponentManager = new ComponentManager();
   
    


*/



















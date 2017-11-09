class BusinessComponent {
	constructor() {
        this._startPage = "";
        this._settings = {};
        this._actions = {
            "load": {
            	"url" : "https://aiserver.yonyoucloud.com/kb/s",
                "requesetType" : "get",
                "actionParams" : {
                    "id" : "20171017001"
                }
            },
            "": {
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

	init(params){
		this._settings = params;
	}

	runAction(params,callback){
        params = params ? params : {
            actionName: "load",
            actionParams : {id : "20171017001"}
        };

        var actObj = this._actions[params.actionName];
        if(actObj){

            this.ajax({
            	"type" : actObj.requestType,
            	"url" : actObj.url,
            	"params": actionParams
            },function(ret){

            	if(actObj.callback)
            		actObj.callback();
            },function(ret){

            })
            var ret = act(params.actionParams);
            if(typeof callback == "function"){
                callback(ret);
            }
        }else{
            console.log("the component[" +params.actionName+ "] has not a action which name is " + params.actionName);
        }
    }


	execAction(params){
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


	
    openComponent(){

    }
    componentWillMount(){

    }
    componentDidMount(){
    	//请求数据和元数据
    }

    componentWillUpdate(){

    }
    componentDidUpdate(){

    }

    unmount(){
        
    }
}

export default BusinessComponent;

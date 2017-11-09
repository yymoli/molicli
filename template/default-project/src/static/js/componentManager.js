"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


	var ComponentManager = function () {
		function ComponentManager() {
			_classCallCheck(this, ComponentManager);

			this._components = {};
			this._componentsStack = [];
		}

		_createClass(ComponentManager, [{
			key: "init",
			value: function init() {
				for (id in this._components) {
					var com = this._components[id];
					com.init();
				}

				console.log("init");
			}
		}, {
			key: "getComponentById",
			value: function getComponentById(id) {
				return this._components[id];
			}
		}, {
			key: "getComponentsByName",
			value: function getComponentsByName(name) {
				var ret = [];
				for (var i = 0, len = this_components.length; i < len; i++) {
					if (this._components[i].componentName == name) {
						ret.push(this._components[i]);
					}
				}
				return ret;
			}
		}, {
			key: "requestComponent",
			value: function requestComponent(params) {
				//向后台请求指定组件
				if (!params) {
					params = {
						name: "orderList",
						params: ""
					};
				}
			}
		}, {
			key: "execComponentAction",
			value: function execComponentAction(params) {
				//执行指定组件的一个Action
				if (!params) {
					params = {
						componentId: "orderList",
						componentName: "orderList",
						componentAction: "load",
						componentParams: {
							id: "20171017001"
						},
						callback: function callback() {}
					};
				}

				var com = this.getComponentById(params.componentId);
				com.execAction(params);
			}
		}, {
			key: "openComponent",
			value: function openComponent(params) {
				debugger;
				//执行指定组件的一个Action
				if (!params) {
					params = {
						componentId: "orderList",
						componentName: "orderList",
						componentOpenType: "createAndOpen", // createAndOpen | openIfExists | openIfExistOrCreateOpen 
						componentParams: {
							id: "20171017001"
						},
						callback: function callback() {}
					};
				}
				//this.request(params);


				var div = document.createElement("div");
				div.setAttribute("id", params.componentId);

				var iframe = document.createElement("iframe");
				iframe.setAttribute("id", params.componentId + "_iframe");
				var startPage = params.startPage;
				if (!startPage.indexOf(window.location.origin)) {
					startPage = window.location.origin + "/" + startPage;
				}

				iframe.setAttribute("src", startPage);
				iframe.setAttribute("style", "z-index:99;position:absolute;top:0px;left:0px;width:100%;height:100%;border:0px;");

				div.appendChild(iframe);

				document.body.appendChild(div);

				var com = this.getComponentById(params.componentId);
				if (com) {
					com.openComponent();
				}
				var bc = new BusinessComponent();
				bc.init(params);
				this._components[params.componentName] = bc;
				bc.componentDidMount();
			}
		}, {
			key: "closeComponent",
			value: function closeComponent(params) {
				var bc = this._components[params.componentId];
				bc.unmount();
				delete this._components[params.componentId];

				//删除iframe
				var div = document.getElementById(params.componentId);
				div.parentNode.removeChild(div);
			}
		}, {
			key: "request",
			value: function request(params) {
				//执行指定组件的一个Action
				if (!params) {
					params = {
						componentId: "orderList",
						componentName: "orderList",
						componentAction: "load",
						componentParams: {
							id: "20171017001"
						},
						callback: function callback() {}
					};
				}

				ajax(params, function () {});
			}
		}]);

		return ComponentManager;
	}();

	var BusinessComponent = function () {
		function BusinessComponent() {
			_classCallCheck(this, BusinessComponent);

			this._startPage = "";
			this._settings = {};
			this._actions = {
				"load": {
					"url": "https://aiserver.yonyoucloud.com/kb/s",
					"requesetType": "get",
					"actionParams": {
						"id": "20171017001"
					}
				},
				"": {
					"actionType": "CRUD",
					"actionParams": {
						"id": "20171017001"
					}
				},
				"numVerify": {
					"actionType": "custome",
					"actionName": function actionName() {},
					"actionParams": {}
				}
			};
		}

		_createClass(BusinessComponent, [{
			key: "init",
			value: function init(params) {
				this._settings = params;
			}
		}, {
			key: "runAction",
			value: function runAction(params, callback) {
				params = params ? params : {
					actionName: "load",
					actionParams: { id: "20171017001" }
				};

				var actObj = this._actions[params.actionName];
				if (actObj) {

					this.ajax({
						"type": actObj.requestType,
						"url": actObj.url,
						"params": actionParams
					}, function (ret) {

						if (actObj.callback) actObj.callback();
					}, function (ret) {});
					var ret = act(params.actionParams);
					if (typeof callback == "function") {
						callback(ret);
					}
				} else {
					console.log("the component[" + params.actionName + "] has not a action which name is " + params.actionName);
				}
			}
		}, {
			key: "execAction",
			value: function execAction(params) {
				params = params ? params : {
					actionName: "load",
					actionParams: { id: "20171017001" }
				};

				var act = this._actions[params.actionName];
				if (typeof act == "function") {
					var ret = act(params.actionParams);
					if (typeof params.callback == "function") {
						params.callback(ret);
					}
				} else {
					console.log("the component[" + params.actionName + "] has not a action which name is " + params.actionName);
				}
			}
		}, {
			key: "openComponent",
			value: function openComponent() {}
		}, {
			key: "componentWillMount",
			value: function componentWillMount() {}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				//请求数据和元数据
			}
		}, {
			key: "componentWillUpdate",
			value: function componentWillUpdate() {}
		}, {
			key: "componentDidUpdate",
			value: function componentDidUpdate() {}
		}, {
			key: "unmount",
			value: function unmount() {}
		}]);

		return BusinessComponent;
	}();

	/*window.ComponentManager = ComponentManager;
	window.curComponentManager = new ComponentManager();
	window.gct = "index";
	window.BusinessComponent = BusinessComponent;*/


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

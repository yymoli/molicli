import ComponentManager from './ComponentManager.js';

(function(w){
	//业务组件配置清单，一个应用运行时，需要动态加载一个业务组件清单
	var conf = {
		"Corp" : {
			"actionList":[{
				"actionName":"load",
				"controllerName":"/userlink/getMyCorpUser"
			}]
		},
		"cardView" : {
			"actionList":[{
				"actionName":"save",
				"url":""
			}]
		}
	}
	w.appComponentManager = new ComponentManager(conf);
})(window);

export { appComponentManager };
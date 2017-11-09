
(function(w){

	if(!window.appComponentManager){
        if(window != window.parent){
	        var parentWindow = window.parent;
	        while(parentWindow && parentWindow.parent && parentWindow.parent != parentWindow){
	            
	                parentWindow = parentWindow.parent;
	            
	        }
	        if(parentWindow){

	            window.appComponentManager = parentWindow.appComponentManager;//初始化当前window的winManager
	        }
    	}
    }else{
    	debugger;
    	alert('you are the main app, componentManager is created success !')
    }

})(window);

//export { appComponentManager };
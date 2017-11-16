import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// import ajax
import { ajax } from 'api/ajax';
//import CardMobile from '../../components/Card/CardMobile'
//import CardPc from '../../components/Card/CardPc'
import Card  from 'widget/Card/Card'
import List from '../../components/List/List'
 
import WgtPanel from '../../Workbench/components/WgtPanel/WgtPanel';
import './index.css'
import {Router,Route,IndexRoute,hashHistory,Link} from 'react-router';

class ComponentBase extends Component{

  constructor(props, context) {
    super(props, context);
  };

  componentDidMount(){

  };

  render() {
    return (
      <div className="ComponentBase">基类
        <Crop/>
       
      </div>
    )
  }
}

class Crop extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      metaData:{},
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
    this.init();
  }
   init = () => {
    if($summer.os=='pc'){
     this.ajaxRquest();
    }else{
      summer.on("ready",this.ready);
    }
  }
  ready = () => {
    this.ajaxRquest();
  }

  listClick =(id) =>{
    let param = {
      componentId: "cardView",
      componentName: "cardView",
      componentOpenType: "createAndOpen",// createAndOpen | openIfExists | openIfExistOrCreateOpen
      componentParams:{
        id: id,
        startPage: "../FI/Home.html"
      },
      callback: function(){}
    };
    summer.openComponent(param);
  }

  ajaxRquest =(n=1) => {
    let _this = this;
    let param = {
      "pageNum" : n
    };
    let ua = navigator.userAgent;
    let osType = {
      ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
    }
    let os = $summer.os;
    if(osType.ios){
      os = "ios";
    }else if(osType.android){
      os="android";
    }
    //debugger;
    ajax({
      "type": "get",
      //"url": "/userlink/getMyCorpUser",
      "url": "/moli-demo/rest/uiView",
      /*"param":{
       "meta": JSON.stringify({
            "clientType": os,
            "componentId":"list001"
        }), */
       // "id":"just a demo"
       "param":{
       		 "componentCode":"demo",
	       "viewCode":"demo",
	       "deviceType":"PC"
       },
      
    },function(data){
      //if (data.flag == 0){
	        if(data.metas){
	        	var os=$summer.os;
	        	var metasFianal=data.metas.demo.properties;
	        	metasFianal.clientType=os;
	          _this.setState({metaData : metasFianal});
	        }
	        var listData = data.views.User.records;
	        _this.setState({data : listData});
    //  }else{  // 请求成功但数据格式错误
    //    summer.toast({
    //      msg : data.msg
   //     });
     // }
    },function(res){
      console.log(res);
    });
  } 
  closeFn =() => {
    
        summer.closeComponent({
            componentId: "Corp"
        });
  }
  render() {
    let content=null;
    if(this.state.data.length==0){
      content= <img src="../static/img/preload.png" alt="" className="loading-img"/>
    }else {
		 
			 content=<List data={this.state.data} metaData={this.state.metaData}  />
		   
     
    }
    return (
      <div className="um-win">
        <div className="um-header">
          <a href="#" className="um-back" onClick={this.closeFn}>返回</a>
          <h3>联系人</h3>
        </div>
     
        <div className="um-content"  id="umcontent" >
          	{content}
             
        </div>
      </div>
    )
  }
}
//ReactDOM.render(<Crop/>, document.querySelector("#app"))
ReactDOM.render((
    <Router history={hashHistory}>
         <Route path="/" component={Crop}/>
          <Route path="/Card"  component={Card}/>
           
    </Router>

    ),document.body
);
 
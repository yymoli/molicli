import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// import ajax
import { ajax } from 'api/ajax';
import List from '../../components/List/List'
import './index.css'

class ComponentBase extends Component{

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(){

  }

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
      num : 1,
      flagData : false,
      isAjax:false
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
    this.init();
    //this.ajaxRquest();
  }
  init = () => {
    if($summer.os=='pc'){
      this.ajaxRquest(10);
    }else{
      summer.on("ready",this.ready);
    }
  }
  ready = () => {
    let _this = this;
    //this.ajaxRquest();
    let id = "1";//随便设置一个
    if(summer.getStorage('userinfo')){
      id=summer.getStorage('userinfo').id;
    }
    let myCorp=summer.getStorage(id+'myCorp') ? summer.getStorage(id+'myCorp'):[];
    if(myCorp && myCorp.length !=0){
      _this.setState({
        data:myCorp,
        isAjax:true
      })
    }else {
      _this.ajaxRquest();
    }
    summer.setRefreshHeaderInfo({
      visible: true,
      bgColor: '#ffffff',
      textColor: '#4d4d4d',
      textDown: '下拉刷新...',
      textUp: '松开刷新...',
      showTime: true,
      autoRefresh: false
    }, function (ret, err) {
      _this.ajaxRquest();
      summer.refreshHeaderLoadDone();
    });
    // 上拉刷新
    summer.setRefreshFooterInfo({
      visible: true,
      bgColor: '#ffffff',
      textColor: '#4d4d4d',
      textDown: '下拉刷新...',
      textUp: '松开刷新...',
      showTime: true,
    }, function (ret, err) {
      _this.ajaxRquest(_this.state.num + 1);

    });
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
      //"url": "/user/load",
      "url": "/userlink/getMyCorpUser",
      "param":{
        "meta": JSON.stringify({
            "clientType": os,
            "componentId":"list001"
        }),
        "id":"just a demo"
      },
    },function(data){
      //debugger;
      _this.setState({
        isAjax:true
      })
      if (data.flag == 0){
        if(data.metaData){
          _this.setState({metaData : data.metaData});
        }
        var listData = data.data;
        if (n == 1){
          if(summer.getStorage('userinfo')){
            let id=summer.getStorage('userinfo').id;
            summer.setStorage(id+'myCorp',listData);
          }
          _this.setState({data : listData});
          _this.setState({num : 1});
          _this.setState({flagData:true});
        }else{
          summer.refreshFooterLoadDone();
          if(!listData.length){
            summer.toast({
              msg : "没有数据了"
            });
            return;
          }
          let num = _this.state.num;
          num += 1;
          _this.setState({num : num});
          let dataArr = _this.state.data;
          let conData = dataArr.concat(listData);
          _this.setState({data : conData});
        }
      }else{  // 请求成功但数据格式错误
        summer.toast({
          msg : data.msg
        });
      }
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
    if(this.state.data.length==0 && !this.state.isAjax){
      content= <img src="../static/img/preload.png" alt="" className="loading-img"/>
    }else {
      content=<List data={this.state.data} flagData={this.state.flagData} metaData={this.state.metaData} listFn={this.listClick}/>
    }
    return (
			<div className="um-win">
        <div className="um-header">
                    <a href="#" className="um-back" onClick={this.closeFn}>返回</a>
                    <h3>联系人</h3>
        </div>
        <div className="um-content">
          {content}
        </div>
			</div>
    )
  }
}
//ReactDOM.render(<Crop/>, document.querySelector("#app"))
ReactDOM.render(<ComponentBase/>, document.querySelector("#app"))


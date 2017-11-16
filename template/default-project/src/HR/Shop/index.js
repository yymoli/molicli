import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// import ajax
import { ajax } from 'api/ajax';
import Card from '../../components/Card/Card2'
import List from '../../components/List/ListTable'
import './index.css'

class Crop extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      metaData:{},
      columns: [
        { title: '头像222', dataIndex: 'avatar', key: 'avatar', width: 100 },
        { title: '姓名', dataIndex: 'name', key: 'name', width: 200, className:"um-blue"},
        { title: '手机号', dataIndex: 'mobile', key: 'mobile', width: 200 },
        { title: '公司邮箱', dataIndex: 'email', key: 'email', width: 200 },
        { title: '公司', dataIndex: 'companyName', key: 'companyName', width: 200 },
      ],
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
      "url": "/userlink/getMyCorpUser",
      "param":{
        "meta": JSON.stringify({
            "clientType": os,
            "componentId":"list001"
        }),
        "id":"just a demo"
      },
    },function(data){
      if (data.flag == 0){
        if(data.metaData){
          _this.setState({metaData : data.metaData});
        }
        var listData = data.data;
        _this.setState({data : listData});
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
    if(this.state.data.length > 0){
      content=<List data={this.state.data} metaData={this.state.metaData} columns={this.state.columns} listFn={this.listClick}/>
    }
    return (
      <div className="um-win">
        <div className="um-header">
          <a href="#" className="um-back" onClick={this.closeFn}>返回</a>
          <h3>联系人</h3>
        </div>

        <div className="um-content p15">
          <Card />
          {content}
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Crop/>, document.querySelector("#app"))


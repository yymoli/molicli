import React,{ Component} from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';
import NavBar from '../../../components/NavBar/index.js'
import Icon from '../../../components/Icon/index'
import './WgtPanel.css'
class WgtPanel extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            allData:{},
            metaData:{}
        }
    }

  
    componentWillReceiveProps(nextProps) {
      
 	 }
      

	 componentDidMount() {
        this.init();
    }

    init = () => {
        if ($summer.os == 'pc') {
            this.getData();
        } else {
            summer.on("ready", this.getData);
        }
    }
    getData = () => {
        let _this = this;
        // 这里应该是上一个页面传过来的
        let id = this.state.data_params && this.state.data_params.id ? this.state.data_params.id : 4;
        ajax({
            "type": "get",
            //"url": "/user/find",
            "url": "/userlink/header",
            "dataType": 'json',
            "param":{
                "meta": JSON.stringify({
                    "clientType": $summer.os,
                     
                }),
                
            },
        },function(data){
        	_this.setState({
                    allData: data
                });
           /* if(JSON.parse(data).flag == 0){
                let allData = data;
                _this.setState({
                    allData: allData
                });
                let metaData = data.metaData;
                _this.setState({
                    metaData: metaData
                });
            }*/

        },function(res){
            console.log(res);
        });
    }
    handleChange =(key,e) => {
        let _this = this;
        let allD = _this.state.allData;

        allD[key] = e.target.value;
        _this.setState({
            allData: allD
        });
        _this.props.changeFn(allD)
    }
    openComponent =(id) =>{
        //debugger;
		 if(id%2 == 1){
 
            summer.openComponent({
              componentId: "Corp",
              componentName: "Corp",
              componentOpenType: "createAndOpen",// createAndOpen | openIfExists | openIfExistOrCreateOpen
              componentParams:{
                id: id,
                startPage: "../HR/Home.html"
              },
              callback: function(){}
            });

        }else if(id%2==0){
            summer.openComponent({
              componentId: "cardView",
              componentName: "cardView",
              componentOpenType: "createAndOpen",// createAndOpen | openIfExists | openIfExistOrCreateOpen
              componentParams:{
                id: id,
                startPage: "../FI/Home.html"
              },
              callback: function(){}
            });

        }else{
            console.log("开发中")
        }
       
    }
 	onLeftClick=()=>{
 		alert('leftClick');
 	}
    render() {
        let data = this.state.allData;
         let _this = this;
         let mode,iconname,title;
         if(JSON.stringify(data) != "{}"){
	          mode = data.data.mode;
	         iconname = <Icon type={data.data.leftIconName} />;
	       	 title=data.data.children;
         }
        return (
        	<div className="um-win">
        		<div className="um-header">
        			<NavBar 
        				 mode={mode}
        				 iconName={iconname}
        				 onLeftClick={this.onLeftClick}
        			>{title}</NavBar>
        		</div>	
	         	<div className="um-content">
	         		 <div className="mt20">
		                <div className="um-row">
		                    <div className="um-lg-12 um-md-12 um-sm-12 um-xs-12">
		                        <div className="um-list-item-inner">
		                            <div className="um-wgt-group-title">代办</div>
		                        </div>
		                    </div>
		                </div>
		                <div className="um-row">
		                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
		                        <div className="um-list-item-inner" onClick={()=>{_this.openComponent(1)}}>
		                            <img src="../static/img/wgt/gmail.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
		                        <div className="um-list-item-inner" onClick={()=>{_this.openComponent(2)}}>
		                            <img src="../static/img/wgt/dimission.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
		                        <div className="um-list-item-inner" onClick={()=>{_this.openComponent(3)}}>
		                            <img src="../static/img/wgt/task.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
		                        <div className="um-list-item-inner" onClick={()=>{_this.openComponent(4)}}>
		                            <img src="../static/img/wgt/stock.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                    <div className="um-lg-2 um-md-2 um-sm-3 um-xs-6">
		                        <div className="um-list-item-inner" onClick={()=>{_this.openComponent(5)}}>
		                            <img src="../static/img/wgt/bangongcaigou.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                    <div className="um-lg-2 um-md-2 um-sm-3 um-xs-6">
		                        <div className="um-list-item-inner" onClick={()=>{_this.openComponent(6)}}>
		                            <img src="../static/img/wgt/zhijipingding.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
		                        <div className="um-list-item-inner" onClick={()=>{_this.openComponent(7)}}>
		                            <img src="../static/img/wgt/dimission.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                </div>
		
		
		                <div className="um-row">
		                    <div className="um-lg-12 um-md-12 um-sm-12 um-xs-12">
		                        <div className="um-list-item-inner">
		                            <div className="um-wgt-group-title">我的工作</div>
		                        </div>
		                    </div>
		                </div>
		
		
		                <div className="um-row">
		                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
		                        <div className="um-list-item-inner">
		                            <img src="../static/img/wgt/task.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                    <div className="um-lg-2 um-md-2 um-sm-3 um-xs-6">
		                        <div className="um-list-item-inner">
		                            <img src="../static/img/wgt/bangongcaigou.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                    <div className="um-lg-2 um-md-2 um-sm-3 um-xs-6">
		                        <div className="um-list-item-inner">
		                            <img src="../static/img/wgt/zhijipingding.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                </div>   
		
		
		                <div className="um-row">
		                    <div className="um-lg-12 um-md-12 um-sm-12 um-xs-12">
		                        <div className="um-list-item-inner">
		                            <div className="um-wgt-group-title">我的日常</div>
		                        </div>
		                    </div>
		                </div>
		
		
		                <div className="um-row">
		                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
		                        <div className="um-list-item-inner">
		                            <img src="../static/img/wgt/gmail.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                    <div className="um-lg-2 um-md-2 um-sm-3 um-xs-6">
		                        <div className="um-list-item-inner">
		                            <img src="../static/img/wgt/zhijipingding.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                </div>   
		
		
		                <div className="um-row">
		                    <div className="um-lg-12 um-md-12 um-sm-12 um-xs-12">
		                        <div className="um-list-item-inner"><div className="um-wgt-group-title">我的关注</div></div>
		                    </div>
		                </div>
		                <div className="um-row">
		                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
		                        <div className="um-list-item-inner">
		                            <img src="../static/img/wgt/task.jpg" className="um-wgt-icon"/>
		                        </div>
		                    </div>
		                </div>    
		            </div>
	            </div>
	         </div>
        )
    }
}

export default WgtPanel ; 
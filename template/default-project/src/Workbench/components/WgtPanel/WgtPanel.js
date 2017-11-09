import React,{ Component} from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';

import './WgtPanel.css'
class WgtPanel extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            allData:{},
            metaData:{}
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        let allData = nextProps.data;
        let metaData = nextProps.metaData;
        this.setState({
            allData: allData,
            metaData: metaData
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
 
    render() {
        let data = this.state.allData;
        let metaData = this.state.metaData;
        let _this = this;
        return (
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
        )
    }
}

export default WgtPanel ; 
import React,{ Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';
import Card from '../../components/Card/Card';

import "./index.css"
class ContactsDetails extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            allData: {},
            metaData: {},
            changeData:{},
            data_params:{},
            btn_disabled:true
        }
    }

    componentWillMount(){
        if(window.data_params){
            var data_param = $summer.strToJson(window.data_params);
            this.setState({
                data_params: data_param
            })
        }

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
        //接受参数
        if($summer.os=="ios" || $summer.os=="android"){
            var data_param = summer.pageParam;
            this.setState({
                data_params: data_param
            })
        }


        let _this = this;
        // 这里应该是上一个页面传过来的
        let id = this.state.data_params && this.state.data_params.id ? this.state.data_params.id : 4;
        ajax({
            "type": "get",
            //"url": "/user/find",
            "url": "/userlink/getContactsDetails",
            "param":{
                "meta": JSON.stringify({
                    "clientType": $summer.os,
                    "componentId":"card001"
                }),
                "id":id
            },
        },function(data){
            if(typeof data == "string"){
                data = JSON.parse(data);
            }
            if(data.flag == 0){
                let allData = data.data;
                _this.setState({
                    allData: allData
                });

                let metaData = data.metaData;
                _this.setState({
                    metaData: metaData
                });
            }

        },function(res){
            console.log(res);
        });
    }

    closeFn =() => {
        summer.closeComponent({
            componentId: "cardView"
        });
    }

    save () {
        let data = this.state.changeData;
        if(!data.id){
            //alert("数据未发生bian hu")
        }
        ajax({
            "type": "post",
            //"url": "/user/find",
            "url": "/userlink/save",
            "param":{
                "data":JSON.stringify(data)
            },
        },function(data){
            if(data.msg == "success"){
                alert("保存成功!");
            }else{
                alert(data.msg);
            }
            

        },function(res){
            console.log(res);
        });
    }

    changeFn = (allD) => {
        this.setState({
            changeData: allD,
            btn_disabled:false
        });

    }

    render() {
        let _this = this;
        return (
            <div className="um-win">
                <div className="um-header">
                    <a href="#" className="um-back" onClick={this.closeFn}>返回</a>
                    <h3>联系人</h3>
                </div>
                <div className="um-content">
                    <Card data={this.state.allData} metaData={this.state.metaData} changeFn = {this.changeFn}/>
                </div>
                <div className="um-footer">
                    <div className="um-lg-2 um-md-2 um-sm-3 um-xs-12" style={{"float":"right"}}>
                        <button className="um-btn" style={{borderRadius:"0px"}} disabled={this.state.btn_disabled} onClick={()=>{_this.save()}}>保存</button>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<ContactsDetails/>, document.querySelector("#app"))

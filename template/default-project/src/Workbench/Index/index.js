import React,{ Component} from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';
import appComponentManage from 'api/appComponentManager.js'
import WgtPanel from '../components/WgtPanel/WgtPanel';
import {Router,Route,IndexRoute,hashHistory,Link} from 'react-router';
import "./index.css"
class WorkSpace extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            allData: {},
            metaData: {},
            changeData:{},
            data_params:{}
        }
    }

    componentWillMount(){
        //debugger;
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
        appComponentManager.closeComponent({
            componentId: "cardView"
        });
    }

    save = () => {
        let data = this.state.changeData;

    }

    changeFn = (allD) => {
        alert("开发中...")
    }

    render() {
        return (
            /*<div className="um-win">
                <div className="um-header">
                    
                    <h3>我的工作台</h3>
            					<div style={{color: 'white',backgroundColor:'#ffffff'}}>
            	                    <Link to="/">--主页--</Link>
            	                    <Link to="/Story">--个人信息--</Link>
            	                    <Link to="/Travel">--系统设置</Link>
                    </div>
                </div>
            
            				 <div className="um-content">
                     {this.props.children}    
                </div>
                <div className="um-footer">
                    
                </div>
            </div> */
           <div >
           		{this.props.children}    
           </div>
            
        )
    }
}

//ReactDOM.render(<WorkSpace/>, document.querySelector("#app"))
ReactDOM.render((
    <Router history={hashHistory}>
        <Route exact path="/" component={WorkSpace}>
               <IndexRoute component={WgtPanel}/>
				 
        </Route>
    </Router>
    ),document.body
);


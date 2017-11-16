import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Card  from 'widget/Card/Card'
//import CardPc from '../../components/Card/CardPc'
 
import {Router,Route,IndexRoute,hashHistory,Link} from 'react-router';

import './list.css';

class ContentList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            columns: [
                {type: "Image",lable:"头像"},
                {type: "String",lable:"姓名"},
                {type: "String",lable:"手机号"},
                {type: "String",lable:"公司邮箱"},
                {type: "String",lable:"公司"},
            ],
            metaData:{

            }
        }
    }

    componentDidMount() {
        let metaData = this.props.metaData;
        this.setState({
            metaData: metaData
        })
    }
    componentWillReceiveProps(nextProps) {
        let metaData = nextProps.metaData;
        this.setState({
            metaData: metaData
        })
    }

    openWin = (r) => {
        let _this = this;
        return function () {
            let yxId = r.id;
            _this.props.listFn(yxId);
        }
    }
    renderHeader = () => {
        var _this = this;
        let metaData = _this.props.metaData
        //元数据title
        let name_title = "姓名";
        if(metaData&&metaData.name_title&&metaData.name_title.name)
            name_title = metaData.name_title.name;
        
		let name_style=metaData.name_title.name
        let phone_title = "手机号";
        if(metaData&&metaData.phone_title&&metaData.phone_title.name){
            phone_title = metaData.phone_title.name;
        }

        let avatar_title = "头像";
        if(metaData&&metaData.avatar_title&&metaData.avatar_title.name){
            avatar_title = metaData.avatar_title.name;
        }

        let departmentName_title = "部门";
        if(metaData&&metaData.departmentName&& metaData.departmentName.name){
            departmentName_title = metaData.departmentName.name;
        }
        //元数据class
        let classStyle1="th1 um-bf1";
        if(metaData.avatar_title&&metaData.avatar_title.display){
        	classStyle1 = metaData.avatar_title.display=="none"?"th1 um-bf1 none":"th1 um-bf1";
        };
        let classStyle2="th1 um-bf1";
        if(metaData.name_title&&metaData.name_title.display){
        	classStyle2 = metaData.name_title.display=="none"?"th1 um-bf1 none":"th1 um-bf1";
        };
        let classStyle3="th1 um-bf1";
        if(metaData.phone_title&&metaData.phone_title.display){
        	classStyle3 = metaData.phone_title.display=="none"?"th1 um-bf1 none":"th1 um-bf1";
        };
        let classStyle4="th1 um-bf1";
        if(metaData.departmentName&&metaData.departmentName.display){
        	classStyle4 = metaData.departmentName.display=="none"?"th1 um-bf1 none":"th1 um-bf1";
        }
        //元数据样式
         let avatar_title_style="";
        if(metaData&&metaData.avatar_title&&metaData.avatar_title.style){
        	avatar_title_style=JSON.parse(metaData.avatar_title.style);
        }
        let name_title_style="";
        if(metaData&&metaData.avatar_title&&metaData.avatar_title.style){
        	name_title_style=JSON.parse(metaData.name_title.style);
        }
        let phone_title_style="";
        if(metaData&&metaData.avatar_title&&metaData.avatar_title.style){
        	phone_title_style=JSON.parse(metaData.phone_title.style);
        }
        let departmentName_title_style="";
        if(metaData&&metaData.avatar_title&&metaData.avatar_title.style){
        	departmentName_title_style=JSON.parse(metaData.departmentName.style);
        }
        let headerArr =  
         <div className="um-box">
            <div className={classStyle1} style={avatar_title_style}>{avatar_title}</div>
            <div className={classStyle2} style={name_title_style}>{name_title}</div>
            <div className={classStyle3} style={phone_title_style}>{phone_title}</div>
            <div className={classStyle4} style={departmentName_title_style}>{departmentName_title}</div>
        </div>
    /*    metadata.map(function (item, index) {
				if(!_this.state.metaData){
                    _this.state.metaData = {};
                }
                if(!_this.state.metaData.title){
                    _this.state.metaData.title = {};
                }
                if(!_this.state.metaData.name){
                    _this.state.metaData.name = {};
                }
                if(!_this.state.metaData.phone){
                    _this.state.metaData.phone = {};
                }
                headerArr.push(
                      <div className="th1 um-bf1"  style={item.style}>{item.title}</div>
                );
        });*/
        return headerArr;
    }
    renderTabContent = () => {
        let _this = this;
        let data = this.props.data;
		 let metaData = _this.props.metaData
        let tabContentArray = [];
        data.map(function (item, index) {
            if($summer.os != "pc"){
            	let classStyleDisplay1="";
	           if(metaData&&metaData.avatar_title&&metaData.avatar_title.display)
	            classStyleDisplay1 = metaData.avatar_title.display;
	            let classStyleDisplay2="";
	           if(metaData&&metaData.name_title&&metaData.name_title.display)
	            classStyleDisplay2 = metaData.name_title.display;
	            let classStyleDisplay3="";
	           if(metaData&&metaData.phone_title&&metaData.phone_title.display)
	            classStyleDisplay3 = metaData.phone_title.display;
	            let classStyleDisplay4="";
	           if(metaData&&metaData.departmentName&&metaData.departmentName.display)
	            classStyle4 = metaData.departmentName.display=="none"?"td1 um-bf1 um-box-center none":"td1 um-bf1 um-box-center";
                 
       
                tabContentArray.push(
                   <Link key={index} to={{pathname:"/Card" ,query:{item:JSON.stringify(item)}}} className="list-item">
                        <div className="list-item-inner um-box-center">
                            <div className="ibox" className={classStyleDisplay1}   >
                                <img src={item.avatar} alt=""/>
                            </div>
                            <div className="cbox">
                                <dl>
                                    <dt style={_this.state.metaData.name} className={classStyleDisplay2} >{item.name}</dt>
                                    <dt  className={classStyleDisplay3} style={_this.state.metaData.departmentName}>{item.departmentName}</dt>
                                    <dt className={classStyleDisplay4} style={_this.state.metaData.phone}>{item.phone}</dt>
                                </dl>

                            </div>
                        </div>
                    </Link>
                );
            }else{
				let classStyle1="td1 um-bf1 um-box-center";
	           if(metaData&&metaData.avatar_title&&metaData.avatar_title.display)
	           		classStyle1 = metaData.avatar_title.display=="none"?"td1 um-bf1 um-box-center none":"td1 um-bf1 um-box-center";
	            let classStyle2="td1 um-bf1 um-box-center";
	           if(metaData&&metaData.name_title&&metaData.name_title.display)
	            classStyle2 = metaData.name_title.display=="none"?"td1 um-bf1 um-box-center none":"td1 um-bf1 um-box-center";
	            let classStyle3="td1 um-bf1 um-box-center";
	           if(metaData&&metaData.phone_title&&metaData.phone_title.display)
	            classStyle3 = metaData.phone_title.display=="none"?"td1 um-bf1 um-box-center none":"td1 um-bf1 um-box-center";
	            let classStyle4="td1 um-bf1 um-box-center";
	           if(metaData&&metaData.departmentName&&metaData.departmentName.display)
	            classStyle4 = metaData.departmentName.display=="none"?"td1 um-bf1 um-box-center none":"td1 um-bf1 um-box-center";
                 
                tabContentArray.push(
                    <Link key={index}  to={{pathname:"/Card" ,query:{item:JSON.stringify(item)}}}  className="um-box um-line">
                          
                        <div className={classStyle1}   >
                            <img src={item.avatar} alt=""/ >
                        </div>
                        <div className={classStyle2}   >{item.name ? item.name : "..."}</div>
                        <div className={classStyle4}   >{item.phone ? item.phone : "..."}</div>
                         <div className={classStyle3}   >{item.departmentName}</div>
                    </Link>
                );
            }
        });
        return tabContentArray;
    }

    render() {
        let type = this.state.metaData.clientType;
        let header = null;
        if(type == "pc"){
            header = this.renderHeader()
        }
        return (
            <div className="list um-content">
                <div className="header">
                
                    	{header}
                 
                </div>
                <div className="content">
                        {this.renderTabContent()}
                </div>
            </div>
        );
        
    }
};
ContentList.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
 

 
export default ContentList;
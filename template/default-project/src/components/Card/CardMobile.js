import React,{ Component} from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'api/ajax.js';

import './CardMobile.css'
class CardMobile extends Component {
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
        let allData =JSON.parse( this.props.location.query.item);
        let metaData = nextProps.metaData;
        this.setState({
            allData: allData,
            metaData: metaData
        });
    }

    handleChange =(key,e) => {
        //debugger;
        let _this = this;
        let allD = _this.props.params;

        allD[key] = e.target.value;
        _this.setState({
            allData: allD
        });
        _this.props.changeFn(allD)
    }

    render() {
        //debugger;
        let data = this.state.allData;
        let metaData = this.state.metaData;

        let name_title = "姓名";
        if(metaData&&metaData.com&&metaData.com.name&&metaData.com.name.title)
            name_title = metaData.com.name.title;
        

        let mobile_title = "手机号";
        if(metaData&&metaData.com&&metaData.com.mobile&&metaData.com.mobile.title){
            mobile_title = metaData.com.mobile.title;
        }

        let email_title = "邮箱";
        if(metaData&&metaData.com&&metaData.com.email&&metaData.com.email.title){
            email_title = metaData.com.email.title;
        }

        let companyName_title = "公司";
        if(metaData&&metaData.com&&metaData.com.companyName&&metaData.com.companyName.title){
            companyName_title = metaData.com.companyName.title;
        }
        
        return (
        <div className="um-win">
        <div className="um-header">
          <a href="#" className="um-back" onClick={this.closeFn}>返回</a>
          <h3>联系人详情(移动设备)</h3>
        </div>
        <div className="um-content"  id="umcontent" >
          	  <div className="mt20">
                <div className="um-row">
                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
                        <div className="um-list-item-inner">
                            <div className="um-list-item-left">
                                {name_title}
                            </div>
                            <div className="um-list-item-right">
                                <input type="text" disabled={metaData&&metaData.com&&metaData.com.name&&metaData.com.name.disabled} style={metaData&&metaData.com&&metaData.com.name&&metaData.com.name.style} className="form-control" value={data.userName} onChange={(e)=>this.handleChange("name",e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
                        <div className="um-list-item-inner">
                            <div className="um-list-item-left">
                                {mobile_title}
                            </div>
                            <div className="um-list-item-right">
                                <input type="text" disabled={metaData&&metaData.com&&metaData.com.mobile&&metaData.com.mobile.disabled} style={metaData&&metaData.com&&metaData.com.mobile&&metaData.com.mobile.style} className="form-control" value={data.mobile}  onChange={(e)=>this.handleChange("mobile",e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
                        <div className="um-list-item-inner">
                            <div className="um-list-item-left">
                                {email_title}
                            </div>
                            <div className="um-list-item-right">
                                <input type="text" disabled={metaData&&metaData.com&&metaData.com.email&&metaData.com.email.disabled} style={metaData&&metaData.com&&metaData.com.email&&metaData.com.email.style} className="form-control" value={data.email}  onChange={(e)=>this.handleChange("email",e)}/>
                            </div>
                        </div>
                    </div>
        
                    <div className="um-lg-4 um-md-4 um-sm-6 um-xs-12">
                        <div className="um-list-item-inner">
                            <div className="um-list-item-left">
                                {companyName_title}
                            </div>
                            <div className="um-list-item-right">
                                <input type="text" disabled={metaData&&metaData.com&&metaData.com.companyName&&metaData.com.companyName.disabled} style={metaData&&metaData.com&&metaData.com.companyName&&metaData.com.companyName.style} className="form-control" value={data.companyName}  onChange={(e)=>this.handleChange("companyName",e)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             
        </div>
      </div>
           
        )
    }
}

export default CardMobile ; 
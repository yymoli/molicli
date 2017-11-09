import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

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

    componentWillReceiveProps(nextProps) {
        let metaData = nextProps.metaData;
        this.setState({
            metaData: metaData
        })
    }

    componentWillMount() {

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
        let headerArr =
        <div className="um-box">
            <div className="th1 um-bf1">头像</div>
            <div className="th2 um-bf2">姓名</div>
            <div className="th3 um-bf2">手机号</div>
            <div className="th4 um-bf2">公司邮箱</div>
            <div className="th5 um-bf2">公司</div>
        </div>
        return headerArr;
    }
    renderTabContent = () => {
        let _this = this;
        let data = this.props.data;

        let tabContentArray = [];
        data.map(function (item, index) {
            if(_this.state.metaData.clientType != "pc"){
                if(!_this.state.metaData.com){
                    _this.state.metaData.com = {};
                }
                if(!_this.state.metaData.com.userName){
                    _this.state.metaData.com.userName = {};
                }
                if(!_this.state.metaData.com.companyName){
                    _this.state.metaData.com.companyName = {};
                }
                if(!_this.state.metaData.com.mobile){
                    _this.state.metaData.com.mobile = {};
                }
                tabContentArray.push(
                    <div key={index} onClick={_this.openWin(item)} className="list-item">
                        <div className="list-item-inner um-box-center">
                            <div className="ibox">
                                <img src={item.avatar} alt=""/>
                            </div>
                            <div className="cbox">
                                <dl>
                                    <dt style={_this.state.metaData.com.userName}>{item.userName}</dt>
                                    <dt className="company-name" style={_this.state.metaData.com.companyName}>{item.companyName}</dt>
                                    <dt style={_this.state.metaData.com.mobile}>{item.mobile}</dt>
                                </dl>

                            </div>
                        </div>
                    </div>
                );
            }else{
                tabContentArray.push(
                    <div key={index} onClick={_this.openWin(item)} className="um-box">
                        <div className="td1 um-bf1 um-box-center">
                            <img src={item.avatar} alt=""/>
                        </div>
                        <div className="td2 um-bf2 um-box-center" style={_this.state.metaData.com.name}>{item.name ? item.name : "..."}</div>
                        <div className="td3 um-bf2 um-box-center">{item.mobile ? item.mobile : "..."}</div>
                        <div className="td4 um-bf2 um-box-center">{item.email ? item.email : "..."}</div>
                        <div className="td5 um-bf2 um-box-center">{item.companyName}</div>
                    </div>
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
        )
    }
}

ContentList.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default ContentList;
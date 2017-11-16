import React,{ Component} from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import Button from 'bee-button';

import 'bee-button/build/Button.css'
import './Card2.css'
class Card extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            allData:{},
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    handleChange =(key,e) => {
        //debugger;
        let _this = this;
        let allD = _this.state.allData;

        allD[key] = e.target.value;
        _this.setState({
            allData: allD
        });
        _this.props.changeFn(allD)
    }

    render() {
        let data = this.state.allData;
        return (
            <div className="">
                <div className="um-box">
                    <h4 className="" style={{lineHeight:"44px"}}>员工入职</h4>
                    <div className="tr um-bf1">
                        <button className="btn btn-inline btn-default" style={{marginRight:"15px"}}>添加正式员工</button>
                        <button className="btn btn-inline">添加新员工</button>
                    </div>
                </div>
                <div className="um-row">
                    <div className="um-lg-4 um-md-4">
                        <div className="um-list-item-inner um-box">
                            <div className="um-list-item-left">
                                入职状态
                            </div>
                            <div className="um-list-item-right">
                                <input type="text" className="form-control" value={data.userName} onChange={(e)=>this.handleChange("name",e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="um-lg-4 um-md-4">
                        <div className="um-list-item-inner um-box">
                            <div className="um-list-item-left">
                                所属部门
                            </div>
                            <div className="um-list-item-right">
                                <input type="text" className="form-control" value={data.mobile}  onChange={(e)=>this.handleChange("mobile",e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="um-lg-4 um-md-4">
                        <div className="um-list-item-inner um-box">
                            <div className="um-list-item-left">
                                姓名
                            </div>
                            <div className="um-list-item-right">
                                <input type="text" className="form-control" value={data.email}  onChange={(e)=>this.handleChange("email",e)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card ; 
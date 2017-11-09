import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Table from 'bee-table';

import "bee-table/build/Table.css"
import './list.css';

class ContentList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            columns: [
                { title: '头像', dataIndex: 'avatar', key: 'avatar', width: 100 },
                { title: '姓名', dataIndex: 'name', key: 'name', width: 200 },
                { title: '手机号', dataIndex: 'mobile', key: 'mobile', width: 200 },
                { title: '公司邮箱', dataIndex: 'email', key: 'email', width: 200 },
                { title: '公司', dataIndex: 'companyName', key: 'companyName', width: 200 },
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

    render() {
        let type = this.state.metaData.clientType;
        let data = this.props.data;

        let body = null;
        if(type == "pc"){
            body = <div></div>
        }
        return (
            <div className="list um-content">
                <Table
                    columns={this.state.columns}
                    data={data}
                />
            </div>
        )
    }
}

ContentList.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default ContentList;
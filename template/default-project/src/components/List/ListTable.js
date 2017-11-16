import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Table from 'bee-table';
import Checkbox from 'bee-checkbox'

import "bee-table/build/Table.css"
import  "bee-checkbox/build/Checkbox.css"
import './list.css';

const { ColumnGroup, Column } = Table;

const defaultProps = {
    columns: [
        { title: '头像', dataIndex: 'avatar', key: 'avatar', width: 100 },
        { title: '姓名', dataIndex: 'name', key: 'name', width: 200, className:"um-blue"},
        { title: '手机号', dataIndex: 'mobile', key: 'mobile', width: 200 },
        { title: '公司邮箱', dataIndex: 'email', key: 'email', width: 200 },
        { title: '公司', dataIndex: 'companyName', key: 'companyName', width: 200 },
    ],

}

class ContentList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activePage: 1
        }
    }

    componentDidMount() {
        let metaData = this.props.columns;
        this.setState({
            columns: columns
        })
    }

    handleSelect =() => {

    }

    render() {
        let { data } = this.props;
        let { columns } = this.props;
        data.map(function(item,index){
          item.key = index;
        });
        let listData = {
            1 : data,
            2 : data
        }
        return (
            <div className="list um-content">
                <Table
                    data={data}
                    columns={columns}
                >
                </Table>

            </div>
        )
    }
}

ContentList.defaultProps = defaultProps;

export default ContentList;
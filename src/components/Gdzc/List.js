import React, { PropTypes, Component } from 'react'
import * as actions from '../../redux/actions';
import accounting from 'accounting';

import {ButtonGroup, Button, DropdownButton, MenuItem, Input, ButtonToolbar} from 'react-bootstrap';

class List extends Component {
  static propTypes = {
    filter: React.PropTypes.object,
    items: PropTypes.array
  }
  static defaultProps = {
    items: []
  }
  componentDidMount() {
    this.props.dispatch(actions.fetchItems(this.props.filter));
  }

  render () {
    return (
      <div>
      	<div className="page-header pull-left">
      		<h1>
      			固定资产列表
      			<small>
      				<i className="ace-icon fa fa-angle-double-right"></i>
      			</small>
      		</h1>
      	</div>
      	<div className="pull-right">
      		<div className="nav-search" id="nav-search">
      	    <form className="form-search">
              <span className="input-icon">
                  <input type="text" style={{width:'250px'}} placeholder="搜索资产名称／标签号" className="nav-search-input" id="nav-search-input" ref="filter"/>
                  <i className="ace-icon fa fa-search nav-search-icon"></i>
              </span>
      		  </form>
      		</div>
      	</div>
      	<div className="row">
          <div className="col-xs-12 hidden">
          <div className="well">
            <h4>筛选条件</h4>
            <form className="form-inline">
              <label className="inline">
                <span className="lbl"> 购置年份：</span>
                <select>
                  <option>2011</option>
                </select>
              </label>
              <label className="inline">
                <span className="lbl"> 管理人：</span>
                <select>
                  <option>2011</option>
                </select>
              </label>
              <label className="inline">
                <span className="lbl"> 领用人：</span>
                <select>
                  <option>2011</option>
                </select>
              </label>
              <label className="inline">
                <input type="checkbox" />
                <span className="lbl"> 只显示待报废资产</span>
              </label>
              <label className="inline">
                <input type="checkbox" />
                <span className="lbl"> 只显示大型设备</span>
              </label>
            </form>
          </div>
          </div>
          <div className="col-xs-12" >
            {
              this.props.items ? this.props.items.map(item => (
                <div className="well" key={item._id}>
                  <h4>{item['设备名称']}</h4>
                  <dl className="dl-horizontal">
                    <dt>金额</dt>
                    <dd>{accounting.formatMoney(item.Yz, '¥')}元</dd>
                    <dt>标签号</dt>
                    <dd>{item.Bqh}</dd>

                  </dl>
                </div>
              )) : null
            }
            <Button bsStyle="primary" block>加载更多</Button>
          </div>
      	</div>
      </div>
    )
  }
}

export default List

import Info from './Info';
import $ from 'jquery';
import * as actions from '../../../redux/actions';
import {Button} from 'react-bootstrap';

import React from 'react';

export default class Index extends React.Component {

	static propTypes = {
		moreAcceptors: React.PropTypes.func.isRequired,
		setAcceptorListFilter: React.PropTypes.func.isRequired,
		data: React.PropTypes.array.isRequired,
		yearRange: React.PropTypes.array.isRequired
	};
  static defaultProps = {
  	data: [],
  	yearRange: []
  };

  componentDidMount() {
		if(this.props.data.length <= 0){
			this.props.moreAcceptors();
		}
  }
	setFilters() {
		this.props.setAcceptorListFilter({
			project: this.refs.project.value,
			year: this.refs.year.value,
			filter: this.refs.filter.value
		});
		this.props.moreAcceptors();
	}

  render() {
		return (
<div>
	<div className="page-header pull-left">
		<h1>
			捐赠管理
			<small>
				<i className="ace-icon fa fa-angle-double-right"></i>
				受赠者列表
			</small>
		</h1>
	</div>
	<div className="pull-right">
		<div className="nav-search" id="nav-search">
	    <form className="form-search">
        <span className="input-icon">
            <input type="text" style={{width:'250px'}} placeholder="搜索姓名／电话／证件号码" onChange={this.setFilters.bind(this)} className="nav-search-input" id="nav-search-input" ref="filter"/>
            <i className="ace-icon fa fa-search nav-search-icon"></i>
        </span>
        <select defaultValue={this.props.project} onChange={this.setFilters.bind(this)} ref="project">
					<option value="">全部项目</option>
					<option value="奖学金">奖学金</option>
					<option value="助学金">助学金</option>
					<option value="其他">其他</option>
				</select>
				<select defaultValue="" onChange={this.setFilters.bind(this)} ref="year">
					<option value="">全部年份</option>
					{
						this.props.yearRange.map(year => (<option value={year} key={year}>{year}</option>))
					}
				</select>
		  </form>
		</div>
	</div>
	<div className="row">
		
		
		<div className="col-xs-12 col-sm-9 col-sm-offset-2">
		{
			this.props.data.map(acceptor => {
				return <Info {...acceptor} key={acceptor._id} />;
			})
		}
		</div>
		<div className="col-xs-12 col-sm-9 col-sm-offset-2">
			{
				this.props.data.length < this.props.count
					? <Button bsStyle="primary" block={true} onClick={this.props.moreAcceptors}>更多（{this.props.data.length}/{this.props.count}）</Button>
					: null
			}
		</div>
	</div>
</div>
		);
  }
}
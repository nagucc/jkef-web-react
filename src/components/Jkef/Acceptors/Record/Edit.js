import React from 'react';
import $ from 'jquery';
import moment from 'moment';

export default class Edit extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    acceptorId: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
    	date: moment().format('YYYY-MM-DD')
    };
  }

  getValueFieldHandler (name) {
		return (e) => {
			var value = e.target.value;
			console.log(value);
			var states = {};
			states[name] = value;
			this.setState(states);
		};
	}

	submit() {

		/*
		初始化时，state中不会包含select组件中的值，在提交之前应该先进行设置。
		*/
		if(!this.state.project) {
			this.state.project = $('#project').val();
		}
		console.log(this.state);
		if(this.props._id) {			// 更新
			$.ajax(`/api/jkef/acceptors/${this.props.acceptorId}/records/${this.props._id}`, {
				method: 'post',
				xhrFields: {
			  	withCredentials: true
			  },
				data: this.state
			}).done((result)=>{
				//window.location = '/acceptors/detail/' + this.props.acceptorId;
				console.log(result);
			}).fail((err) => {
				alert(`更新失败：${err.responseText}`);
			});
		} else {						// 新增
			$.ajax(`/api/jkef/acceptors/${this.props.acceptorId}/records`,{
				method: 'put',
				xhrFields: {
			  	withCredentials: true
			  },
				data: this.state
			}).done(result => {
				console.log(result);
			}).fail(err => {
				alert(`创建数据时出现错误：${err.responseText}`);
			})
		}
	}

  render() {
    return (
<div className="main-content">
	<div className="main-content-inner">
		<div className="page-content">
			<div className="row">
				<div className="page-header pull-left">
					<h1>
						<span>{this.props.name}</span>
						<small>
							<i className="ace-icon fa fa-angle-double-right"></i>
							添加奖助记录
						</small>
					</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<div className="form-horizontal">
						<div className="form-group">
					    <label className="col-sm-2 control-label">日期</label>
					    <div className="col-sm-10">
					      <input type="date" defaultValue={this.state.date} className="form-control" onChange={this.getValueFieldHandler('date')} />
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-sm-2 control-label">项目</label>
					    <div className="col-sm-10">
					    	<select id="project" className="form-control" onChange={this.getValueFieldHandler('project')}> 
					    		<option value="奖学金">奖学金</option>
					    		<option value="助学金">助学金</option>
					    		<option value="其他">其他</option>
					    	</select>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-sm-2 control-label">金额</label>
					    <div className="col-sm-10">
					      <input type="number" className="form-control" onChange={this.getValueFieldHandler('amount')}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-sm-2 control-label">推荐人</label>
					    <div className="col-sm-10">
					      <input type="text" className="form-control" onChange={this.getValueFieldHandler('recommander')}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-sm-2 control-label">备注</label>
					    <div className="col-sm-10">
					      <input type="text" className="form-control" onChange={this.getValueFieldHandler('remark')}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <div className="col-sm-offset-2 col-sm-2 col-xs-6">
					      <button className="btn btn-primary" onClick={this.submit.bind(this)}>
					      	<i className="ace-icon fa fa-check"></i>
					      	确定
					      </button>
					    </div>
					    <div className="col-sm-2 col-xs-6">
					      <a className="btn btn-success" href={`/acceptors/detail/${this.props.acceptorId}`}>
					      	<i className="ace-icon fa fa-backward"></i>
					      	返回
					      </a>
					    </div>
					  </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
    );
  }
}

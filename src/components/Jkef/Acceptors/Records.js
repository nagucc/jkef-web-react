import FieldItem from './Record/FieldItem';
import moment from 'moment';
import $ from 'jquery';

import React from 'react';

export default class Records extends React.Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
    	records: props.records 
    };
  }

  getRemoveRecordHandler (id) {
		return () => {
			if(confirm('确定要删除此记录吗？')){
				$.ajax(`/api/jkef/acceptors/${this.props._id}/records/${id}`, {
					method: 'delete',
					xhrFields: {
				  	withCredentials: true
				  }
				}).done(result=>{
					this.setState({
						records: this.state.records.filter(rec => {
							return (rec._id != id);
						})
					});
				}).fail((err) => {
					alert(`更新失败：${err.responseText}`);
				});
			};
		}
	}

  render() {
    return (
<div className="col-xs-12 col-sm-9 col-sm-offset-2 well" >
	<h4 className="blue">
		<i className="fa fa-files-o"></i>
		奖助记录
		<div className="btn-group">
			<a className="btn btn-xs btn-info" href={`/acceptors/${this.props._id}/records/new`} >
				<i className="ace-icon fa fa-plus bigger-120"></i>
			</a>
		</div>
	</h4>
	{
		this.state.records.map((record) => {
			return (
				<div className="col-xs-6 col-sm-4 pricing-box" key={record._id}>
					<div className="widget-box widget-color-blue">
						<div className="widget-header">
							<h5 className="widget-title bigger lighter">{record.project}</h5>
						</div>

						<div className="widget-body">
							<div className="widget-main">
								<ul className="list-unstyled spaced2">
									<FieldItem title="日期" value={moment(record.date).format('YYYY/M/D')} />
									<FieldItem title="推荐人" value={record.recommander} />
									<FieldItem title='备注' value={record.remark} />
								</ul>

								<hr />
								<div className="price">
									¥{record.amount/1000}
								</div>
							</div>
							<div>
								<button className="btn btn-block btn-danger" onClick={this.getRemoveRecordHandler(record._id)}>
									<i className="ace-icon fa fa-trash bigger-110"></i>
									<span>删除</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		})
	}
	
</div>
		);
  }
}
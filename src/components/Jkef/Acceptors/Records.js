var React = require('react');
import FieldItem from './Record/FieldItem';
import moment from 'moment';

var Records = React.createClass({

	render: function() {
		return (
<div className="col-xs-12 col-sm-9 col-sm-offset-2 well" >
	<h4 className="blue">
		<i className="fa fa-files-o"></i>
		奖助记录
		<div className="btn-group">
			<a className="btn btn-xs btn-info" href="#/acceptors/edit/{this.state._id}">
				<i className="ace-icon fa fa-plus bigger-120"></i>
			</a>
		</div>
	</h4>
	{
		this.props.records.map((record) => {
			return (
<div className="col-xs-6 col-sm-3 pricing-box" key={record._id}>
	<div className="widget-box widget-color-blue">
		<div className="widget-header">
			<h5 className="widget-title bigger lighter">{record.project}</h5>
		</div>

		<div className="widget-body">
			<div className="widget-main">
				<ul className="list-unstyled spaced2">
					<FieldItem title="Id" value={record._id} />
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
				<a href="#" className="btn btn-block btn-warning">
					<i className="ace-icon fa fa-pencil bigger-110"></i>
					<span>修改</span>
				</a>
			</div>
			<div>
				<a href="#" className="btn btn-block btn-danger">
					<i className="ace-icon fa fa-trash bigger-110"></i>
					<span>删除</span>
				</a>
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

});

module.exports = Records;
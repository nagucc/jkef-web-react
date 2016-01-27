var React = require('react');

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
		this.props.records.map((record, i) => {
			return (
<div className="col-xs-6 col-sm-3 pricing-box" key={i}>
	<div className="widget-box widget-color-blue">
		<div className="widget-header">
			<h5 className="widget-title bigger lighter">{record.project}</h5>
		</div>

		<div className="widget-body">
			<div className="widget-main">
				<ul className="list-unstyled spaced2">
					<li>
						<i className="ace-icon fa fa-check green"></i>
						日期：{record.date}
					</li>

					<li>
						<i className="ace-icon fa fa-check green"></i>
						推荐人：{record.recommander}
					</li>

					<li>
						<i className="ace-icon fa fa-check green"></i>
						备注：{record.remark}
					</li>
				</ul>

				<hr />
				<div className="price">
					¥{record.amount/1000}
				</div>
			</div>

			<div>
				<a href="#" className="btn btn-block btn-primary">
					<i className="ace-icon fa fa-shopping-cart bigger-110"></i>
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
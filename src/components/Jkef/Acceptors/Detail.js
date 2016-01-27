var React = require('react');
import BaseInfo from './BaseInfo';
import Records from './Records';
import Education from './Education';

var Detail = React.createClass({

	render: function() {
		var genderClass = this.props.isMale ? 'bule' : 'orange';
		var highSchool, bachelor, master, doctor;
		if(this.props.highSchool && this.props.highSchool.name)
			highSchool = <Education {...this.props.highSchool} title="高中阶段信息" />;
		if(this.props.bachelorSchool && this.props.bachelorSchool.name)
			bachelor = <Education {...this.props.bachelorSchool} title="大学阶段信息" />;
		if(this.props.masterSchool && this.props.masterSchool.name)
			master = <Education {...this.props.masterSchool} title="硕士阶段信息" />;
		if(this.props.doctor && this.props.doctor.name)
			doctor = <Education {...this.props.doctorSchool} title="博士阶段信息" />;

		var records;
		if(this.props.records.length)
			records = <Records records = {this.props.records} />;
		return (
<div className="main-content">
    <div className="main-content-inner">

	  <div className="page-content">

	    <div className="row">
			<div className="page-header pull-left">
				<h1>
					<i className={`fa fa-user ${genderClass}`}></i> 
					{this.props.name}
					<small>
						<i className="ace-icon fa fa-angle-double-right"></i>
						成员信息
						<span className="action-buttons">
							<a className="green" href={`/acceptors/edit/${this.props._id}`}>
								<i className="ace-icon fa fa-pencil bigger-130"></i>
							</a>

							<a className="red" href={`/acceptors/edit/${this.props._id}`}>
								<i className="ace-icon fa fa-trash-o bigger-130"></i>
							</a>
						</span>
					</small>
				</h1>
			</div>
			

		</div>

	    <div className="row">
		    <BaseInfo {...this.props} />
		    {highSchool}
		    {bachelor}
		    {master}
		    {doctor}
			{records}
	    </div>
	  </div>
	</div>



</div>
		);
	}

});

module.exports = Detail;
import BaseInfo from './BaseInfo';
import Records from './Records';
import Education from './Education';
import $ from 'jquery';

import React from 'react';

export default class Detail extends React.Component {
  static propTypes = {
    fetchAcceptor: React.PropTypes.func.isRequired,
  };
  static defaultProps = {
  	records: [],
  };

  componentDidMount() {
  	this.props.fetchAcceptor();
  }

  remove () {
		if(confirm('确定要删除此受赠人吗？')){
			$.ajax(`/api/jkef/acceptors/${this.props._id}`, {
				method: 'delete',
				xhrFields: {
			  	withCredentials: true
			  }
			}).done(result => {
				window.location = '/acceptors';
			}).fail(err => {
				alert(`删除失败：${err}`);
			});
		}
	}

  render() {
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

		return (
			<div>
				<div className="page-header">
					<h1>
						<i className={`fa fa-user fa-${genderClass}`}></i>
						{this.props.name}
						<small>
							<i className="ace-icon fa fa-angle-double-right"></i>
							详情
						</small>
					</h1>
				</div>
				<div className="row">
			    <BaseInfo {...this.props} />
			    {highSchool}
			    {bachelor}
			    {master}
			    {doctor}
			    {
			    	this.props.records.length
			    		? <Records records = {this.props.records} _id={this.props._id} />
			    		: null
			    }

					<div className="col-xs-12 col-sm-9 col-sm-offset-2">
						<button className="btn btn-block btn-danger" onClick={this.remove} >
							<i className="fa fa-trash"></i>
							删除此受赠人
						</button>
					</div>
		    </div>
		  </div>
		);
  }
}
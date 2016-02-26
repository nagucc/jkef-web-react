import React from 'react';
import Settings from './Ace/Settings';
import Breadcrumbs from './Ace/Breadcrumbs';
import {showJkefProjects} from '../redux/actions';

export default class Projects extends React.Component {

  static propTypes = {
  	projects: React.PropTypes.array.isRequired
  };

  // componentDidMount() {
  // 	this.props.dispatch(showJkefProjects());
  // }

  render() {
    return this.props.projects ? (
    	<div className="row">
      	<h3 className="header blue smaller">基金会项目</h3>
        {
	      	this.props.projects.map((project, i) => {
  		  		return (
    					<div className="col-sm-4" key={i}>
	        	    <div className="row">
	          	    <div className="col-xs-11 label label-lg label-info arrowed-in arrowed-right">
	            	    <b>{project.name}</b>
	              	</div>
	            	</div>
		            <div>
		              <ul className="list-unstyled spaced">
		              {
		              	project.descs.map((desc, j) => {
	      	        		return (
		              			<li key={j}>
				                  <i className="ace-icon fa fa-caret-right blue"></i>{desc}
				                </li>
		              		);
		              	})
		              }
		              </ul>
	            </div>
	        	</div>
    			);
    		})
      }
      </div>) : null;
  }
}

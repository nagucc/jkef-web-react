import React from 'react';
import config from './config';
import Settings from '../../Ace/Settings';
import Breadcrumbs from '../../Ace/Breadcrumbs';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
  	var breadcrumbs = null;
    if(this.props.enableBreadcrumbs) breadcrumbs = <Breadcrumbs />;

    var settings = null;
    if(this.props.enableSettings) settings = <Settings />;

    return (
    	<div className="main-content">
        <div className="main-content-inner">
          {breadcrumbs}
          <div className="page-content">
  	        {settings}
            <div className="row">
            	<h3 className="header blue smaller">基金会项目</h3>
			        {
	  		      	config.projects.map((project, i) => {
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
		        </div>
          </div>
        </div>
      </div>
    );
  }
}

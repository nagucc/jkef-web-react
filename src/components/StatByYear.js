'use strict';
import React from 'react';
import * as actions from '../redux/actions';
import YearStatInfo from './YearStatInfo';
// import Icon from 'react-fa';

class StatByYear extends React.Component {

  componentDidMount() {
		this.props.dispatch(actions.fetchStatByYear());
	}

  render() {
    var stat = this.props.stat || [];
    return (
      <div className="progress">
        <div className="hd">
          <h1 className="page_title">{this.props.title}</h1>
        </div>
        <div className="bd spacing">
          {
            stat.map((item, i) => {
              if(item.amount) return <YearStatInfo key={i} {...item} />;
              else return null;
            })
          }
        </div>
      </div>
    );
  }

}

export default StatByYear;

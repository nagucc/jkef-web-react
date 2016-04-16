import React, { PropTypes } from 'react'
import * as actions from '../redux/actions';
import LyrStatInfo from './LyrStatInfo';
import LoadingToast from './LoadingToast';

class StatByLyr extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.startLoading());
    this.props.dispatch(actions.fetchStatByLyr());
  }
  render () {
    var stat = this.props.stat || [];
    return (
      <div className="progress">
        <div className="hd">
          <h1 className="page_title">{this.props.title}</h1>
        </div>
        <div className="bd spacing">
          {
            stat.map((item, i) => {
              if(item.amount) return <LyrStatInfo key={i} {...item} />;
              else return null;
            })
          }
        </div>
        <LoadingToast show = {this.props.loading} />
      </div>
    );
  }
}

export default StatByLyr;

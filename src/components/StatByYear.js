'use strict';
import React from 'react';
import accounting from 'accounting';
import * as actions from '../redux/actions';


class StatByYear extends React.Component {

  componentDidMount() {
		this.props.dispatch(actions.fetchStatByYear());
	}

  render() {
    var stat = this.props.stat || [];
    return (
      <div className="progress">
        <div className="hd">
          <h1 className="page_title">资产历年统计</h1>
        </div>
        <div className="bd spacing">

          {
            stat.map(item => {
              return (
                <div key={item._id} >
                  <div className="weui_cells_title">
                    {item.year}年，
                    {accounting.formatMoney(item.amount, '¥')}元
                    （{accounting.formatNumber(item.count)}项）</div>
                  <div className="weui_progress">
                    <div className="weui_progress_bar">
                      <div
                          className="weui_progress_inner_bar js_progress"
                          style={{width: item.pamount}} />
                    </div>
                    <a
                      href="javascript:;"
                      className="weui_progress_opr">
                      <i className="weui_icon_cancel" />
                    </a>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

    );
  }

}

export default StatByYear;

import React, { PropTypes } from 'react'
import accounting from 'accounting';
import {CellsTitle, Progress} from 'react-weui';

class LyrStatInfo extends React.Component {
  render () {
    let {lyr, amount, count, pamount, link} = this.props;
    return (
      <div>
        <CellsTitle>
          {lyr}，
          {accounting.formatMoney(amount, '¥')}元
          （{accounting.formatNumber(count)}项）
        </CellsTitle>
        <div className="weui_progress">
          <div className="weui_progress_bar">
            <div
                className="weui_progress_inner_bar js_progress"
                style={{width: pamount}} />
          </div>
          <a
            href={link}
            className="weui_progress_opr">
            <i className="weui_icon_search" />
          </a>
        </div>
      </div>
    )
  }
}

export default LyrStatInfo;

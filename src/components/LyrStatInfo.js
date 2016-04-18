import React, { PropTypes } from 'react'
import accounting from 'accounting';

class LyrStatInfo extends React.Component {
  render () {
    return (
      <div>
        <div className="weui_cells_title">
          {this.props.lyr}，
          {accounting.formatMoney(this.props.amount, '¥')}元
          （{accounting.formatNumber(this.props.count)}项）</div>
        <div className="weui_progress">
          <div className="weui_progress_bar">
            <div
                className="weui_progress_inner_bar js_progress"
                style={{width: this.props.pamount}} />
          </div>
          <a
            href={this.props.link}
            className="weui_progress_opr">
            <i className="weui_icon_search" />
          </a>
        </div>
      </div>
    )
  }
}

export default LyrStatInfo;
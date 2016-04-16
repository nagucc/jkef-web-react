import React, { PropTypes } from 'react'
import accounting from 'accounting';

class ListItem extends React.Component {
  render () {
    return (
        <div className="weui_media_box weui_media_text">
          <h4 className="weui_media_title">
            {this.props['设备名称']}[{this.props.Bqh}]
          </h4>
          <ul className="weui_media_info">
            <li className="weui_media_info_meta">{accounting.formatMoney(this.props.Yz, '¥')}元</li>
              <li className="weui_media_info_meta weui_media_info_meta_extra">{this.props['领用人']}</li>
            <li className="weui_media_info_meta weui_media_info_meta_extra"><a href={`/item/${this.props.Bqh}`}><i className="fa fa-ellipsis-h"></i></a></li>
          </ul>
        </div>
    )
  }
}

export default ListItem;

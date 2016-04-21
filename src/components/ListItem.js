import React, { PropTypes } from 'react'
import {formatMoney} from 'accounting';
import {MediaBox, MediaBoxTitle, MediaBoxInfo, MediaBoxInfoMeta} from 'react-weui';

class ListItem extends React.Component {
  render () {
    let {Bqh, Yz} = this.props;
    return (
        <MediaBox type="text">
          <MediaBoxTitle>{this.props['设备名称']}[{Bqh}]</MediaBoxTitle>
          <MediaBoxInfo>
            <MediaBoxInfoMeta>{formatMoney(Yz, '¥')}元</MediaBoxInfoMeta>
            <MediaBoxInfoMeta extra>{this.props['领用人']}</MediaBoxInfoMeta>
            <MediaBoxInfoMeta extra><a href={`/item/${this.props.Bqh}`}>...</a></MediaBoxInfoMeta>
          </MediaBoxInfo>
        </MediaBox>
    )
  }
}

export default ListItem;

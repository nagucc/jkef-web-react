import React, { PropTypes } from 'react'

class LoadingToast extends React.Component {
  static defaultProps = {
    text: '数据加载中',
    show: false
  };
  render () {
    let style;
    if(!this.props.show) style = {display: 'none'};
    return (
      <div className="weui_loading_toast" style = {style}>
        <div className="weui_mask_transparent"></div>
        <div className="weui_toast">
          <div className="weui_loading">
            <div className="weui_loading_leaf weui_loading_leaf_0" />
            <div className="weui_loading_leaf weui_loading_leaf_1" />
            <div className="weui_loading_leaf weui_loading_leaf_2" />
            <div className="weui_loading_leaf weui_loading_leaf_3" />
            <div className="weui_loading_leaf weui_loading_leaf_4" />
            <div className="weui_loading_leaf weui_loading_leaf_5" />
            <div className="weui_loading_leaf weui_loading_leaf_6" />
            <div className="weui_loading_leaf weui_loading_leaf_7" />
            <div className="weui_loading_leaf weui_loading_leaf_8" />
            <div className="weui_loading_leaf weui_loading_leaf_9" />
            <div className="weui_loading_leaf weui_loading_leaf_10" />
            <div className="weui_loading_leaf weui_loading_leaf_11" />
          </div>
          <p className="weui_toast_content">{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default LoadingToast;

/*
用于显示一条奖助记录中的一个字段。
需提供两个Props字段：
- title 字段显示名称。必须。
- value 字段
*/

import React from 'react';

export default class FiledItem extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.value ? (
      <li>
				<i className="ace-icon fa fa-check green"></i>
				{this.props.title}：{this.props.value}
			</li>
    ) : false;
  }
}

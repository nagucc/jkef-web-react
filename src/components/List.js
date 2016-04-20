import React, { PropTypes, Component } from 'react'
import {findDOMNode} from 'react-dom';
import * as actions from '../redux/actions';
import ListItem from './ListItem';
import {SearchBar, Button} from 'react-weui';


class List extends Component {
  static propTypes = {
    filter: React.PropTypes.object,
    items: PropTypes.array
  }
  static defaultProps = {
    items: []
  }

  componentDidMount() {
    this.props.dispatch(actions.startLoading());
    this.props.dispatch(actions.fetchItems(this.props.filter));
  }

  getMore() {
    var nextFilter = Object.assign({}, this.props.filter, {
      start: this.props.filter.start + 20
    });
    this.props.dispatch(actions.startLoading());
    this.props.dispatch(actions.setItemsFilter(nextFilter));
    this.props.dispatch(actions.fetchItems(nextFilter));
  }

  search (text) {
    var nextFilter = Object.assign({}, this.props.filter, {
      text,
      start: 0
    });
    this.props.dispatch(actions.startLoading());
    this.props.dispatch(actions.setItemsFilter(nextFilter));
    this.props.dispatch(actions.fetchItems(nextFilter, true));
  }


  render () {
    return (
      <div className="searchbar">
        <div className="hd">
          <h1 className="page_title">{this.props.title}</h1>
        </div>
        <div className="bd">
          <SearchBar placeholder="搜索名称/标签号" onChange={this.search.bind(this)}/>
          <div className="weui_panel weui_panel_access">
            <div className="weui_panel_bd">
              {
                this.props.items ? this.props.items.map((item,i) => (
                  <ListItem key={i} {...item} />
                )) : null
              }

            </div>
            <a
              className="weui_panel_ft"
              href="javascript:void(0);" onClick={this.getMore.bind(this)}>查看更多</a>
          </div>
        </div>
        <div className="weui_loading_toast" style = {this.props.loadingToastStyle}>
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
            <p className="weui_toast_content">数据加载中</p>
          </div>
        </div>
      </div>

    )
  }
}

export default List

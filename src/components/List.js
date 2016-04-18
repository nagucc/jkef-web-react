import React, { PropTypes, Component } from 'react'
import {findDOMNode} from 'react-dom';
import * as actions from '../redux/actions';
import ListItem from './ListItem';

import {ButtonGroup, Button, DropdownButton, MenuItem, Input, ButtonToolbar} from 'react-bootstrap';

class List extends Component {
  static propTypes = {
    filter: React.PropTypes.object,
    items: PropTypes.array
  }
  static defaultProps = {
    items: []
  }

  componentDidMount() {

    var searchBar = findDOMNode(this.refs.search_bar);
    var searchInput = findDOMNode(this.refs.search_input);
    var searchText = findDOMNode(this.refs.search_text);
    var searchCancel = findDOMNode(this.refs.search_cancel);
    var searchClear = findDOMNode(this.refs.search_clear);
    // 为搜索输入框添加事件
    searchInput.addEventListener('focus', () => {
      searchBar.classList.add('weui_search_focusing');
      if(searchInput.value) searchText.style.setProperty('display', 'none');
      else searchText.style.removeProperty('display');
    });
    searchInput.addEventListener('blur', () => {
      searchBar.classList.remove('weui_search_focusing');
    });

    // 为‘取消’按钮添加事件
    searchCancel.addEventListener('touchend', () => {
      searchBar.classList.remove('weui_search_focusing');
      searchInput.value = '';
    });

    // 为‘clear’图标添加事件
    searchClear.addEventListener('touchend', () => {
      searchInput.value = '';
    });

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

  search () {
    var nextFilter = Object.assign({}, this.props.filter, {
      text: this.refs.search_input.value,
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
          <div className="weui_search_bar " ref="search_bar">
            <form className="weui_search_outer">
              <div className="weui_search_inner">
                <i className="weui_icon_search" />
                <input
                  type="search"
                  className="weui_search_input"
                  id="search_input"
                  placeholder="名称 / 标签号"
                  onChange = {this.search.bind(this)}
                  required ref="search_input"/>
                <a
                  href="javascript:"
                  className="weui_icon_clear"
                  ref="search_clear" />
              </div>
              <label
                htmlFor="search_input"
                className="weui_search_text"
                id="search_text" ref="search_text">
                <i className="weui_icon_search" />
                <span>搜索名称 / 标签号</span>
              </label>
            </form>
            <a
              href="javascript:"
              className="weui_search_cancel"
              ref="search_cancel">取消</a>
          </div>
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

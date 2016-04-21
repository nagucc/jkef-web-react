import React, { PropTypes, Component } from 'react'
import {findDOMNode} from 'react-dom';
import * as actions from '../redux/actions';
import ListItem from './ListItem';
import {SearchBar, Toast} from 'react-weui';


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
    let {showToast, title, items} = this.props;
    return (
      <div className="searchbar">
        <div className="hd">
          <h1 className="page_title">{title}</h1>
        </div>
        <div className="bd">
          <SearchBar placeholder="搜索名称/标签号" onChange={this.search.bind(this)}/>
          <div className="weui_panel weui_panel_access">
            <div className="weui_panel_bd">
              {
                items ? items.map((item,i) => (
                  <ListItem key={i} {...item} />
                )) : null
              }

            </div>
            <a
              className="weui_panel_ft"
              href="javascript:void(0);" onClick={this.getMore.bind(this)}>查看更多</a>
          </div>
        </div>
        <Toast show={showToast} icon="loading">
                数据加载中...
        </Toast>
      </div>

    )
  }
}

export default List

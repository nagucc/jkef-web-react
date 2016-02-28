import MoreButton from './MoreButton';
import BookList from './BookList';
import Settings from '../../Ace/Settings';
import Breadcrumbs from '../../Ace/Breadcrumbs';
import {fetchNgvBooks, setNgvBooksTextFilter,
	FETCH_STATUS_READY, 
	FETCH_STATUS_SUCCESS,
	FETCH_STATUS_FAILURE} from '../../../redux/actions';

import React from 'react';

export default class Index extends React.Component {
  static propTypes = {
    books: React.PropTypes.object,
  };

  componentDidMount() {
  	if(this.props.books.ret === FETCH_STATUS_READY) this.moreBooks2();
  }

  moreBooks2() {
		let start = 0;
		let data = this.props.books.data;
		if(data){
			start = data.count
		}
		this.props.dispatch(fetchNgvBooks(start));
	}

	// 处理搜索框文本改变的事件
	handleSearchTextChange(e) {
		this.props.dispatch(setNgvBooksTextFilter(e.target.value));
	}

	render() {

		// 设置一个标志，用于标识是否需要显示MoreButton
		let displayMoreButton = true;
		let data = this.props.books.data;
		if( data && data.count >= data.total) displayMoreButton = false;

		return (
			<div>
				<div className="page-header pull-left">
					<h1>
						纳古志愿者·电子阅览室
						<small>
							<i className="ace-icon fa fa-angle-double-right"></i>
							爱生活，爱阅读
						</small>
					</h1>
				</div>

				<div className="pull-right">
					<div className="nav-search" id="nav-search">
							<div className="form-search">
								<span className="input-icon">
									<input type="text" placeholder="搜索" className="nav-search-input" onChange={this.handleSearchTextChange.bind(this)}/>
									<i className="ace-icon fa fa-search nav-search-icon"></i>
								</span>
							</div>
						</div>
				</div>

				<div className="row">
					<div className="col-xs-12">
						<div>
							{ this.props.books.ret === FETCH_STATUS_SUCCESS
								? <BookList books={this.props.books.data.books} />
								: (this.props.books.ret === FETCH_STATUS_FAILURE
									 ? <p>出错了</p>
									 : <p>加载中……</p>)
							}
						</div>
						{
							displayMoreButton
								? (
									<div className="center">
										<button type="button" className="btn btn-sm btn-primary btn-white btn-round" onClick={this.moreBooks2.bind(this)}>
											<i className="ace-icon fa fa-rss bigger-150 middle orange2"></i>
											<span className="bigger-110">加载更多</span>
											<i className="icon-on-right ace-icon fa fa-arrow-right"></i>
										</button>
									</div>
									)
								: null
						}
						
					</div>
				</div>
			</div>
			
		);
	} 
}
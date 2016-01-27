var React = require('react');
import MoreButton from './MoreButton';
import BookList from './BookList';
import Settings from '../../Ace/Settings';
import Breadcrumbs from '../../Ace/Breadcrumbs';

var Index = React.createClass({
	getInitialState: function() {
		return {
			getBookStartIndex: 0,		// 下一次搜索的起始位置
			totalBooks: 1000,			// 图书总数
			books: [],					// 当前显示的图书数据
			allBooks: []					// 所有已经获取到的图书数据
		};
	},
	getDefaultProps: function() {
		return {
			enableBreadcrumbs: true,
            enableSettings: false 
		};
	},
	moreBooks: function () {
		$.getJSON('https://api.douban.com/v2/book/search?callback=?', {
			tag: 'ngv_电子阅览室',
			start: this.state.getBookStartIndex
		}, (result => {
			// 为下一次获取数据更新参数
			this.setState({
				books: this.state.books.concat(result.books),
				allBooks: this.state.allBooks.concat(result.books),
				getBookStartIndex: this.state.getBookStartIndex + result.count,
				totalBooks: result.total
			});
		}).bind(this));
	},
	componentDidMount: function() {
		this.moreBooks();
	},

	// 处理搜索框文本改变的事件
	handleSearchTextChange: function(e) {
		var text = e.target.value;
		if(text){
			this.setState({
				books: this.state.allBooks.filter(book => {
					return book.title.search(text) != -1;
				})
			});
		} else {
			this.setState({
				books: this.state.allBooks
			});
		}
			
	},
	render: function() {

		// 设置一个标志，勇于标示是否需要显示MoreButton
		var displayMoreButton = true;
		if(this.state.totalBooks <= this.state.getBookStartIndex)
			displayMoreButton = false;

		var breadcrumbs = null;
	    if(this.props.enableBreadcrumbs) breadcrumbs = <Breadcrumbs onSearchTextChange={this.handleSearchTextChange} />;

	    var settings = null;
	    if(this.props.enableSettings) settings = <Settings />;

		return (
			<div className="main-content">
				<div className="main-content-inner">
					{breadcrumbs}
					<div className="page-content">
						{settings}
						<div className="page-header">
							<h1>
								纳古志愿者·电子阅览室
								<small>
									<i className="ace-icon fa fa-angle-double-right"></i>
									爱生活，爱阅读
								</small>
							</h1>
						</div>

						<div className="row">
							<div className="col-xs-12">
								<div>
									<BookList books={this.state.books} />
								</div>
								{
									displayMoreButton ? <MoreButton click={this.moreBooks} /> : ''
								}
								
							</div>
						</div>
					</div>
				</div>

			</div>
			
		);
	}

});

module.exports = Index;
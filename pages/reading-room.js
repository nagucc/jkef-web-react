var React = require('react');
import MoreButton from '../components/Jkef/ReadingRoom/MoreButton';
import BookList from '../components/Jkef/ReadingRoom/BookList';

var ReadingRoom = React.createClass({
	getInitialState: function() {
		return {
			getBookStartIndex: 0,		// 下一次搜索的起始位置
			totalBooks: 1000,			// 图书总数
			books: []					// 图书数据
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
				getBookStartIndex: this.state.getBookStartIndex + result.count,
				totalBooks: result.total
			});
		}).bind(this));
	},
	componentDidMount: function() {
		this.moreBooks();
	},
	render: function() {

		// 设置一个标志，勇于标示是否需要显示MoreButton
		var displayMoreButton = true;
		if(this.state.totalBooks <= this.state.getBookStartIndex)
			displayMoreButton = false;

		return (
			<div className="main-content-inner">

				<div className="page-content">

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
		);
	}

});

module.exports = ReadingRoom;
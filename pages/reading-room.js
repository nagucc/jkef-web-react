var React = require('react');
import MoreButton from '../components/Jkef/ReadingRoom/MoreButton';
import BookList from '../components/Jkef/ReadingRoom/BookList';

var ReadingRoom = React.createClass({
	getInitialState: function() {
		return {
			getBookStartIndex: 0,
			totalBooks: 1000,
			books: []
		};
	},
	moreBooks: function () {
		$.getJSON('https://api.douban.com/v2/book/search?callback=?', {
			tag: 'ngv_电子阅览室',
			start: this.state.getBookStartIndex
		}, (result => {
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
		var displayMoreButton = true;
		if(this.state.totalBooks <= this.state.getBookStartIndex) displayMoreButton = false;

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
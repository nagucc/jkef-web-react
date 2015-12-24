var React = require('react');

var BookList = React.createClass({
	render: function() {
		if (!this.props.books || !this.props.books.length)
			return <p>no records</p>;

		var books = this.props.books;
		var labels = ['label-info', 'label-danger', 'label-success', 'label-warning'];

		return (
			<ul className="ace-thumbnails clearfix">
			{
				books.map(book => {
					return (
						<li>
							<a href={book.alt} title={book.title} data-rel="colorbox" className="cboxElement">
								<img height="300" alt={book.title} src={book.images.large} />
							</a>
							<div className="tags">
							{
								book.tags.map((tag, i) => {
									if(i >= 4) return;
									return (
										<span className="label-holder">
											<span className={'label ' + labels[i]}>{tag.name}</span>
										</span>
									);
								})
							}
							</div>
						</li>
					);
				})
			}
			</ul>
		);
	}

});

module.exports = BookList;
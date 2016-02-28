import React from 'react';

export default class BookList extends React.Component {
  static propTypes = {
    books: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    // if (this.props.books.ret === 1)
			// return <p>加载中……</p>;

		var labels = ['label-info', 'label-danger', 'label-success', 'label-warning'];

		return (
			<ul className="ace-thumbnails clearfix">
			{
				this.props.books.map((book, j) => {
					return (
						<li key={j} >
							<a href={book.alt} title={book.title} data-rel="colorbox" className="cboxElement">
								<img height="300" alt={book.title} src={book.images.large} />
							</a>
							<div className="tags">
							{
								book.tags.map((tag, i) => {
									if(i >= 4) return;
									return (
										<span className="label-holder" key={i}>
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
}
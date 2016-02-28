import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import ReadingRoom from '../components/Jkef/ReadingRoom';

const mapStateToProps = (state, ownProps) => {

	// 根据books数据和文本过滤字符对书的数据进行筛选
	let books = state.ngvBooks;
	let data = state.ngvBooks.data;
	if(data && state.ngvBooksTextFilter){
		data = Object.assign({}, data, {
			books: data.books.filter(book => {
				return book.title.search(state.ngvBooksTextFilter) != -1;
			})
		});
		return {
			books: Object.assign({}, state.ngvBooks, {
				data: Object.assign({}, data, {
					books: data.books.filter(book => {
						return book.title.search(state.ngvBooksTextFilter) != -1;
					})
				})
			})
		};
	} else return { books }
}


export default connect(mapStateToProps)(ReadingRoom);

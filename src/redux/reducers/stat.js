import { combineReducers } from 'redux';
import { HOME_PAGE, READING_ROOM,
	FETCH_BOOK_LIST,
	FETCH_STATUS_READY, FETCH_STATUS_SUCCESS, FETCH_STATUS_FAILURE,
	SET_NGV_BOOKS_TEXT_FILTER } from '../actions';
import { handleActions, handleAction } from 'redux-actions';



export default combineReducers({
	enableUserInfo,
	title
});

import { combineReducers } from 'redux';
import { HOME_PAGE, READING_ROOM, 
	FETCH_BOOK_LIST,
	FETCH_STATUS_READY, FETCH_STATUS_SUCCESS, FETCH_STATUS_FAILURE,
	SET_NGV_BOOKS_TEXT_FILTER } from '../actions';
import { siteProfile as profile } from '../../config';
import { handleActions, handleAction } from 'redux-actions';


const enableUserInfo = (state = false, action) => {
	switch(action.type) {
		default:
			return state;
	}
}

const title = (state='家琨教育基金会', action) => {
	switch(profile) {
		case 'jkef':
		default:
			return state;
	}
}

export default combineReducers({
	enableUserInfo,
	title
});
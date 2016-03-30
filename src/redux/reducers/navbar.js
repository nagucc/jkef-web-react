import { combineReducers } from 'redux';
import * as actions from '../actions';
import { handleActions, handleAction } from 'redux-actions';


const enableUserInfo = (state = false, action) => {
	switch(action.type) {
		default:
			return state;
	}
}

const title = (state='', action) => {
	return state;
}

export default combineReducers({
	enableUserInfo,
	title
});

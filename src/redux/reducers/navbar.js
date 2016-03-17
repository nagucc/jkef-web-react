import { combineReducers } from 'redux';
import * as actions from '../actions';
import { siteProfile as profile } from '../../config';
import { handleActions, handleAction } from 'redux-actions';


const enableUserInfo = (state = false, action) => {
	switch(action.type) {
		case actions.SHOW_ACCEPTORS:
		case actions.SHOW_ACCEPTOR_DETAIL:
		case actions.NEW_ACCEPTOR:
			return true;
		default:
			return state;
	}
}

const title = (state='家琨教育基金会', action) => {
	switch(profile) {
		case 'jkef':
		case 'gdzc':
			return '固定资产助手';
		default:
			return state;
	}
}

export default combineReducers({
	enableUserInfo,
	title
});

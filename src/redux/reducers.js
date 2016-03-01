import { combineReducers } from 'redux';
import { HOME_PAGE, READING_ROOM, 
	FETCH_BOOK_LIST,
	FETCH_STATUS_READY, FETCH_STATUS_SUCCESS, FETCH_STATUS_FAILURE,
	SET_NGV_BOOKS_TEXT_FILTER } from './actions';
import { siteProfile as profile } from '../config';
import { handleActions, handleAction } from 'redux-actions';
import navbar from './reducers/navbar';
import mainContainer from './reducers/mainContainer';
import {acceptorList} from './reducers/acceptors';

const siteProfile = (state = profile, action) => {
	return state;
}


const projects = (state = [], action) => {
	switch(profile){
		case 'jkef':
		default:
			return [{
		    name: '奖学金',
		    descs: ['为符合条件的中高考优秀者发放奖学金']
		  }, {
		    name: '助学金',
		    descs: ['为大学以上的优秀学生发放助学金，并关注他们的成长',
		        '与云南明德志愿服务中心合作']
		  }, {
		    name: '电子阅览室',
		    descs: ['基于kindle创建的电子阅览室',
		        '已有超过40台kindle加入',
		        '与纳古志愿者协会合作']
		  }, {
		    name: '其他项目',
		    descs: ['幼师成长计划']
		  }];
	}
}




// 此处暂时不能使用handleAction，待redux-actions版本更新后才能使用。
const ngvBooks = handleActions({
	'fetch naguv books': {
		next(state, action) {
			var oldData = state.data || {count:0, books:[]};
			return Object.assign({}, action.payload, {
				data: Object.assign({}, action.payload.data, {
					count: oldData.count + action.payload.data.count,
					books: [...oldData.books, ...action.payload.data.books]
				})
			});
		},
		throw(state, action){
			var oldData = state.data || {count:0, books:[]};
			return Object.assign({}, state, {
				ret: FETCH_STATUS_FAILURE,
				msg: action.payload
			});
		}
	}
}, {ret: FETCH_STATUS_READY, msg: 'standby'});

const ngvBooksTextFilter = (state = null, action) => {
	switch(action.type){
		case SET_NGV_BOOKS_TEXT_FILTER:
			return action.text
		default:
			return state;
	}
}

const jkefStat = handleActions({
	'FETCH_JKEF_STAT': (state, action) => action.payload
}, null)


export default combineReducers({
	navbar,
	mainContainer,
	siteProfile,
	projects,
	ngvBooks,
	ngvBooksTextFilter,
	jkefStat,
	acceptorList
});
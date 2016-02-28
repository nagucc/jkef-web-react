import { combineReducers } from 'redux';
import { HOME_PAGE, READING_ROOM, 
	FETCH_BOOK_LIST,
	FETCH_STATUS_READY, FETCH_STATUS_SUCCESS, FETCH_STATUS_FAILURE,
	SET_NGV_BOOKS_TEXT_FILTER } from '../actions';
import { siteProfile as profile } from '../../config';
import { handleActions, handleAction } from 'redux-actions';

const breadcrumbs = (state = { enable: false }, action) =>{
	switch(action.type){
		default:
			return state;
	}
}


const sidebarShortcuts = (state = [], action) => {
	switch(action.type){
		case HOME_PAGE:
		default:
			return state;
	}
}

const sidebarNavList = (state, action) => {
	var list = [{
  title: '首页',
  target: '/',
  icon: 'home'
}];
	switch(action.type){
		case HOME_PAGE:
		default:
			switch(profile) {
				case 'jkef':
				default:
					return list.concat([{
				    title: '电子阅览室',
				    target: '/reading-room',
				    icon: 'book'
				  }, {
				    title: '项目',
				    target: '/projects'
				  }, {
				    title: '历年统计',
				    target: '/stat',
				    icon: 'tachometer'
				  }, {
				    title: '捐赠管理',
				    target: '/acceptors'
				  }]);
			}
	}
}

export default combineReducers({
	breadcrumbs,
	sidebarShortcuts,
	sidebarNavList
});
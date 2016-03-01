import { combineReducers } from 'redux';
import { HOME_PAGE, READING_ROOM, 
	FETCH_BOOK_LIST,
	FETCH_STATUS_READY, FETCH_STATUS_SUCCESS, FETCH_STATUS_FAILURE,
	SET_NGV_BOOKS_TEXT_FILTER,
	SHOW_ACCEPTORS,
	SHOW_ACCEPTOR_DETAIL } from '../actions';
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
		case SHOW_ACCEPTORS: // 捐赠管理页面中的侧边小图标, 
		case SHOW_ACCEPTOR_DETAIL:
			return [{
		    btnType: 'btn-primary',
		    icon: 'users',
		    link: '/acceptors'
		  }, {
		    btnType: 'btn-success',
		    icon: 'plus',
		    link: '/acceptors/new'
		  }];
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
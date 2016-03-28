import { combineReducers } from 'redux';
import { HOME_PAGE, READING_ROOM,
	FETCH_BOOK_LIST,
	FETCH_STATUS_READY, FETCH_STATUS_SUCCESS, FETCH_STATUS_FAILURE,
	SET_NGV_BOOKS_TEXT_FILTER,
	SHOW_ACCEPTORS,
	SHOW_ACCEPTOR_DETAIL,
	NEW_ACCEPTOR } from '../actions';
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
		case NEW_ACCEPTOR:
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
			return [{
				title: '仪表盘',
				target: '/',
				icon: 'dashboard'
			}, {
				title: '统计信息',
				subItems: [{
					title: '年度统计',
					target: '/stat/byYear'
				},{
					title: '待报废',
					target: '/'
				}]
			}, {
				title: '我的资产',
				subItems: [{
					title: '我管理的'
				}, {
					title: '我领用的'
				}]
			}];
	}
}

export default combineReducers({
	breadcrumbs,
	sidebarShortcuts,
	sidebarNavList
});

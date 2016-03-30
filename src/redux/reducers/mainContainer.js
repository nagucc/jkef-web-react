import { combineReducers } from 'redux';
import * as actions from '../actions';
import { handleActions, handleAction } from 'redux-actions';

const breadcrumbs = (state = { enable: false }, action) =>{
	switch(action.type){
		default:
			return state;
	}
}


const sidebarShortcuts = (state = [], action) => {
	switch(action.type){
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
		case actions.HOME_PAGE:
		default:
			return list;
	}
}

export default combineReducers({
	breadcrumbs,
	sidebarShortcuts,
	sidebarNavList
});

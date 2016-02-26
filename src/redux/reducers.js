import { combineReducers } from 'redux';
import { HOME_PAGE, showHome } from './actions';
import { siteProfile as profile } from '../config';

const enableUserInfo = (state = false, action) => {
	switch(action.type) {
		case HOME_PAGE:
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

const siteProfile = (state = profile, action) => {
	return state;
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

const title = (state='家琨教育基金会', action) => {
	switch(profile) {
		case 'jkef':
		default:
			return state;
	}
}

export default combineReducers({
	enableUserInfo,
	sidebarShortcuts,
	siteProfile,
	sidebarNavList,
	projects,
	title
});
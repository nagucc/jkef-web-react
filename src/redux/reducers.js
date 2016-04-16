import { combineReducers } from 'redux';
import * as actions from './actions';
import { siteProfile as profile } from '../config';
import { handleActions, handleAction } from 'redux-actions';
import navbar from './reducers/navbar';
import mainContainer from './reducers/mainContainer';
import {acceptorList, acceptorDetail} from './reducers/acceptors';

const siteProfile = (state = profile, action) => {
	return state;
}

const pageSetting = handleActions({
	'SHOW_UPLOAD': (state = {
		title: '上传文件',
		label: '待上传的文件',
		help: '请选择待上传的文件'
	}, action) => action.options
}, null);


const statByYear = handleActions({
  'FETCH_GDZC_STAT_BY_YEAR': (state, action) => action.payload
}, null);
const total = handleActions({
  'FETCH_GDZC_TOTAL_STAT': (state, action) => action.payload
}, null);

const itemsFilter = (state = {
	start: 0
}, action) => {
  switch (action.type) {
    case actions.SET_ITEMS_FILTER:
      return Object.assign({}, state, action.filter);
    default:
      return state;
  }
}

const items = handleActions({
  'FETCH_ITEMS': (state = [], action) => {
		if(action.payload.clearBefore) return action.payload.data;
		else return state.concat(action.payload.data);
	}
}, []);

const loadingStatus = handleActions({
	'FETCH_ITEMS': (state = 'standby', action) => {
		return 'end';
	},
	'START_LOADING': (state, action) => {
		return 'loading';
	}
}, 'standby');

const detail = handleActions({
	'FETCH_ITEM': (state, action) => action.payload
}, null);

const mergeXls = handleActions({
  'UPLOAD_XLS': (state, action) => action.payload,
  'START_TO_UPLOAD_XLS': (state, action) => ({status: 'processing', file: action.file})
}, null);


export default combineReducers({
	navbar,
	mainContainer,
	siteProfile,
	pageSetting,
	statByYear,
	total,
	items,
	itemsFilter,
	loadingStatus,
	mergeXls,
	detail
});

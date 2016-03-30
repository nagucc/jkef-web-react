import { combineReducers } from 'redux';
import * as actions from './actions';
import { handleActions, handleAction } from 'redux-actions';
import navbar from './reducers/navbar';
import mainContainer from './reducers/mainContainer';
import {acceptorList, acceptorDetail} from './reducers/acceptors';


const pageSetting = handleActions({
	'SHOW_UPLOAD': (state = {
		title: '上传文件',
		label: '待上传的文件',
		help: '请选择待上传的文件'
	}, action) => action.options
}, null);

export default combineReducers({
	navbar,
	mainContainer,

	pageSetting
});

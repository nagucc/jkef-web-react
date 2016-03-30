import { combineReducers } from 'redux';
import * as actions from '../actions';
import { handleActions, handleAction } from 'redux-actions';


export const acceptorList = handleActions({
	'FETCH_ACCEPTOR_LIST': {
		next(state, action){
			return Object.assign({}, state, {
				pageIndex: state.pageIndex + 1,
				count: action.payload.count,
				ret: action.payload.ret,
				data: (state.data || []).concat(...action.payload.data)
			});
		},
		throw(state, action) {
			return Object.assign({}, state, action.payload);
		}
	},
	INVALIDATE_ACCEPTOR_LIST: (state, action) => ({
		data: [],
		pageIndex: -1,
		year: '',
		project: ''
	}),
	SET_ACCEPTOR_LIST_FILTER: (state, action) => ({...action.payload})
}, {ret: actions.FETCH_STATUS_READY, pageIndex: -1});


export const acceptorDetail = handleActions({
	FETCH_ACCEPTOR_BY_ID: {
		next(state, action){
			return Object.assign({}, action.payload);
		},
		throw(state, action){
			return {
				ret: actions.FETCH_STATUS_FAILURE,
				msg: action.payload
			}
		}
	},
	SHOW_ACCEPTOR_DETAIL: (state, action) => ({_id: action.payload})
}, {ret: actions.FETCH_STATUS_READY});

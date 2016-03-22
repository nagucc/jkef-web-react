import { combineReducers } from 'redux';
import { FETCH_STATUS_READY,
  FETCH_STATUS_SUCCESS,
  FETCH_STATUS_FAILURE } from '../actions';
import * as actions from '../actions/gdzc';

import { handleActions, handleAction } from 'redux-actions';

const statByYear = handleActions({
  'FETCH_GDZC_STAT_BY_YEAR': (state, action) => action.payload
}, null);
const total = handleActions({
  'FETCH_GDZC_TOTAL_STAT': (state, action) => action.payload
}, null);

const itemsFilter = (state = {}, action) => {
  switch (action) {
    case actions.SHOW_LIST:
      return action.filter
    default:
      return state;
  }
}

const items = handleActions({
  'FETCH_ITEMS': (state, action) => action.payload
}, null);

const mergeXls = handleActions({
  'UPLOAD_XLS': (state, action) => action.payload,
  'START_TO_UPLOAD_XLS': (state, action) => ({status: 'processing', file: action.file})
}, null);
export default {
  statByYear,
  total,
  itemsFilter,
  items,
  mergeXls
};

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
export default {
  statByYear,
  total
};

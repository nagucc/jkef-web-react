import {createAction} from 'redux-actions';
import fetchJsonp from 'fetch-jsonp';
import fetch from 'isomorphic-fetch';
import {store} from './store';

let realFetch = fetchJsonp;

export const HOME_PAGE = 'HOME_PAGE';


export const SHOW_STAT = 'SHOW_STAT';

export const FETCH_STATUS_READY = 1;
export const FETCH_STATUS_SUCCESS = 0;
export const FETCH_STATUS_FAILURE = -1;



export const showIndex = createAction(HOME_PAGE);

export const showStat = () => ({
	type: SHOW_STAT
});

export const SHOW_UPLOAD = 'SHOW_UPLOAD';
export const showUpload = (options) => ({
	type: 'SHOW_UPLOAD',
	options
});




export const SHOW_LIST = 'SHOW_LIST';
export const showList = filter => ({
  type: SHOW_LIST,
  filter
})

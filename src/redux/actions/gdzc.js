import {createAction} from 'redux-actions';
import fetch from 'isomorphic-fetch';

export const FETCH_STAT_BY_YEAR = 'FETCH_GDZC_STAT_BY_YEAR';
export const fetchStatByYear = createAction(FETCH_STAT_BY_YEAR, async () => {
  const yearStat = await(await fetch('/api/gdzc/stat/byYear')).json();
  return yearStat.data;
})

export const FETCH_TOTAL_STAT = 'FETCH_GDZC_TOTAL_STAT';
export const fetchTotalStat = createAction(FETCH_TOTAL_STAT, async () => {
  let result = await(await fetch('/api/gdzc/stat/total')).json();
  return result.data;
});

export const SHOW_LIST = 'SHOW_LIST';
export const showList = filter => ({
  type: SHOW_LIST,
  filter
})

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const fetchItems = createAction(FETCH_ITEMS, async (filter) => {
  let query = '';
  for (var key in filter) {
    query += `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}&`;
  }
  let result = await(await fetch(`/api/gdzc/search?${query}`)).json();
  return result.data;
});
export const START_TO_UPLOAD_XLS = 'START_TO_UPLOAD_XLS';
export const startToUploadXls = (file) => ({
  type: 'START_TO_UPLOAD_XLS',
  file
});

export const UPLOAD_XLS = 'UPLOAD_XLS';
export const uploadXls = createAction(UPLOAD_XLS, async (file) => {
  var data = new FormData();
  data.append('xlsFile', file);
  var res = await fetch('/api/gdzc/mergeXls', {
    method: 'PUT',
    body: data
  });
  var result = await res.json();
  return result.data;
})

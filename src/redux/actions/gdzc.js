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

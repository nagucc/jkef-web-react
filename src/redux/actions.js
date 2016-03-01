import {createAction} from 'redux-actions';
import fetchJsonp from 'fetch-jsonp';
import fetch from 'isomorphic-fetch';
import {store} from './store';

let realFetch = fetchJsonp;

export const HOME_PAGE = 'HOME_PAGE';
export const READING_ROOM = 'READING_ROOM';
export const JKEF_PROJECTS = 'JKEF_PROJECTS';

export const SHOW_BOOK_LIST = 'SHOW_BOOK_LIST';
export const SHOW_ACCEPTOR_DETAIL = 'SHOW_ACCEPTOR_DETAIL';

export const FETCH_NGV_BOOKS = 'fetch naguv books';
export const SHOW_STAT = 'SHOW_STAT';
export const FETCH_JKEF_STAT = 'FETCH_JKEF_STAT';

export const FETCH_STATUS_READY = 1;
export const FETCH_STATUS_SUCCESS = 0;
export const FETCH_STATUS_FAILURE = -1;

export const SET_NGV_BOOKS_TEXT_FILTER = 'SET_NGV_BOOKS_TEXT_FILTER';




export const showIndex = createAction(HOME_PAGE);

export const showBookList = createAction(SHOW_BOOK_LIST, start => start);

export const showAcceptorDetail = createAction(SHOW_ACCEPTOR_DETAIL, id => id);

export const fetchNgvBooks = createAction(FETCH_NGV_BOOKS, async (start = 0) => {
	const res = await realFetch(`https://api.douban.com/v2/book/search?tag=ngv_电子阅览室&start=${start}`);
	return {ret: FETCH_STATUS_SUCCESS, data: await res.json()};
});

export const showNgvReadingRoom = createAction(READING_ROOM);

export const setNgvBooksTextFilter = (text) => ({
	type: SET_NGV_BOOKS_TEXT_FILTER,
	text: text ? text.trim() : ''
})

export const showJkefProjects = () => {
	return {
		type: JKEF_PROJECTS,
		site: 'jkef'
	}
}

export const showStat = () => ({
	type: SHOW_STAT
});

export const fetchJkefStat = createAction(FETCH_JKEF_STAT, async ()=> {
	let stat;

	// 历年捐款金额表 & 历年受赠人次表
	try {
		const yearStat = await (await fetch('/api/jkef/stat/year')).json();
		let amount = 0, count = 0;
		yearStat.data.forEach((item) => {
					amount += item.value.amount;
					count += item.value.count;
				});
		stat = Object.assign({}, stat, {
			yearStat,
			amount,
			count,
			yearAmountStat: {
				barData: {
					labels: yearStat.data.map((val) => {
						return val._id + '年';
					}),
					datasets: [{
						label: '金额',
						fillColor: "rgba(220,220,220,0.5)",
			            strokeColor: "rgba(220,220,220,0.8)",
			            highlightFill: "rgba(220,220,220,0.75)",
			            highlightStroke: "rgba(220,220,220,1)",
						data: yearStat.data.map((val) => {
							return val.value.amount;
						})
					}]
				}
			},
			yearCountStat: {
				barData: {
					labels: yearStat.data.map((val) => {
						return val._id + '年';
					}),
					datasets: [{
						label: '受赠人次',
						fillColor: "rgba(220,220,220,0.5)",
			            strokeColor: "rgba(220,220,220,0.8)",
			            highlightFill: "rgba(220,220,220,0.75)",
			            highlightStroke: "rgba(220,220,220,1)",
						data: yearStat.data.map((val) => {
							return val.value.count;
						})
					}]
				}
			}
		});
	} catch (e) {
		stat = Object.assign({}, stat, {yearStat: {ret: FETCH_STATUS_FAILURE, msg: e}});
	}

	//  项目金额饼图
	var colorMaker = function* () {
		yield ['#00CC00', '#9FEE00'];
		yield ['#1924B1', '#0969A2'];
		yield ['#FFEB00', '#FFC200'];
	}();

	try {
		let projectStat = await (await fetch('/api/jkef/stat/project')).json();
		stat = Object.assign({}, stat, {
			projectStat,
			projectAmountStat: {
				pieData: projectStat.data.map((item) => {
					var colors = colorMaker.next().value;
					return {
						label: item._id,
						value: item.value.amount,
						color: colors[0],
						highlight: colors[1]
					};
				})
			}
		});
	} catch(e) {
		stat = Object.assign({}, stat, {projectStat: {ret: FETCH_STATUS_FAILURE, msg: e}});
	}

	return stat;
})

export const SHOW_ACCEPTORS = 'SHOW_ACCEPTORS';
export const showAcceptors = () => ({type: SHOW_ACCEPTORS});

// 清楚所有AcceptorList的参数，并删除所有数据
export const INVALIDATE_ACCEPTOR_LIST = 'INVALIDATE_ACCEPTOR_LIST';
export const invalidateAcceptorList = () => ({
	type: INVALIDATE_ACCEPTOR_LIST
});

/* 设置AcceptorList的过滤参数，包括：
		- year
		- project
		- filter
*/
export const SET_ACCEPTOR_LIST_FILTER = 'SET_ACCEPTOR_LIST_FILTER';
export const setAcceptorListFilter = createAction(SET_ACCEPTOR_LIST_FILTER, params => params);


// 获取下一页Acceptors数据
export const FETCH_ACCEPTOR_LIST = 'FETCH_ACCEPTOR_LIST';
export const fetchAcceptorList = createAction(FETCH_ACCEPTOR_LIST, async (size = 20) => {
	let state = store.getState();
	let payload;

	let nextPage = (state.acceptorList.pageIndex || -1) + 1;
	let project = state.acceptorList.project || '';
	let year = state.acceptorList.year || '';
	let filter = state.acceptorList.filter || '';
	try {
		const res = await fetch(`/api/jkef/acceptors/search/${filter}?project=${project}&year=${year}&page=${nextPage}&size=${size}`);
  	payload = await res.json();
	} catch(e) {
		payload = { ret: FETCH_STATUS_FAILURE, msg: e};
	}
	return payload;
})

export const FETCH_ACCEPTOR_BY_ID = 'FETCH_ACCEPTOR_BY_ID';
export const fetchAcceptorById = createAction(FETCH_ACCEPTOR_BY_ID, async id => {
	let payload;
	const json = await (await fetch(`/api/jkef/acceptors/${id}`)).json();
	return json.data;
});

import { handleActions } from 'redux-actions';
import {
	REPLACE_SEARCH_RESULTS,
	CLEAR_SEARCH_RESULTS
} from '../actions/search';

import { Map, fromJS } from 'immutable';

export const search = handleActions({
	REPLACE_SEARCH_RESULTS: (state, action) => state.merge({
		hasResults: true,
		page: 0,
		results: action.payload
	}),
	APPEND_SEARCH_RESULTS: (state, action) => state.merge({
		hasResults: true,
		page: state.page + 1,
		results: state.results.concat(action.payload)
	}),
	CLEAR_SEARCH_RESULTS: (state, action) => new Map({
		hasResults: false,
		page: 0,
		results: new Map()
	})
}, new Map({
	hasResults: false,
	page: 0,
	results: {}
}));
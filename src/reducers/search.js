import { handleActions } from 'redux-actions';
import {
	RECEIVE_SEARCH_RESULTS,
	CLEAR_SEARCH_RESULTS
} from '../actions/search';

import { Map, fromJS } from 'immutable';

export const search = handleActions({
	RECEIVE_SEARCH_RESULTS: (state, action) => state.merge({
		hasResults: true,
		results: action.payload
	}),
	CLEAR_SEARCH_RESULTS: (state, action) => new Map({
		hasResults: false,
		results: new Map()
	})
}, new Map({
	hasResults: false,
	results: {}
}));
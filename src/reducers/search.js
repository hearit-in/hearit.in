import { handleActions } from 'redux-actions';
import {
	RECEIVE_SEARCH_RESULTS,
	CLEAR_SEARCH_RESULTS
} from '../actions/search';

import { Map } from 'immutable';

export const search = handleActions({
	RECEIVE_SEARCH_RESULTS: (state, action) => ({
		results: action.payload,
		hasResults: true
	}),
	CLEAR_SEARCH_RESULTS: (state, action) => ({
		results: undefined,
		hasResults: false
	})
}, {
	hasResults: false,
	results: undefined
});
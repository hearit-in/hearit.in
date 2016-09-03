import { handleActions } from 'redux-actions';
import {
	REPLACE_SEARCH_RESULTS,
	APPEND_SEARCH_RESULTS,
	CLEAR_SEARCH_RESULTS
} from '../actions/search';

import { Map, List, fromJS } from 'immutable';

export const search = handleActions({
	APPEND_SEARCH_RESULTS: (state, action) => {
		var results = state.get("results")
		var newResults = fromJS(action.payload);
		results = results.concat(newResults);
		
		// Really ugly solution to remove duplicates based on ID
		var finalResults = [];
		results.forEach((a, i) => {
			for(let j = 0; j < i; ++j)
			{
				let b = results.get(j);
				if(a.get("providerId") === b.get("providerId") && i !== j) {
					return;
				}
			}
			
			finalResults.push(a);
		})
		
		var finalResultsAsList = List(finalResults);
		
		return state.withMutations(s => s
			.set("hasResults", true)
			.set("nextPage", state.get("nextPage") + 1)
			.set("results", finalResultsAsList)
		);
	},
	CLEAR_SEARCH_RESULTS: (state, action) => new Map({
		hasResults: false,
		nextPage: 0,
		results: List()
	})
}, new Map({
	hasResults: false,
	nextPage: 0,
	results: List()
}));
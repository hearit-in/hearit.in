import { createAction } from 'redux-actions';
import { Spotify } from '../sources';
import { showError } from './errors';

export const REPLACE_SEARCH_RESULTS = "REPLACE_SEARCH_RESULTS";
export const receiveSearchResults = createAction(REPLACE_SEARCH_RESULTS;

export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const clearSearchResults = createAction(CLEAR_SEARCH_RESULTS);

export function search(query) {
	return (dispatch) =>
		Spotify.search(query, ['track'])
			.then(result => {
				dispatch(receiveSearchResults(result))
			}, error => {
				dispatch(showError("En feil oppstod under søket: " + error));
			})
}

export function loadMoreResults() {
	
}
import { createAction } from 'redux-actions';
import { Spotify } from '../sources';
import { showError } from './errors';

export const APPEND_SEARCH_RESULTS = "APPEND_SEARCH_RESULTS";
export const appendSearchResults = createAction(APPEND_SEARCH_RESULTS);

export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const clearSearchResults = createAction(CLEAR_SEARCH_RESULTS);

export function search(query, page, clearExisting) {
	if(clearExisting === undefined) {
		clearExisting = true;
	}
	
	
	return (dispatch) =>
		Spotify.search(query, ['track'], page)
			.then(results => {
				if(clearExisting) {
					dispatch(clearSearchResults());
				}
				
				dispatch(appendSearchResults(results));
			}, error => {
				console.warning(error);
				dispatch(showError("En feil oppstod under søket: " + error));
			})
}
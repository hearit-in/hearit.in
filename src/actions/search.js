import { createAction } from 'redux-actions';
import { Spotify } from '../sources';

export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const receiveSearchResults = createAction(RECEIVE_SEARCH_RESULTS);

export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const clearSearchResults = createAction(CLEAR_SEARCH_RESULTS);

export function search(query) {
	return (dispatch) =>
		Spotify.search(query, ['track'])
			.then(result => {
				dispatch(receiveSearchResults(result))
			})
}
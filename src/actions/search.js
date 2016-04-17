import { createAction } from 'redux-actions';
import { Spotify } from '../sources';

export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const receiveSearchResults = createAction(RECEIVE_SEARCH_RESULTS);

export function search(query) {
	return (dispatch) =>
		Spotify.search(query, ['track', 'album', 'artist'])
			.then(result => {
				//dispatch(receiveSearchResults(result))
			})
}

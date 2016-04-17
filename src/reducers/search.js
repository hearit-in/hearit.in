import { handleActions } from 'redux-actions';
import { RECEIVE_SEARCH_RESULTS } from '../actions/search';

import { Map } from 'immutable';

const search = handleActions({
	RECEIVE_SEARCH_RESULTS: (state, action) => action.payload
}, undefined);

export default search;

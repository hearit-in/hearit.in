import { handleActions } from 'redux-actions';

import {
	SET_SESSION
} from '../actions';

export const session = handleActions({
	SET_SESSION: (state, action) => {
		return action.payload;
	}
}, {})
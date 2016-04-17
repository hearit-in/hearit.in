import { handleActions } from 'redux-actions';
import { List } from 'immutable';
import {
	PUSH_ERROR,
	POP_ERROR
} from '../actions/errors';

export const errors = handleActions({
	PUSH_ERROR: (state, action) => state.push(action.payload),
	POP_ERROR: (state, action) => state.pop()
}, new List());

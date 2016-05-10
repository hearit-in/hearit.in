import { handleActions } from 'redux-actions';
import { SET_ROUTER } from 'actions/router';

export const router = handleActions({
	SET_ROUTER: (state, action) => action.payload
}, {});
import { handleActions } from 'redux-actions';
import { RECEIVE_ROOM } from '../actions/queue';

const room = handleActions({
	RECEIVE_QUEUE: (state, action) => action.payload
}, {});

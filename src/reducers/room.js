import { handleActions } from 'redux-actions';
import { RECEIVE_ROOM } from '../actions/room';

const room = handleActions({
	RECEIVE_ROOM: (state, action) => action.payload
}, {});

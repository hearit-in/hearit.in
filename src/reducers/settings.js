import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import {
	SET_DARK_THEME_ENABLED
} from 'actions/settings';

export const settings = handleActions({
	SET_DARK_THEME_ENABLED: (state, action) => state.set("darkThemeEnabled", action.payload)
}, new Map({
	darkThemeEnabled: false
}));

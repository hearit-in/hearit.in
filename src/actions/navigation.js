import {history} from 'helpers';

export function navigateTo(location) {
	return () => {
		history.push(location);
	}
}
import config from 'config';

export function firebaseUrlForNode(node) {
	return config.firebaseURL + node;
}

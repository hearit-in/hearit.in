import _ from 'lodash';

export function className(names) {
	return _(names)
		.filter((v, k) => !!v)
		.keys()
		.join(" ");
}
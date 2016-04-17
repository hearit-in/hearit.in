import fetch from 'isomorphic-fetch';
import {includes} from 'lodash';

const BASE_URL = "https://api.spotify.com/v1";

export function search(query, types) {
	let typesString = types
		.filter(t => includes([
			'track',
			'album',
			'artist',
			'playlist'
		], t))
		.join(",");

	let escapedQuery = escape(query);

	return fetch(`${BASE_URL}/search?q=${escapedQuery}&type=${typesString}&market=NO`)
		.then(result => result.json());
}

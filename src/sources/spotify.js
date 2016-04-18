import fetch from 'isomorphic-fetch';
import {includes} from 'lodash';

const BASE_URL = "https://api.spotify.com/v1";

function processAlbum(album) {
	return album;
}

function getArtistString(artists) {
	return artists
		.map(artist => artist.name)
		.join(", ")
}

function processTrack(track) {
	let album = processAlbum(track.album)
	return {
		album,
		artist: getArtistString(track.artists),
		name: track.name,
		id: track.id,
		images: album.images
	}
}

function processSearchResults(results) {
	return {
		tracks: results.tracks.items.map(processTrack),
		albums: results.albums.items.map(processAlbum)
	}
}

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
		.then(result => result.json())
		.then(processSearchResults);
}

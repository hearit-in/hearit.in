import fetch from 'isomorphic-fetch';
import {includes,curry} from 'lodash';

const BASE_URL = "https://api.spotify.com/v1";

const MARKETS = ['NO'];

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
		artistString: getArtistString(track.artists),
		artists: track.artists,
		name: track.name,
		provider: "spotify",
		providerId: track.id,
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
		.filter(curry(includes)([
			'track',
			'album',
			'artist',
			'playlist'
		]))
		.join(",");

	let escapedQuery = escape(query);

	return fetch(`${BASE_URL}/search?q=${escapedQuery}&type=${typesString}&market=${MARKETS.join(',')}&limit=50`)
		.then(result => result.json())
		.then(processSearchResults);
}

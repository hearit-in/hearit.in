import fetch from 'isomorphic-fetch';
import _, {includes,curry} from 'lodash';

const BASE_URL = "https://api.spotify.com/v1";
const MARKETS = ['NO'];
export const SEARCH_RESULTS_LIMIT = 50;

function getArtist(artists) {
	return artists
		.map(artist => artist.name)
		.join(", ")
}

// Fuck this piece of shit code
function findImageForLimit(images, limit) {
	let out = undefined;
	let smallest = images[0];
	
	for(let i = 0; i < images.length; ++i) {
		let image = images[i];
		if(image.width < smallest.width)
			smallest = image;
		
		// We're trying to find the largest image that satisfies the upper limit.
		if(image.width < limit && (out === undefined ? true : image.width > out.width))
			out = image;
	}
	
	if(out === undefined)
		return smallest;
	
	return out;
}

function getImages(imagesArray) {
	const limits = {
		small: 100,
		medium: 300,
		large: Infinity
	};
	
	return _.mapValues(limits,
		(limit) => findImageForLimit(imagesArray, limit).url
	);
}

function processTrack(track) {
	return {
		artist: getArtist(track.artists),
		album: track.album.name,
		name: track.name,
		provider: "spotify",
		providerId: track.id,
		images: getImages(track.album.images)
	}
}


function processSearchResults(results) {
	return {
		tracks: results.tracks.items.map(processTrack),
		//albums: results.albums.items.map(processAlbum)
	}
}

export function search(query, types) {
	let typesString = types
		.filter(curry(includes)([
			'track',
		]))
		.join(",");

	// The asterisks ensure drunk people can still search for partial words
	let escapedQuery = escape("*" + query + "*");

	return fetch(`${BASE_URL}/search?q=${escapedQuery}&type=${typesString}&market=${MARKETS.join(',')}&limit=${SEARCH_RESULTS_LIMIT}`)
		.then(result => result.json())
		.then(processSearchResults);
}

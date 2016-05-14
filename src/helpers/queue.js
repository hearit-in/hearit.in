import { Map } from 'immutable';

export function sortQueueByVotes(a, b) {
	let pinnedA = a.get("pinned", false);
	let pinnedB = b.get("pinned", false);

	if(pinnedA && !pinnedB) return -1;
	if(pinnedB && !pinnedA) return 1;

	let votesA = a.get("votes", new Map()).size;
	let votesB = b.get("votes", new Map()).size;

	if(votesA > votesB) return -1;
	if(votesB > votesA) return 1;

	let timeA = a.get("queuedAt", 0);
	let timeB = b.get("queuedAt", 0);

	if(timeB > timeA) return -1;
	if(timeA > timeB) return 1;

	return 0;
}

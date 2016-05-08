export function compareTracksByProviderId(a, b) {
	return a.get("provider") === b.get("provider")
		&& a.get("providerId") === b.get("providerId")
}

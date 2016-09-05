import React, {PropTypes} from 'react';

import {
	Dialog,
	List,
	ListItem,
	Divider
} from 'material-ui';

import {
	ActionFavorite,
	ActionFavoriteBorder,
	NavigationMoreVert,
	AvQueuePlayNext,
	AvPlayArrow,
	ActionDelete
} from 'material-ui/lib/svg-icons';

import LikeCheckbox from './likeCheckbox';
import TrackListItem from '../trackListItem';

import { connect } from 'react-redux';

import {
	toggleVote,
	playNow,
	removeTrackFromQueue,
	toggleTrackPinnedToTop
} from 'actions';

import { Map } from 'immutable';

class TrackAdminMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	requestCloseAnd(fn) {
		this.props.onRequestClose();
		fn.call(this);
	}

	render() {
		let trackOrDefault = this.props.track
			? this.props.track
			: Map({
				votes: Map(),
				pinned: false
			});
		
		let votes = trackOrDefault.get("votes");
		let hasVoted = votes == undefined ? false : votes.has(this.props.uid);
		
		return (
			<Dialog
				open={this.props.open}
				modal={false}
				contentStyle={{
					width: 350
				}}
				onRequestClose={() => this.props.onRequestClose()}>
				<List>
					<TrackListItem track={this.props.track} disabled />
					<ListItem
						type=""
						className="top-margin"
						leftIcon={hasVoted ? <ActionFavoriteBorder /> : <ActionFavorite />}
						primaryText={hasVoted ? "Fjern stemme" : "Stem på"}
						onTouchTap={() => this.requestCloseAnd(() => this.props.onToggleVote(this.props.track))} />
					<ListItem
						type=""
						leftIcon={<AvPlayArrow />}
						primaryText="Spill nå"
						onTouchTap={() => this.requestCloseAnd(() => this.props.onPlayNow(this.props.track))} />
					<ListItem
						type=""
						leftIcon={<AvQueuePlayNext />}
						primaryText={
							trackOrDefault.get("pinned") ? "Ikke lås som neste" : "Lås som neste"
						}
						onTouchTap={() => this.requestCloseAnd(() => this.props.onToggleTrackPinnedToTop(this.props.track))} />
					<ListItem
						type=""
						leftIcon={<ActionDelete />}
						primaryText="Fjern"
						onTouchTap={() => this.requestCloseAnd(() => this.props.onRemoveTrack(this.props.track))} />
				</List>
			</Dialog>
		)
	}
}

TrackAdminMenu.propTypes = {
	open: PropTypes.bool,
	track: PropTypes.object,
	onRequestClose: PropTypes.func,
	hasVoted: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		uid: state.getIn(["session", "authData", "uid"])
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onToggleVote: (track) => dispatch(toggleVote(track.get("id"))),
		onPlayNow: (track) => dispatch(playNow(track)),
		onRemoveTrack: (track) => dispatch(removeTrackFromQueue(track)),
		onToggleTrackPinnedToTop: (track) => dispatch(toggleTrackPinnedToTop(track))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackAdminMenu);

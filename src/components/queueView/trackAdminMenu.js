import React, {PropTypes} from 'react';

import {
	Dialog,
	List,
	ListItem,
	Divider
} from 'material-ui';

import {
	ActionFavorite,
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
	pinTrackToTop,
 	unpinTrackFromTop
} from 'actions';

class TrackAdminMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	requestCloseAnd(fn) {
		this.props.onRequestClose();
		fn.call(this);
	}

	render() {
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
						leftIcon={<ActionFavorite />}
						primaryText="Stem på"
						onTouchTap={() => this.requestCloseAnd(() => this.props.onToggleVote(this.props.track))} />
					{/* <ListItem
						type=""
						leftIcon={<AvPlayArrow />}
						primaryText="Spill nå"
						onTouchTap={() => this.requestCloseAnd(() => this.props.onPlayNow(this.props.track))} /> */}
					<ListItem
						type=""
						leftIcon={<AvQueuePlayNext />}
						primaryText="Spill neste"
						onTouchTap={() => this.requestCloseAnd(() => this.props.onPinTrackToTop(this.props.track))} />
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
	onRequestClose: PropTypes.func
};

function mapDispatchToProps(dispatch) {
	return {
		onToggleVote: (track) => dispatch(toggleVote(track.get("id"))),
		onPlayNow: (track) => dispatch(playNow(track)),
		onRemoveTrack: (track) => dispatch(removeTrackFromQueue(track)),
		onPinTrackToTop: (track) => dispatch(pinTrackToTop(track))
	}
}

export default connect(undefined, mapDispatchToProps)(TrackAdminMenu);

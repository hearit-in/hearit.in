import React, {PropTypes} from 'react';

import { values } from 'lodash';
import { fromJS, Map } from 'immutable';

import {
	TextField,
	FlatButton,
	List,
	ListItem,
	Divider,
	Paper,
	Card,
	Avatar,
	Checkbox
} from 'material-ui';

import Colors from 'material-ui/lib/styles/colors';


import { connect } from 'react-redux';
import { tryEnterSession } from 'actions';

import Firebase from 'firebase';
import { sortQueueByVotes } from 'helpers/queue';

import FlipMove from 'react-flip-move';
import { VelocityTransitionGroup } from 'velocity-react';

import TrackListItem from '../trackListItem';
import EmptyQueueView from './emptyQueueView';
import TrackAdminMenu from './trackAdminMenu';

import LikeCheckbox from './likeCheckbox';

class QueueListItem extends React.Component {
	render() {
		return (
			<TrackListItem
				{...this.props}
				rightToggle={
					<LikeCheckbox
						checked={this.props.hasVoted}
						label={this.props.numVotes.toString()}
						onCheck={() => this.props.onToggleVote()} />
				} />
		);
	}
}

QueueListItem.defaultProps = {
	hasVoted: true,
	numVotes: 1,
	track: Map(),
	onToggleVote: () => {}
}

class QueueView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			queue: Map(),
			isAdminMenuOpen: false,
			adminMenuTrack: null
		}
	}
	
	

	componentDidMount() {
		this.listenToRoom(this.context.roomRef);
	}

	listenToRoom(roomRef) {
		this.ref = this.context.roomRef
			.child("queue");

		this.onQueueUpdated = this.ref
			.on("value", (snapshot) => {
				let tracksObject = snapshot.val();
				let tracks = fromJS(tracksObject);
				this.setState({
					queue: tracks !== null ? tracks : new Map()
				});
			});
	}

	stopListeningToRoom() {
		if(this.ref) {
			this.ref.off("value", this.onQueueUpdated);
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if(this.context.roomRef !== nextContext.roomRef) {
			this.stopListeningToRoom();
			this.listenToRoom(nextContext.roomRef);
		}
	}

	componentWillUnmount() {
		this.stopListeningToRoom();
	}

	toggleVote(trackId) {
		this.ref
			.child(`${trackId}/votes/${this.props.uid}`)
			.once("value", (snap) => {
				if(snap.exists()) {
					snap.ref().remove();
				}
				else {
					snap.ref().set(true);
				}
			});
	}

	render() {
		let queue = this.state.queue.sort(sortQueueByVotes);

		let items = queue.map((track, index) => {
			let votes = track.get("votes", new Map());
			let hasVoted = votes.has(this.props.uid);

			return (
				<div key={index} index={index} className="animate-me">
					<QueueListItem
						track={track}
						hasVoted={hasVoted}
						numVotes={votes.size}
						onToggleVote={() => this.toggleVote(index)} />
				</div>
			);
		}).toArray();

		return (
			<div className="container">
				<div className="row top-margin">
					<div className="col-md-8 col-md-offset-2 col-xs-12">
						{ items.length == 0 ? <EmptyQueueView /> : (
							<List>
								<FlipMove
									easing="ease"
									enterAnimation="fade"
									exitAnimation="fade"
									staggerDelayBy={30}
									duration={400}>
									{items}
								</FlipMove>
							</List>
						)}
					</div>
				</div>
			</div>
		);
	}
}

QueueView.contextTypes = {
	roomRef: PropTypes.object
}

function mapStateToProps(state) {
	return {
		uid: state.getIn(["session", "authData", "uid"])
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueView);
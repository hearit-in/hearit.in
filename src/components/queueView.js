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

import ActionFavorite from 'material-ui/lib/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';

import { connect } from 'react-redux';
import { tryEnterSession } from '../actions';

import Firebase from 'firebase';
import { firebaseForRoomId } from '../helpers/firebase';
import { sortQueueByVotes } from 'helpers/queue';

import FlipMove from 'react-flip-move';
import { VelocityTransitionGroup } from 'velocity-react';
import TrackListItem from './trackListItem';

class QueueListItem extends React.Component {
	render() {
		return (
			<TrackListItem
				{...this.props}
				rightToggle={
					<Checkbox
						labelPosition="left"
						label={this.props.numVotes.toString()}
						checked={this.props.hasVoted}
						onCheck={() => this.props.onToggleVote()}
						iconStyle={{
							fill: Colors.pink500
						}}
						checkedIcon={<ActionFavorite />}
						unCheckedIcon={<ActionFavoriteBorder />} />
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
			queue: Map()
		}
	}

	componentDidMount() {
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

	componentWillUnmount() {
		this.ref.off("value", this.onQueueUpdated)
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
				<div key={index} className="animate-me">
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
						<Paper>
							<List>
								<FlipMove easing="ease">
									{items}
								</FlipMove>
							</List>
						</Paper>
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
		roomId: state.getIn(["session", "roomId"]),
		uid: state.getIn(["session", "authData", "uid"])
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueView);

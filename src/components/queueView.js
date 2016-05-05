import React from 'react';

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

import FlipMove from 'react-flip-move';

class QueueListItem extends React.Component {
	componentDidMount() {

	}

	render() {
		let images = this.props.track.get("images");
		let image = images.get(1) || images.get(0);

		return (
			<ListItem
				primaryText={this.props.track.get("name")}
				secondaryText={this.props.track.get("artistString")}
				type=""
				disabled={true}
				leftAvatar={<Avatar src={image.get("url")} />}
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
		)
	}
}

QueueListItem.defaultProps = {
	hasVoted: true,
	numVotes: 1,
	onToggleVote: () => {}
}

class QueueView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			queue: new Map()
		}
	}

	componentDidMount() {
		this.ref = firebaseForRoomId(this.props.roomId)
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
		let queue = this.state.queue;
		let orderedQueue = queue.sort((a, b) => {
			let votesA = a.get("votes", new Map()).size;
			let votesB = b.get("votes", new Map()).size;

			if(votesA > votesB) return -1;
			if(votesB > votesA) return 1;
			
			let timeA = a.get("queued_at", 0);
			let timeB = b.get("queued_at", 0);
			
			if(timeB > timeA) return -1;
			if(timeA > timeB) return 1;
			
			return 0;
		});

		let items = orderedQueue.map((track, index) => {
			let votes = track.get("votes", new Map());
			let hasVoted = votes.has(this.props.uid);

			return (
				<div key={index} className="animate-me">
					<QueueListItem
						track={track}
						hasVoted={hasVoted}
						numVotes={votes.size}
						onToggleVote={() => this.toggleVote(index)} />
					<Divider />
				</div>
			);
		}).valueSeq();

		return (
			<div className="">
				<div className="row">
					<Paper className="col-md-8 col-md-offset-2 col-xs-12">
						<List>
							<FlipMove easing="ease">
								{items}
							</FlipMove>
						</List>
					</Paper>
				</div>
			</div>
		);
	}
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

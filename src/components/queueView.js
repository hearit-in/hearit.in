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

class QueueListItem extends React.Component {
	componentDidMount() {

	}

	render() {
		return (
			<ListItem
				primaryText={this.props.track.get("name")}
				secondaryText={this.props.track.get("artistString")}
				type=""
				disabled={true}
				rightToggle={
					<Checkbox
						labelPosition="left"
						label={this.props.numVotes.toString()}
						checked={this.props.hasVoted}
						onClick={() => this.props.onToggleVote()}
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
			let votesA = a.get("votes").size;
			let votesB = b.get("votes").size;

			if(votesA > votesB) return -1;
			if(votesA < votesB) return 1;
			return 0;
		});

		let items = this.state.queue.map((track, index) => {
			let votes = track.get("votes", new Map());
			let hasVoted = votes.has(this.props.uid);

			return (
				<QueueListItem
					track={track}
					key={index}
					hasVoted={hasVoted}
					numVotes={votes.size}
					onToggleVote={() => this.toggleVote(index)} />
			);
		}).valueSeq();

		return (
		<div className="">
			<div class="row">
				<Paper className="col-md-8 col-md-offset-2 col-xs-12">
					<List>
						{items}
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

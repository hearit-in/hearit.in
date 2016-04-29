import React from 'react';

import { values } from 'lodash';
import { fromJS } from 'immutable';

import {
	TextField,
	FlatButton,
	List,
	ListItem,
	Divider,
	Paper,
	Card
} from 'material-ui';
import ThumbUp from 'material-ui/lib/svg-icons/action/thumb-up';

import { connect } from 'react-redux';
import { tryEnterSession } from '../actions';

import Firebase from 'firebase';
import { firebaseUrlForNode } from '../helpers/firebase';

class VoteButton extends React.Component {
	render() {

	}
}

class QueueListItem extends React.Component {
	componentDidMount() {

	}

	render() {
		return (
			<ListItem
				primaryText={this.props.track.get("name")}
				secondaryText={this.props.track.get("artistString")}
				type=""
				disabled={true} />
		)
	}
}

class QueueView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			queue: []
		}
	}

	componentDidMount() {
		//this.ref.keepSynced(true);
		this.onQueueUpdated = this.props.roomRef
			.child("queue")
			.orderByKey()
			.on("value", (snapshot) => {
				let tracks = fromJS(values(snapshot.val()));
				this.setState({
					queue: tracks
				});
			});
	}

	componentWillUnmount() {
		this.props.roomRef.off("value", this.onQueueUpdated)
	}

	render() {
		return (
		<div className="container">
				<Paper className="col-md-8 col-md-offset-2">
					<List>
					{this.state.queue.map((track, index) => (
						<QueueListItem track={track} key={index} />
					))}
					</List>
				</Paper>
		</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		roomRef: state.getIn(["session", "roomRef"])
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueView);

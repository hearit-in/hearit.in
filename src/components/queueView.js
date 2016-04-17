import React from 'react';

import { values } from 'lodash';

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
				primaryText={this.props.track.title}
				secondaryText={this.props.track.artist}
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
		this.ref = new Firebase(firebaseUrlForNode(`rooms/${this.props.roomId}/queue`));

		this.onQueueUpdated = this.ref
			.orderByKey()
			.on("value", (snapshot) => {
				this.setState({
					queue: values(snapshot.val())
				})
			});
	}

	componentWillUnmount() {
		this.ref.off("value", this.onQueueUpdated)
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

QueueView.defaultProps = {
	room: { queue: [] }
}

function mapStateToProps(state) {
	return {
		roomId: state.session.get("roomId")
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueView);

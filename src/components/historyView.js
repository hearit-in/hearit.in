import React, {PropTypes} from 'react';

import {
	Card,
	Toolbar,
	ToolbarGroup,
	RaisedButton,
	List,
	ListItem,
	Avatar
} from 'material-ui';

import TrackListItem from './trackListItem';

import { Map, fromJS } from 'immutable';

export default class HistoryView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tracks: new Map()
		};
	}

	componentDidMount() {
		this.query = this.context.roomRef
			.child("history")
			.orderByChild("playedAt");

		this.onQueueUpdated = this.query.on("value",
			(snapshot) => {
				let tracksObject = snapshot.val();
				let tracks = fromJS(tracksObject);
				this.setState({
					tracks: tracks == null ? [] : tracks.toArray().reverse()
				});
			});
	}

	componentWillUnmount() {
		this.query.off("value", this.onQueueUpdated)
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="row top-margin">
						<div className="col-md-12">
							<RaisedButton fullWidth={true} primary label="Åpne i Spotify" />
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 top-margin">
							<Card>
								<List>
									{ this.state.tracks.map((track, index) => {
										<TrackListItem key={track.get("id")} track={track} />
									}) }
								</List>
							</Card>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

HistoryView.contextTypes = {
	roomRef: PropTypes.object
};

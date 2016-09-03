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

import { showError } from 'actions/errors';
import TrackListItem from './trackListItem';
import { Map, List as ImmutableList, fromJS } from 'immutable';
import { connect } from 'react-redux';

class HistoryView extends React.Component {
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

		this.onHistoryUpdated = this.query.on("value",
			(snapshot) => {
				let tracksObject = snapshot.val();
				let tracks = fromJS(tracksObject);
				this.setState({
					tracks: tracks == null ? ImmutableList() :
						tracks
							.toSeq()
							.sortBy(x => x.get("playedAt"))
							.reverse()
				});
			});
	}

	componentWillUnmount() {
		this.query.off("value", this.onHistoryUpdated)
	}
	
	openSpotifyPlaylist() {
		// TODO: Remove really ugly hack
		
		this.context.roomRef
			.child("spotifyPlaylistId")
			.once("value")
			.then(snapshot => snapshot.val())
			.then(playlistId => {
				window.location.href = "spotify:user:hearitapp:playlist:" + playlistId;
			}, err => {
				this.props.onShowError("Spotify-listen har ikke blitt opprettet enda. Prøv igjen om litt.");
			})
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="row top-margin">
						<div className="col-md-12">
							<RaisedButton
								fullWidth={true}
								backgroundColor="#1ED760"
								labelStyle={{
									color: "#fff"
								}}
								label="Åpne i Spotify"
								onTouchTap={() => this.openSpotifyPlaylist()} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 top-margin">
							<Card>
								<List>
									{ this.state.tracks.map((track, index) =>
										<TrackListItem key={track.get("id")} track={track} disabled />
									).valueSeq() }
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

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		onShowError: (error) => dispatch(showError(error))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryView);
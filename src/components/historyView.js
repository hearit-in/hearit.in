import React, {PropTypes} from 'react';

import {
	Card,
	Toolbar,
	ToolbarGroup,
	RaisedButton,
	FlatButton,
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
			tracks: new Map(),
			spotifyPlaylistId: null
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
		
		this.spotifyPlaylistIdRef = this.context.roomRef.child("spotifyPlaylistId");
		this.onSpotifyPlaylistIdUpdated =
			this.spotifyPlaylistIdRef.on("value", (snapshot) => {
				this.setState({
					spotifyPlaylistId: snapshot.val()
				})
			});
	}

	componentWillUnmount() {
		this.query.off("value", this.onHistoryUpdated);
		this.spotifyPlaylistIdRef.off("value", this.onSpotifyPlaylistIdUpdated);
	}
	
	openSpotifyPlaylist() {
		if(this.state.spotifyPlaylistId === null) {
			this.props.onShowError("Spotify-listen har ikke blitt opprettet enda. Prøv igjen om litt.");
			return;
		}
		window.open("https://open.spotify.com/user/hearitapp/playlist/" + this.state.spotifyPlaylistId);
	}

	render() {
		return (
			<div>
				<div className="container">
					{this.state.spotifyPlaylistId === null ? null :
						<div className="row top-margin">
							<div className="col-md-12">
								<FlatButton
									fullWidth={true}
									rippleColor="#1ED760"
									style={{
										width: "100%"
									}}
									labelStyle={{
										color: "#1ED760"
									}}
									label="Åpne i Spotify"
									onTouchTap={() => this.openSpotifyPlaylist()} />
							</div>
						</div>
					}
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
"use strict";

import React from 'react';

import {
	TextField,
	FlatButton,
	List,
	ListItem,
	Divider,
	Paper,
	Card,
	Avatar,
	Dialog
} from 'material-ui';

import { connect } from 'react-redux';

import { search, clearSearchResults, addTrackToQueue } from 'actions';

import { Map, List as IList } from 'immutable';
import { debounce } from 'lodash';

class SearchResultItem extends React.Component {
	render() {
		return (
			<ListItem type="" {...this.props} />
		)
	}
}

class SearchResultGroup extends React.Component {
	render() {
		return
			<ListItem
				primaryText={this.props.title}
				type=""
				autoGenerateNestedIndicator={true}
				initiallyOpen={true}
				nestedItems={this.props.children} />
	}
}

class SearchView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showConfirmDialog: false,
			selectedTrack: undefined
		};

		this.debouncedSearch = debounce(this.performSearch, 800);
	}

	performSearch(query) {
		if(query.trim().length == 0) {
			this.props.onClearSearch();
		}
		else {
			this.props.onSearch(query);
		}
	}

	setShowConfirmDialog(show) {
		this.setState({
			showConfirmDialog: show
		});
	}

	setSelectedTrack(track) {
		this.setState({
			selectedTrack: track
		});
	}

	onTrackClicked(track) {
		this.setSelectedTrack(track);
		this.setShowConfirmDialog(true);
	}

	confirmQueueTrack(track) {
		this.props.onAddTrackToQueue(track);
	}

	renderConfirmDialog(track) {
		if(!track) {
			return;
		}

		return (
			<Dialog
				title={`Legg til "${this.state.selectedTrack.get('name')}" i kø?`}
				modal={false}
				open={this.state.showConfirmDialog}
				actions={[
					<FlatButton label="Avbryt" secondary={true} onClick={() => this.setShowConfirmDialog(false)} />,
					<FlatButton label="OK" primary={true} onClick={() => {
						this.setShowConfirmDialog(false);
						this.confirmQueueTrack(track);
					}} />
				]} />
		)
	}

	renderSearchResults() {
		if(!this.props.results)
			return;
		}

		return (
			<Paper className="col-md-12">
				<List>
					{this.props.results.get("tracks").map((track) => {
						const images = track.get("images");
						const image = images.get(1) || images.get(0);

						return (<SearchResultItem
							primaryText={track.get("name")}
							secondaryText={track.get("artist")}
							leftAvatar={<Avatar src={image.get("url")} />}
							key={track.get("id")}
							onClick={() => this.onTrackClicked(track)} />)
					})}
				</List>
			</Paper>
		)
	}

	render() {
		return (
			<div>
				{ this.renderConfirmDialog(this.state.selectedTrack) }
				<div className="container">
					<div className="row">
						<Paper className="col-md-12">
							<TextField fullWidth={true} floatingLabelText="Søk..." onChange={e => this.debouncedSearch(e.target.value)} />
						</Paper>
					</div>

					<div className="row top-margin">
						{ this.renderSearchResults() }
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	let res = {
		results: state.get("search").get("results")
	};
	console.log(res);
	return res;
}

function mapDispatchToProps(dispatch) {
	return {
		onSearch: (query) => dispatch(search(query)),
		onClearSearch: (query) => dispatch(clearSearchResults()),
		onAddTrackToQueue: (track) => dispatch(addTrackToQueue)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);

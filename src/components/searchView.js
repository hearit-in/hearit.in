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

import TrackListItem from './trackListItem';

import { connect } from 'react-redux';

import { search, clearSearchResults, addTrackToQueue } from 'actions';

import { Map, List as IList } from 'immutable';
import { debounce } from 'lodash';
import FlipMove from 'react-flip-move';

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

		this.debouncedSearch = debounce(this.performSearch, 400);
	}

	componentWillUnmount() {
		this.props.onClearSearch();
	}

	componentWillReceiveProps(newProps) {
		if(newProps.query !== this.props.query) {
			this.debouncedSearch(newProps.query);
		}
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
		if(!this.props.hasResults) {
			return;
		}

		return (
			<Paper className="flexy"	>
				<List>
					<FlipMove
						easing="ease"
						enterAnimation="accordianVertical"
						exitAnimation="accordianVertical"
						staggerDelayBy={60}
						duration={400}>
						{ this.props.results.get("tracks").valueSeq().map((track, i) =>
							<TrackListItem
								className="animate-me"
								track={track}
								key={track.get("providerId")}
								index={i}
								onClick={() => this.onTrackClicked(track)} />
						) }
					</FlipMove>
				</List>
			</Paper>
		);
	}

	render() {
		return (
			<div>
				{ this.renderConfirmDialog(this.state.selectedTrack) }
				{ this.renderSearchResults() }
			</div>
		);
	}
}

function mapStateToProps(state) {
	let res = {
		results: state.getIn(["search", "results"]),
		hasResults: state.getIn(["search", "hasResults"])
	};
	return res;
}

function mapDispatchToProps(dispatch) {
	return {
		onSearch: (query) => dispatch(search(query)),
		onClearSearch: (query) => dispatch(clearSearchResults()),
		onAddTrackToQueue: (track) => dispatch(addTrackToQueue(track))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);

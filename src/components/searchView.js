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
import { search, clearSearchResults } from 'actions/search';

import { Map } from 'immutable';
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
		return (
			<ListItem
				primaryText={this.props.title}
				type=""
				autoGenerateNestedIndicator={true}
				initiallyOpen={true}
				nestedItems={this.props.children} />
		)
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

	componentDidMount() {
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

	dismissConfirmDialog() {

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

	renderConfirmDialog(track) {
		if(!track) {
			return;
		}

		return (
			<Dialog
				title={`Legg til "${this.state.selectedTrack.name}" i kø?`}
				modal={false}
				open={this.state.showConfirmDialog}
				actions={[
					<FlatButton label="Avbryt" secondary={true} />,
					<FlatButton label="OK" primary={true} />
				]} />
		)
	}

	renderSearchResults() {
		if(!this.props.hasResults) {
			return;
		}

		return (
			<Paper className="col-md-12">
				<List>
					{this.props.results.tracks.map(track =>
						<SearchResultItem
							primaryText={track.name}
							secondaryText={track.artist}
							leftAvatar={<Avatar src={(track.images[1] || track.images[0]).url} />}
							key={track.id}
							onClick={() => this.onTrackClicked(track)} />
					)}
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
	return state.get("search").toJS();
}

function mapDispatchToProps(dispatch) {
	return {
		onSearch: (query) => dispatch(search(query)),
		onClearSearch: (query) => dispatch(clearSearchResults())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);

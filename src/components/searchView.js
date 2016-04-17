import React from 'react';

import {
	TextField,
	FlatButton,
	List,
	ListItem,
	Divider,
	Paper,
	Card
} from 'material-ui';

import { connect } from 'react-redux';
import { search } from '../actions/search';

import { Map } from 'immutable';

class SearchResultItem extends React.Component {
	render() {
		return (
			<ListItem type="" {...this.props} />
		)
	}
}

class SearchView extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onSearch("shlava")
	}

	render() {
		let trackItems = this.props.hasSearchResults? this.props.searchResults.get("tracks").items
			.map(track => {
				<ListItem type="" primaryText={track.name} />
			}) : undefined;

		return (
		<div className="container">
			<Paper className="col-md-8 col-md-offset-2">
				<TextField fullWidth={true} floatingLabelText="Søk..." />
				{hasSearchResults?(
					<List>
						<ListItem
							primaryText="Sanger"
							type=""
							autoGenerateNestedIndicator={true}
							initiallyOpen={true}
							nestedItems={trackItems} />
					</List>
				):<div />}

			</Paper>
		</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		searchResults: state.search,
		hasSearchResults: state.search !== undefined
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onSearch: (query) => dispatch(search(query))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);

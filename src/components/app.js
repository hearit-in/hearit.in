require('normalize.css/normalize.css');
require('styles/style.stylus');

import React from 'react';
import { connect } from 'react-redux';

import { AppBar, Icon, IconButton, Snackbar } from 'material-ui';
import {
	NavigationMenu,
	NavigationArrowBack
} from 'material-ui/lib/svg-icons';
import { VelocityTransitionGroup } from 'velocity-react';

import Nav from './nav';
import AuthView from './authView';
import { history } from 'helpers';
import  RoomRefProvider from './roomRefProvider';
import { clearSearchResults } from 'actions/search';
import SearchView from './searchView';
import AdminListener from './adminListener';

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNavigationOpen: false,
			searchQuery: ""
		}
	}

	componentDidMount() {
		if(this.props.roomId == undefined) {
			history.push("/");
		}
	}

	setNavigationOpen(isNavigationOpen) {
		this.setState({ isNavigationOpen });
	}
	
	hasSearchQuery() {
		return this.state.searchQuery.trim().length != 0;
	}

	setSearchQuery(searchQuery) {
		this.setState({searchQuery});
	}

	exitSearch() {
		this.setSearchQuery("");
		this.props.onClearSearchResults();
	}

	render() {
		if(this.hasSearchQuery()) {
			var button = (
				<IconButton onTouchTap={() => this.exitSearch()}>
					<NavigationArrowBack />
				</IconButton>
			)
		}
		else {
			var button = (
				<IconButton onTouchTap={() => this.setNavigationOpen(true)}>
					<NavigationMenu />
				</IconButton>
			)
		}

		let appBar = (
			<AppBar
				iconElementLeft={button}
				style={{
					position: "fixed",
					top: 0
				}}>
					<input
						type="text"
						className="search-bar"
						placeholder="Søk for å legge til sanger"
						value={this.state.searchQuery}
						onChange={(e) => this.setSearchQuery(e.target.value)} />
			</AppBar>
		);

		return (
		<RoomRefProvider>
			<div>
				<AdminListener />
				
				{ appBar }

				<Nav open={this.state.isNavigationOpen} onRequestChange={(open) => this.setNavigationOpen(open)} />

				<div>
					{this.props.errors.map((error, index) =>
						<Snackbar
							open={true}
							message={error}
							key={index}
							onRequestClose={() => {}} />
					)}
				</div>


				<div style={{
					marginTop: "62px"
				}}>
					<VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
						{
							this.hasSearchQuery()
								? <SearchView query={this.state.searchQuery} key="searchView" />
								: <div key="childView">{this.props.children}</div>
						}
					</VelocityTransitionGroup>
				</div>
			</div>
		</RoomRefProvider>
		);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.get("errors"),
		roomId: state.getIn(["session", "roomId"]),
		hasSearchResults: state.getIn(["search", "hasResults"])
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onClearSearchResults: () => dispatch(clearSearchResults())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);


import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import { AppBar, Icon, IconButton, Snackbar } from 'material-ui';
import {
	NavigationMenu,
	NavigationClose
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
			searchQuery: "",
			isSearchBarFocused: false
		}
	}

	componentDidMount() {
		if(this.props.roomId == undefined) {
			history.push("/");
		}
	}

	setIsSearchBarFocused(isSearchBarFocused) {
		this.setState({ isSearchBarFocused });
	}

	setNavigationOpen(isNavigationOpen) {
		this.setState({ isNavigationOpen });
	}

	hasSearchQuery() {
		return this.state.searchQuery.trim().length !== 0;
	}

	setSearchQuery(searchQuery) {
		if(searchQuery.trim().length === 0) {
			searchQuery = "";
		}

		this.setState({searchQuery});
	}

	exitSearch() {
		this.setSearchQuery("");
		this.props.onClearSearchResults();
		this.refs.searchInput.blur();
	}

	get isSearchActive() {
		return this.hasSearchQuery() || this.state.isSearchBarFocused;
	}

	render() {
		if(this.isSearchActive) {
			var button = (
				<IconButton
					onTouchTap={(e) => {
						/* Prevent search field from losing focus until the user
						 * has released their finger, so the menu doesn't pop up
						 */
						e.preventDefault();
						setTimeout(() => this.exitSearch(), 150);
					}}>
					<NavigationClose />
				</IconButton>
			)
		} else {
			var button = (
				<IconButton
					onTouchTap={() => this.setNavigationOpen(true)}>
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
						ref="searchInput"
						onChange={e => this.setSearchQuery(e.target.value)}
						onFocus={() => this.setIsSearchBarFocused(true)}
						onBlur={() => this.setIsSearchBarFocused(false)} />
			</AppBar>
		);

		return (
		<RoomRefProvider>
			<div>
				<AdminListener />

				{ appBar }

				<Nav open={this.state.isNavigationOpen} onRequestChange={(open) => this.setNavigationOpen(open)} />



				<div style={{
					marginTop: "62px"
				}}>
					{ this.isSearchActive
						? <SearchView query={this.state.searchQuery} key="searchView" />
						: this.props.children
					}
				</div>
			</div>
		</RoomRefProvider>
		);
	}
}

function mapStateToProps(state) {
	return {
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

import React from 'react';
import {
	LeftNav,
	MenuItem
} from 'material-ui';

import {
	MusicQueue,
	Search
} from 'material-ui/lib/svg-icons';

import { connect } from 'react-redux';
import { navigateTo } from 'actions/navigation';

class NavItem extends React.Component {
	render() {
		return <MenuItem type="" {...this.props} />
	}
}

class Nav extends React.Component {
	itemTapped(location) {
		this.props.onNavigateTo(location);
		this.props.onItemTapped();
	}
	
	render() {
		return (
			<LeftNav open={this.props.open}>
				<NavItem
					leftIcon={MusicQueue}
					primaryText="Spilleliste"
					onTouchTap={() => this.itemTapped("/app/queue")} />
				<NavItem
					leftIcon={Search}
					primaryText="Søk"
					onTouchTap={() => this.itemTapped("/app/search")} />
			</LeftNav>
		)
	}
}

Nav.defaultProps = {
	open: false,
	onItemTapped: () => {}
}

function mapDispatchToProps(dispatch) {
	return {
		onNavigateTo: (location) => dispatch(navigateTo(location))
	}
}

export default connect(() => ({}), mapDispatchToProps)(Nav);
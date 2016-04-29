import React from 'react';
import {
	LeftNav,
	MenuItem
} from 'material-ui';

import {
	MusicQueue as QueueIcon,
	Search as SearchIcon
} from 'material-ui/lib/svg-icons';

export default class Nav extends React.Component {
	render() {
		return (
			<LeftNav open={this.props.open||1}>
				<MenuItem leftIcon={QueueIcon}>Spilleliste</MenuItem>
				<MenuItem leftIcon={SearchIcon}>Søk</MenuItem>
			</LeftNav>
		)
	}
}
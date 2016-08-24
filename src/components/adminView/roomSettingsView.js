import React, {PropTypes} from 'react';

import {
	Checkbox,
	Dropdown,
	List,
	ListItem,
	Toggle
} from 'material-ui';

class ToggleListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			toggled: !!props.defaultToggled
		}
	}

	handleToggle() {
		this.setState({ toggled: !this.state.toggled });
	}

	render() {
		return <ListItem
			{...this.props}
			type=""
			toggled={this.state.toggled}
			rightToggle={
				<Toggle onToggle={() => this.handleToggle()} />
			} />
	}
}

ToggleListItem.propTypes = {
	onToggle: PropTypes.func,
	defaultToggled: PropTypes.bool
};

export default class RoomSettingsView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<List subheader="Administrator-innstillinger">
				<ToggleListItem primaryText="Hindre at én sang blir spilt flere ganger" />
			</List>
		);
	}
}

RoomSettingsView.propTypes = {
};

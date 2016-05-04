import React from 'react';

import {
	Toggle,
	List,
	ListItem,
	Card
} from 'material-ui';

import { connect } from 'react-redux';

import { setDarkThemeEnabled } from 'actions/settings';

class SettingsView extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<Card className="col-md-12">
						<List>
							<ListItem
								primaryText="Bruk mørkt tema"
								rightToggle={
									<Toggle onToggle={() => this.props.onSetDarkThemeEnabled(!this.props.darkThemeEnabled)} />
								} />
						</List>
					</Card>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		darkThemeEnabled: state.getIn(["settings", "darkThemeEnabled"])
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onSetDarkThemeEnabled: (enabled) => dispatch(setDarkThemeEnabled(enabled))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);

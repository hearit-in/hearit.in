import React from 'react';

import {
	Divider,
	Toggle,
	List,
	ListItem,
	Card,
	CardHeader,
	CardTitle,
	CardText,
	CardActions,
	FlatButton,
	TextField,
	Paper,
	Dialog
} from 'material-ui';

import {
	HardwareSecurity
} from 'material-ui/lib/svg-icons';

import { connect } from 'react-redux';

import { setDarkThemeEnabled } from 'actions/settings';

class SettingsView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showAdminAuthDialog: false
		};
	}

	setShowAdminAuthDialog(show) {
		this.setState({ showAdminAuthDialog: show });
	}

	render() {
		let adminAuthModal = (
			<Dialog
				open={this.state.showAdminAuthDialog}
				onRequestClose={() => this.setShowAdminAuthDialog(false)} />
		);

		return (
			<div>
				{ adminAuthModal }
				<div className="container">
					<div className="col-md-6 col-md-push-3">
						<div className="row">
							<Paper className="col-md-12" style={{ marginTop: "15px"}}>
								<List>
									{/*<ListItem
										primaryText="Bruk mørkt tema"
										rightToggle={
											<Toggle
												toggled={this.props.darkThemeEnabled}
												onToggle={() => this.props.onSetDarkThemeEnabled(!this.props.darkThemeEnabled)} />
										} />
									<Divider />*/}
									<ListItem type="" disabled>
										<div className="row">
											<FlatButton
												label="Logg inn som administrator"
												secondary
												className="col-md-8 col-md-push-2  col-xs-12"
												icon={<HardwareSecurity />}
												onClick={() => this.setShowAdminAuthDialog(true)}>

											</FlatButton>
										</div>
									</ListItem>
								</List>
							</Paper>
						</div>
					</div>

				</div>
			</div>
		)
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

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

import { humanReadableIdentifier } from 'helpers';

import { connect } from 'react-redux';
import { requestAdmin } from 'actions/session';

class SettingsView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showAdminAuthDialog: false,
			adminPassword: ""
		};
	}

	setShowAdminAuthDialog(show) {
		this.setState({ showAdminAuthDialog: show });
	}

	setAdminPassword(adminPassword) {
		this.setState({ adminPassword });
	}

	render() {
		let adminAuthModal = (
			<Dialog
				title="Be om administratortilgang?"
				open={this.state.showAdminAuthDialog}
				onRequestClose={() => this.setShowAdminAuthDialog(false)}
				actions={[
					<FlatButton
						label="Avbryt"
						secondary={true}
						onClick={() => this.setShowAdminAuthDialog(false)} />,
					<FlatButton
						label="OK"
						primary={true}
						onClick={() => {
							this.setShowAdminAuthDialog(false);
							this.props.onRequestAdmin(this.props.adminRequestIdentifier);
						}} />
				]}>

				<p>Nåværende administratorer vil se forespørselen neste gang de åpner appen.</p>
				<p>Bruk koden under for å identifisere deg.</p>

				<strong className="admin-request-code">
					{this.props.adminRequestIdentifier}
				</strong>
			</Dialog>
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
												label="Be om administratortilgang"
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
		adminRequestIdentifier: state.getIn(["session", "adminRequestIdentifier"])
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onRequestAdmin: (message) => dispatch(requestAdmin(message))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);

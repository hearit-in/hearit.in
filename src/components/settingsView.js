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

import { adminLogin } from 'actions';

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
							this.props.onAdminLogin(this.state.adminPassword);
						}} />
				]}>
				<TextField
					floatingLabelText="Administratorpassord"
					value={this.state.adminPassword}
					onChange={event => this.setAdminPassword(event.target.value)}
					fullWidth={true} />
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
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onAdminLogin: (password) => dispatch(adminLogin(password))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);

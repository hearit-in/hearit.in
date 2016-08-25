import React, {PropTypes} from 'react';

import {
	Divider,
	Toggle,
	List,
	ListItem,
	Avatar,
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

import color from 'material-ui/lib/styles/colors';

import { humanReadableIdentifier } from 'helpers';

import { connect } from 'react-redux';
import { requestAdmin } from 'actions/session';

class AdminRequestView extends React.Component {
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
				contentStyle={{
					maxWidth: 600,
					width: "90%"
				}}
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
				<Paper style={{ marginTop: "15px"}}>
					<List>
						{/*<ListItem
							primaryText="Bruk mørkt tema"
							rightToggle={
								<Toggle
									toggled={this.props.darkThemeEnabled}
									onToggle={() => this.props.onSetDarkThemeEnabled(!this.props.darkThemeEnabled)} />
							} />
						<Divider />*/}
						<ListItem
							type=""
							leftAvatar={
								<Avatar
									icon={<HardwareSecurity />}
									backgroundColor={color.purple500}/>
							}
							primaryText="Be om administratortilgang"
							onClick={() => this.setShowAdminAuthDialog(true)} />
					</List>
				</Paper>
			</div>
		)
	}
}

AdminRequestView.contextTypes = {
	muiTheme: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminRequestView);

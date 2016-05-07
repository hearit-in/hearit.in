import React, {PropTypes} from 'react';

import { connect } from 'react-redux';

import {
	Card,
	CardHeader,
	CardText,
	CardActions,
	TextField,
	FlatButton,
	RaisedButton,
	Divider,
	List,
	ListItem,
	Avatar
} from 'material-ui';

import {
	NotificationEventAvailable,
	ActionVerifiedUser
} from 'material-ui/lib/svg-icons';

import color from 'material-ui/lib/styles/colors';

import { navigateTo } from 'actions/navigation';

class CreateRoomView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="row top-margin">
					<div className="col-md-8 col-md-push-2 col-xs-12">
						<RaisedButton
							className="col-md-12"
							label="Tilbake til innlogging"
							secondary
							fullWidth
							onTouchTap={() => this.props.onNavigateTo("/")} />
					</div>
				</div>
				<div className="row top-margin">
					<div className="col-md-8 col-md-push-2 col-xs-12">
						<Card>
							<CardHeader
								title="Opprett nytt rom"
								subtitle="For deg og din fest ellernoe"
								avatar={
									<Avatar
										backgroundColor={color.purple500}
										icon={<NotificationEventAvailable />} />
								} />
							<CardText>
								<TextField fullWidth floatingLabelText="Offentlig kode" />
								<p>
									Dette er navnet på rommet ditt.
								</p>
								<p>
									Del dette med andre for å gi de tilgang til å legge sanger i spillelisten.
								</p>
								<TextField fullWidth floatingLabelText="Administratorkode" />
								<p>
									Dette er den private koden du kan bruke for å ta kontroll over rommet.
								</p>
							</CardText>
							<CardActions>
								<FlatButton primary label="Opprett" />
							</CardActions>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}

CreateRoomView.propTypes = {
};

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		onNavigateTo: (location) => dispatch(navigateTo(location))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomView);

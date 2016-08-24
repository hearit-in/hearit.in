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
	ActionVerifiedUser,
	CommunicationVpnKey
} from 'material-ui/lib/svg-icons';

import color from 'material-ui/lib/styles/colors';

import { navigateTo } from 'actions/navigation';
import createRoom from 'actions/createRoom';

class CreateRoomView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			roomId: ""
		}
	}

	roomIdChanged(roomId) {
		this.setState({ roomId });
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
							{/* <CardHeader
								title="Finn på en kode til spillelisten"
								subtitle="Alle som har koden kan legge til og stemme på sanger i spillelisten."
								avatar={
									<Avatar
										backgroundColor={color.purple500}
										icon={<CommunicationVpnKey />} />
								} /> */}
							<CardHeader title="Lag en kode til spillelisten" subtitle="Del den med andre så de kan legge til og stemme på sanger i spillelisten." />
								
							<CardText style={{paddingTop: 0, paddingBottom: 0}}>
								<br />
								<TextField
									fullWidth
									hintText="Velg en kode..."
									autoCorrect="off"
									autoCapitalize="off"
									style={{ marginBottom: 20 }}
									value={this.state.roomId}
									onChange={event => this.roomIdChanged(event.target.value)} />
							</CardText>
							<CardActions style={{ textAlign: "right" }}>
								<FlatButton
									primary
									label="Lag spilleliste"
									fullWidth={true}
									onTouchTap={() => this.props.onCreateRoom(this.state.roomId)} />
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
		onNavigateTo: (location) => dispatch(navigateTo(location)),
		onCreateRoom: (roomId) => dispatch(createRoom(roomId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomView);

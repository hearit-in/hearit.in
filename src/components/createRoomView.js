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
							<CardHeader
								title="Opprett nytt rom"
								subtitle="For deg og din fest ellernoe"
								avatar={
									<Avatar
										backgroundColor={color.purple500}
										icon={<NotificationEventAvailable />} />
								} />
							<CardText style={{paddingTop: 0}}>
								<TextField
									fullWidth
									floatingLabelText="Kode"
									autoCorrect="off"
									autoCapitalize="off"
									style={{ marginBottom: 20 }}
									value={this.state.roomId}
									onChange={event => this.roomIdChanged(event.target.value)} />
									Dette er koden til rommet ditt.
									Alle som har koden kan legge til og stemme på sanger i spillelisten.
							</CardText>
							<CardActions>
								<FlatButton
									primary
									label="Opprett rom"
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

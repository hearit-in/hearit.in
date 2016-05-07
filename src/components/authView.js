import React from 'react';

import {
	TextField,
	FlatButton,
	Card,
	CardText,
	CardActions,
	Divider
} from 'material-ui';

import {
	NotificationEventAvailable,
	ActionVerifiedUser
} from 'material-ui/lib/svg-icons';

import Overlay from './overlay';

import { connect } from 'react-redux';
import { login } from '../actions';
import history from 'helpers/history';

import { navigateTo } from 'actions';

class AuthView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roomId: ""
		};
	}

	componentDidMount() {
	}

	onRoomIdChanged(roomId) {
		this.setState({ roomId });
	}

	userHasEnteredRoomId() {
		return this.state.roomId.trim().length != 0;
	}

	render() {
		return (
		<div className="container">
			<div className="row top-margin">
				<div className="col-md-6 col-md-offset-3 col-xs-12">
					<Card disabled={true}>
						<CardText>
							<TextField
								floatingLabelText="Kode"
								fullWidth={true}
								onChange={event => this.onRoomIdChanged(event.target.value)} />
						</CardText>

						<CardActions>
							<FlatButton
								label="LOGG INN"
								icon={<ActionVerifiedUser />}
								disabled={!this.userHasEnteredRoomId()}
								primary
								fullWidth
								onClick={() => this.props.onLogin(this.state.roomId)} />
						</CardActions>
					</Card>
				</div>
			</div>
			<div className="row top-margin">
				<div className="col-md-6 col-md-offset-3 col-xs-12">
					<Card disabled={true}>
						<CardActions>
							<FlatButton
								label="OPPRETT NYTT ROM"
								icon={<NotificationEventAvailable />}
								secondary
								fullWidth={true}
								onClick={() => history.push("/createRoom")} />
						</CardActions>
					</Card>
				</div>
			</div>

			<span className="credits top-margin" style={{ textAlign: "center" }}>
				Copyright © 2016 Sebastian Reinhard
			</span>
		</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoading: state.getIn(["session", "isLoading"]),
		roomId: state.getIn(["session", "roomId"])
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onLogin: (roomId) => dispatch(login(roomId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);

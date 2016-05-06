import React from 'react';

import {
	TextField,
	FlatButton,
	Card,
	CardText,
	CardActions,
	Divider
} from 'material-ui';
import ThumbUp from 'material-ui/lib/svg-icons/action/thumb-up';
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
				<div className="col-md-4 col-md-offset-4 col-xs-12">
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
								disabled={!this.userHasEnteredRoomId()}
								primary
								fullWidth
								onClick={() => this.props.onLogin(this.state.roomId)} />
						</CardActions>
					</Card>
				</div>
			</div>
			<div className="row top-margin">
				<div className="col-md-4 col-md-offset-4 col-xs-12">
					<Card disabled={true}>
						<CardActions>
							<FlatButton
								label="LAG NYTT ROM"
								secondary
								fullWidth={true}
								onClick={() => history.push("/createRoom")} />
						</CardActions>

					</Card>
				</div>
			</div>

			<span className="row">
				<span className="col-md-12 credits centered">
					Copyright © 2016 Sebastian Reinhard <br />
					I samarbeid med Nesodden Videregående Skole
				</span>
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

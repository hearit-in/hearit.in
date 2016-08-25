import React, { PropTypes } from 'react';

import {
	TextField,
	FlatButton,
	RaisedButton,
	Card,
	CardText,
	CardMedia,
	CardActions,
	Divider,
	Badge
} from 'material-ui';

import {
	NotificationEventAvailable,
	ActionVerifiedUser,
	FileFileDownload
} from 'material-ui/lib/svg-icons';

import Color from 'material-ui/lib/styles/colors';

import Overlay from './overlay';

import { connect } from 'react-redux';
import { loginAndRedirect } from '../actions';
import history from 'helpers/history';

import { navigateTo } from 'actions';

import headerImage from "../images/header1.jpg";

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
		<div className="hero-image">
			<span className="hero-title">hearit</span>
			<div className="container">
				<div className="row">
					<div className="col-md-6 col-md-offset-3 col-xs-12">
						<Card disabled={true}>
							<CardMedia>
							</CardMedia>
							<CardText>
								<TextField
									floatingLabelText="Kode"
									fullWidth={true}
									tabIndex={0}
									autoCorrect="off"
									autoCapitalize="off"
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
									label="LAG NY SPILLELISTE"
									icon={<NotificationEventAvailable />}
									secondary
									fullWidth={true}
									onClick={() => history.push("/createRoom")} />
							</CardActions>
						</Card>
					</div>
				</div>

					<div className="top-margin hide-mobile">
						<div style={{
							textAlign: "center",
							marginTop: "90px"
						}}>
							<div style={{
								display: "inline-block",
								position: "relative"
							}}>
								<span style={{
									backgroundColor: Color.purple700,
									borderRadius: 22,
									padding: "2px 12px",
									color: "white",
									fontWeight: 400,
									fontSize: "0.8em",
									position: "absolute",
									display: "inline-block",
									top: -10,
									right: -25,
									zIndex: 9000,
									boxShadow: `
										0px 1px 1px rgba(0,0,0, 0.3),
										0px 2px 5px rgba(0,0,0, 0.15)
									`
								}}>
									BETA
								</span>
								<FlatButton
									label="HEARIT PLAYER"
									labelStyle={{
										margin: "0px 30px"
									}}
									icon={ <FileFileDownload style={{ color: "#FFF" }} /> }
									primary
									hoverColor={Color.blue50}
									backgroundColor="#fff"
									fullWidth={true}
									onClick={() => {}} />
							</div>
						</div>
					</div>
			</div>

			<span className="credits top-margin" style={{ textAlign: "center" }}>
				Copyright © 2016 Sebastian Reinhard
			</span>
		</div>
		);
	}
}

AuthView.contextTypes = {
	router: PropTypes.object
}

function mapStateToProps(state) {
	return {
		isLoading: state.getIn(["session", "isLoading"]),
		roomId: state.getIn(["session", "roomId"])
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onLogin: (roomId, router) => dispatch(loginAndRedirect(roomId, router))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);

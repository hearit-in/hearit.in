import React from 'react';

import {
	TextField,
	FlatButton,
	Card,
	CardText,
	CardActions
} from 'material-ui';
import ThumbUp from 'material-ui/lib/svg-icons/action/thumb-up';
import Overlay from './overlay';

import { connect } from 'react-redux';
import { login } from '../actions';

class AuthView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roomId: ""
		};
	}

	componentDidMount() {
		//this.props.onLogin("dank")
	}

	onRoomIdChanged(roomId) {
		this.setState({ roomId });
	}

	render() {
		return (
		<div className="container">
			<div className="row top-margin">
				<Card className="col-md-4 col-md-offset-4 col-xs-12" disabled={true}>
					<CardText>
						<TextField
							floatingLabelText="Kode"
							fullWidth={true}
							onChange={event => this.onRoomIdChanged(event.target.value)} />
					</CardText>

					<CardActions>
						<FlatButton
							label="LOGG INN"
							disabled={this.state.roomId.trim().length == 0}
							primary={true}
							className="col-md-12 col-xs-12 row"
							style={{marginBottom: "20px"}}
							onClick={() => this.props.onLogin(this.state.roomId)} />
					</CardActions>
				</Card>
			</div>
		</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoading: state.getIn("session.isLoading")
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onLogin: (roomId) => dispatch(login(roomId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);

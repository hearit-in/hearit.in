import React from 'react';

import {
	TextField,
	FlatButton,
	Card,
	CardTitle,
	CardText,
	CardActions
} from 'material-ui';
import ThumbUp from 'material-ui/lib/svg-icons/action/thumb-up';

import { connect } from 'react-redux';
import { tryEnterSession } from '../actions';

class AuthView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authCode: ""
		};
	}
	
	onAuthCodeChanged(event) {
		this.setState({ authCode: event.target.value });
	}
	
	render() {
		return (<div className="container">
		<div className="row">
			<Card className="col-md-4 col-md-offset-4 col-xs-12">
				{/*<CardTitle title="Fyre litt musikk da eller?" />*/}
				
				<CardText>
					<TextField floatingLabelText="Kode" fullWidth={true} onChange={this.onAuthCodeChanged.bind(this)} />
				</CardText>
				
				<CardActions>
					<FlatButton label="LOGG INN" primary={true} className="col-md-12 col-xs-12 row" style={{marginBottom: "20px"}} />
				</CardActions>
			</Card>
		</div>
		</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		onEnterSession: (roomId) => dispatch(tryEnterSession())
	};
}

export default connect(undefined, mapDispatchToProps)(AuthView);
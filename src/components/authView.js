import React from 'react';

import {
	TextField,
	RaisedButton,
	Card,
	CardTitle,
	CardText,
	CardActions
} from 'material-ui';

import ThumbUp from 'material-ui/lib/svg-icons/action/thumb-up';

import {Grid, Cell} from 'rgx';

export default class AuthView extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (<div className="container">
			<Card className="col md-3">
				<CardTitle title="Fyre litt musikk da eller?" />
				
				<CardText>
					<TextField hintText="ABC123" fullWidth={true} />
				</CardText>
				
				<CardActions>
					<RaisedButton icon={<ThumbUp />} primary={true} fullWidth={true}  />
				</CardActions>
				
			</Card>
		</div>
		);
	}
}
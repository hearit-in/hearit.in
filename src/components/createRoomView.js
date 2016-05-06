import React, {PropTypes} from 'react';

import { connect } from 'react-redux';

import {
	Card,
	CardHeader,
	CardText,
	CardActions,
	TextField,
	RaisedButton,
	Divider,
	List,
	ListItem
} from 'material-ui';

class CreateRoomView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="row top-margin">
					<div className="col-md-8 col-md-push-2 col-xs-12">
						<Card>
							<CardHeader title="Lag nytt rom" subtitle="For fucks sake" />

							<List>
								<ListItem type="" primaryText="Administratorkode" />
							</List>
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

export default connect(mapStateToProps)(CreateRoomView);

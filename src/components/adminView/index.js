import React, {PropTypes} from 'react';
import { Container, Row, Col } from 'components/layout';
import {
	Card,
	List,
	ListItem
} from 'material-ui';

import AdminRequestsList from './adminRequestList';
import RoomSettingsView from './roomSettingsView';

export default class AdminView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="row top-margin">
					<Col md={6} mdPush={3} xs={12}>
						<RoomSettingsView />
					</Col>
				</div>
				<div className="row top-margin">
					<Col md={6} mdPush={3} xs={12}>
						<AdminRequestsList />
					</Col>
				</div>
			</div>
		);
	}
}

AdminView.propTypes = {
};

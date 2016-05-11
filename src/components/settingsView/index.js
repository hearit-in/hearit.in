import React, {PropTypes} from 'react';

import { Container, Row, Col } from 'components/layout';

import AdminRequestView from './adminRequestView';

export default class SettingsView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md={6} mdPush={3} xs={12}>
						<Row>
							<AdminRequestView />
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}

SettingsView.contextTypes = {
	roomRef: PropTypes.object
};

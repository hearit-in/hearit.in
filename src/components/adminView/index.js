import React, {PropTypes} from 'react';
import { Container, Row, Col } from 'components/layout';
import {
	Card,
	List,
	ListItem
} from 'material-ui';

import AdminRequestsList from './adminRequestList';

export default class AdminView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<Row className="top-margin">
					<Col md={12} xs={12}>
						<AdminRequestsList />
					</Col>
				</Row>
			</Container>
		);
	}
}

AdminView.propTypes = {
};

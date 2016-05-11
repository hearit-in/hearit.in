import React, {PropTypes} from 'react';
import { Container, Row, Col } from './layout';
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
				<Row style={{marginTop: 40}}>
					<AdminRequestsList />
				</Row>
			</Container>
		);
	}
}

AdminView.propTypes = {
};

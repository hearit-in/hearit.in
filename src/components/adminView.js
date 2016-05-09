import React, {PropTypes} from 'react';
import { Container, Row, Col } from './layout';
import {
	Card
} from 'material-ui';

export default class AdminView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md={10} mdPush={2}>
						<Card>
							<h1>Admin</h1>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

AdminView.propTypes = {
};

import React, { PropTypes } from 'react'
import history from 'helpers';

import { Container, Row, Col } from './layout';

const bernieGif = require("../images/bernie-404.gif");

export default class FourOhFour extends React.Component {
	render() {
		return (
			<Container>
				<Row>
					<Col md={2}>
						<img src={bernieGif} />
					</Col>
				</Row>
			</Container>
		)
	}
}

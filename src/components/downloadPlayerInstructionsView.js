import React, {PropTypes} from 'react';
import {
	Card,
	CardText,
	CardMedia
} from 'material-ui';

export default class DownloadPlayerInstructionsView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="row top-margin">
					<div className="col-md-8 col-md-push-2 col-xs-12">
						<Card>
							<CardText>
								Åpne <code>hearit.in</code> på en PC for å laste ned programmet.
							</CardText>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}

DownloadPlayerInstructionsView.propTypes = {
};

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
							<CardMedia>
								<img src="https://static.pexels.com/photos/37862/musician-rockstar-band-music-37862-large.jpeg" />
							</CardMedia>
							<CardText>
								Gå til addressen under på en PC for å laste ned programmet som faktisk spiller musikk.
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

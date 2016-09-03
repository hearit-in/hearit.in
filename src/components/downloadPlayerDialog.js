import React, {PropTypes} from 'react';

import { Dialog } from 'material-ui';

export default class DownloadPlayerDialog extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Dialog
				title="Last ned Hearit Player"
				open={false}
				{...this.props}>
				
			</Dialog>
		)
	}
}

DownloadPlayerDialog.propTypes = {
};

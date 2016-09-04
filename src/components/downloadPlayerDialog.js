import React, {PropTypes} from 'react';

import { Dialog } from 'material-ui';

import DownloadOsxIcon from '../images/download-osx.png';
import DownloadWindowsIcon from '../images/download-windows.png';

export default class DownloadPlayerDialog extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const downloadButtonStyle = {
			display: "block",
			textAlign: "center",
			fontSize: "1.2em",
			color: "rgb(156, 39, 176)"
		};
		
		return (
			<Dialog
				title="Last ned Hearit Player"
				{...this.props}>
				
				
				<div style={{
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					margin: "30px 0px"
				}}>
					<a  href="https://firebasestorage.googleapis.com/v0/b/project-4579928374316837340.appspot.com/o/Player%2FHearit%20Player-osx-x64.zip?alt=media&token=37130ae6-a7a6-4113-b8d2-252d53f56f0c"
						style={downloadButtonStyle}
						onClick={() => this.props.onRequestClose()}>
						<img src={DownloadOsxIcon} />
						<p>Mac OS X</p>
					</a>
					<a  href="https://firebasestorage.googleapis.com/v0/b/project-4579928374316837340.appspot.com/o/Player%2FHearit%20Player-win32-x64.zip?alt=media&token=e1a6e76a-536c-4c65-85eb-1c3c40ad4f14"
						style={downloadButtonStyle}
						onClick={() => this.props.onRequestClose()}>
						<img src={DownloadWindowsIcon} />
						<p>Windows</p>
					</a>
				</div>
			</Dialog>
		)
	}
}

DownloadPlayerDialog.propTypes = {
};

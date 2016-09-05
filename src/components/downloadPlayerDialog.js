import React, {PropTypes} from 'react';

import { Dialog } from 'material-ui';

import DownloadOsxIcon from '../images/download-osx.png';
import DownloadWindowsIcon from '../images/download-windows.png';
import { createFirebase } from 'helpers/firebase';

const DownloadButton = (props) => (
	<a  href={props.href}
		style={{
			display: "block",
			textAlign: "center",
			fontSize: "1.2em",
			color: "rgb(156, 39, 176)"
		}}
		onClick={() => props.onRequestClose()}>
		<img src={props.iconUrl} />
		<p>
			{ props.children }
		</p>
	</a>
);

export default class DownloadPlayerDialog extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			urls: {
				osx: "#",
				windows: "#"
			}
		}
	}
	
	componentDidMount() {
		createFirebase("downloadPlayerUrls")
			.once("value")
			.then(snap => snap.val())
			.then(urls => this.setState({ urls }));
	}
	
	render() {
		
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
				
					<DownloadButton
						href={this.state.urls.osx}
						iconUrl={DownloadOsxIcon}
						onRequestClose={() => this.props.onRequestClose()}>
						Mac OS X
					</DownloadButton>
					
					<DownloadButton
						href={this.state.urls.windows}
						iconUrl={DownloadWindowsIcon}
						onRequestClose={() => this.props.onRequestClose()}>
						Windows
					</DownloadButton>
				</div>
			</Dialog>
		)
	}
}

DownloadPlayerDialog.propTypes = {
};

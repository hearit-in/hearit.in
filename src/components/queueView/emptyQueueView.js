import React from 'react';

import { Paper } from 'material-ui';
import { AvPlaylistAdd } from 'material-ui/lib/svg-icons';

export default class EmptyQueueView extends React.Component {
	render() {
		return (
			<Paper style={{
				padding: "20px 0"
			}}>
				<div
					className="centered"
					style={{
						color: "#ddd",
						marginBottom: 20
					}}>
					<AvPlaylistAdd
						color="#ddd"
						style={{
							marginLeft: "auto",
							marginRight: "auto",
							width: 200,
							height: 200
						}} />
					<h1 style={{
						fontWeight: "300"
					}}>
						Blæst opp noe da
					</h1>
					<span>Legg til sanger ved å søke i feltet over. </span>
				</div>
			</Paper>
		);
	}
}
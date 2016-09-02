import React from 'react';

import {
	ListItem,
	Avatar
} from 'material-ui';

export default class TrackListItem extends React.Component {
	componentDidMount() {

	}

	render() {
		let images = this.props.track.get("images");

		return (
			<ListItem
				{...this.props}
				primaryText={this.props.track.get("name")}
				secondaryText={this.props.track.get("artist")}
				type=""
				onTouchTap={() => {}}
				leftAvatar={<Avatar src={
					this.props.track.getIn(["images", "medium"])
				} />} />
		)
	}
}

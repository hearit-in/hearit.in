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
		let image = images.get(1) || images.get(0);

		return (
			<ListItem
				{...this.props}
				primaryText={this.props.track.get("name")}
				secondaryText={this.props.track.get("artistString")}
				key={this.props.track.get("id")}
				type=""
				onTouchTap={() => {}}
				leftAvatar={<Avatar src={image.get("url")} />} />
		)
	}
}

import React, {PropTypes} from 'react';

import {
	ListItem,
	Avatar
} from 'material-ui';

export default class PlaylistListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSelectTrack(track) {

	}

	render() {
		const playlist = this.props.playlist;
		let images = playlist.get("images");
		let image = images.get(1) || images.get(0);
		return (
			<ListItem
				primaryText={playlist.get("name")}
				secondaryText={playlist.getIn(["owner", "display_name"])}
				leftAvatar={<Avatar src={image.url}}  />
		);
	}
}

PlaylistListItem.propTypes = {
	playlist: PropTypes.object,
	onSelectTrack: PropTypes.func
};

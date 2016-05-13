import React, {PropTypes} from 'react';

import {
	IconMenu,
	MenuItem,
	IconButton
} from 'material-ui';

import {
	NavigationMoreVert,
	
} from 'material-ui/lib/svg-icons';

import LikeCheckbox from './likeCheckbox';

export default class TrackAdminMenuButton extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<IconMenu
				iconButtonElement={
					<IconButton>
						<NavigationMoreVert />
					</IconButton>
				}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}>
				<MenuItem
					type=""
					leftIcon={<LikeCheckbox />}
					primaryText="Stem på" />
			</IconMenu>
		)
	}
}

TrackAdminMenuButton.propTypes = {
};

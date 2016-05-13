import React, {PropTypes} from 'react';

import {
	Dialog,
	List,
	ListItem,
	Divider
} from 'material-ui';

import {
	ActionFavorite,
	NavigationMoreVert,
	EditorVerticalAlignTop,
	AvPlayArrow
} from 'material-ui/lib/svg-icons';

import LikeCheckbox from './likeCheckbox';
import TrackListItem from '../trackListItem';

import { connect } from 'react-redux';

import { toggleVote } from 'actions';

class TrackAdminMenu extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Dialog open={this.props.open} modal={false} onRequestClose={() => this.props.onRequestClose()}>
				<List>
					<TrackListItem track={this.props.track} disabled />
					<ListItem
						type=""
						className="top-margin"
						leftIcon={<ActionFavorite />}
						primaryText="Stem på" />
					<ListItem
						type=""
						leftIcon={<EditorVerticalAlignTop />}
						primaryText="Spill neste" />
					<ListItem
						type=""
						leftIcon={<AvPlayArrow />}
						primaryText="Spill nå" />
				</List>
			</Dialog>
		)
	}
}

TrackAdminMenu.propTypes = {
	open: PropTypes.bool,
	track: PropTypes.object,
	onRequestClose: PropTypes.func
};

function mapDispatchToProps(dispatch) {
	return {
		toggleVote
	}
}

export default connect(undefined, mapDispatchToProps)(TrackAdminMenu);
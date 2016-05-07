import React, {PropTypes} from 'react';

import { connect } from 'react-redux';
import { firebaseForRoomId } from 'helpers/firebase';

class RoomRefProvider extends React.Component {
	constructor(props) {
		super(props);
	}

	getChildContext() {
		return {
			roomRef: this.props.roomRef
		}
	}

	render() {
		return this.props.children;
	}
}

RoomRefProvider.childContextTypes = {
	roomRef: PropTypes.object
};

RoomRefProvider.propTypes = {
	roomRef: PropTypes.object
};

function mapStateToProps(state) {
	let roomId = state.getIn(["session", "roomId"]);
	let roomRef = firebaseForRoomId(roomId);

	return { roomRef }
}

export default connect(mapStateToProps)(RoomRefProvider);

import React, {PropTypes} from 'react';

import { connect } from 'react-redux';
import { setIsAdmin, getUid } from 'actions';

/**
 * Listens on {room}.admins.{uid}, dispatching SET_IS_ADMIN based on wether the current user is admin.
 */
class AdminListener extends React.Component {
	componentDidMount() {
		this.handleUidChanged(this.props.uid);
	}
	
	componentWillReceiveProps(newProps) {
		if(newProps.uid !== this.props.uid) {
			this.handleUidChanged(newProps.uid);
		}
	}
	
	componentWillUnmount() {
		if(this.ref !== undefined) {
			this.ref.off();
		}
	}
	
	handleUidChanged(uid) {
		if(this.ref !== undefined) {
			this.ref.off();
		}
		
		if(uid === undefined) {
			this.ref = undefined;
			return;
		}
		
		this.ref = this.context.roomRef
			.child("admins")
			.child(uid);
		
		this.ref.on("value", (snapshot) => {
			let isAdmin = !!snapshot.val();
			this.props.onSetIsAdmin(isAdmin);
		});
	}
	
	render() { return this.props.children || <div />; }
}

AdminListener.contextTypes = {
	roomRef: PropTypes.object
};

const mapStateToProps = (state) => {
	let uid = state.getIn(["session", "authData", "uid"]);
	return { uid };
};

const mapDispatchToProps = (dispatch) => ({
	onSetIsAdmin: (isAdmin) => dispatch(setIsAdmin(isAdmin))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminListener);
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { loginAndRedirect } from 'actions/session';

class RedirectToRoomView extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if(this.props.params.roomId) {
			this.props.onLoginAndRedirect(this.props.params.roomId);
		}
	}

	render() {
		return (<div />);
	}
}

RedirectToRoomView.propTypes = {
};

function mapDispatchToProps(dispatch) {
	return {
		onLoginAndRedirect: (roomId) => dispatch(loginAndRedirect(roomId))
	}
}

export default connect(undefined, mapDispatchToProps)(RedirectToRoomView);

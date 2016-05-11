import React, {PropTypes} from 'react';

import {
	List,
	ListItem,
	Divider,
	IconButton
} from 'material-ui';

import {
	NavigationCheck,
	NavigationClose
} from 'material-ui/lib/svg-icons';

import color from 'material-ui/lib/styles/colors';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { grantAdmin, removeAdminRequest } from 'actions';

class AdminRequestListItem extends React.Component {
	render() {
		return <ListItem
			{...this.props}
			type=""
			disabled
			primaryText={this.props.message}
			secondaryText={this.props.uid} />
	}
}

AdminRequestListItem.propTypes = {
	message: PropTypes.string,
	uid: PropTypes.string
}

class AdminRequestsList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			requests: {}
		}
	}

	componentDidMount() {
		this.ref = this.context.roomRef.child("adminRequests");

		this.ref.on("value", (snapshot) => {
			this.setState({ requests: snapshot.val() || {} });
		});
	}

	componentWillUnmount() {
		this.ref.off();
	}

	render() {
		const acceptButtonStyle = {
			color: color.green400
		};

		const declineButtonStyle = {
			color: color.red400
		}

		return (
			<List subheader="Administratorforespørsler">
				<Divider />
				{map(this.state.requests, (message, uid) =>
					<AdminRequestListItem
						uid={uid}
						key={uid}
						message={message}
						rightIconButton={<span>
							<IconButton onTouchTap={() => this.props.onGrantAdmin(uid)}>
								<NavigationCheck color={color.green400} />
							</IconButton>

							<IconButton onTouchTap={() => this.props.onRemoveAdminRequest(uid)}>
								<NavigationClose color={color.red400} />
							</IconButton>
						</span>} />
				)}

			</List>
		);
	}
}

AdminRequestsList.contextTypes = {
	roomRef: PropTypes.object
};

function mapDispatchToProps(dispatch) {
	return {
		onGrantAdmin: (uid) => dispatch(grantAdmin(uid)),
		onRemoveAdminRequest: (uid) => dispatch(removeAdminRequest(uid))
	}
}

export default connect(undefined, mapDispatchToProps)(AdminRequestsList)

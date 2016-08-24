import React, {PropTypes} from 'react';

import { connect } from 'react-redux';
import { setRouter } from 'actions/router';

class RouterStoreInjector extends React.Component {
	componentDidMount() {
		this.props.onSetRouter(this.context.router);
	}

	render() {
		return this.props.children;
	}
}

RouterStoreInjector.contextTypes = {
	router: PropTypes.object
};

function mapDispatchToProps(dispatch) {
	return {
		onSetRouter: (router) => dispatch(setRouter(router))
	}
}

export default connect(undefined, mapDispatchToProps)(RouterStoreInjector);

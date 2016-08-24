import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { initFirebase } from 'actions/firebase';
import RouterStoreInjector from './routerStoreInjector';

import { Snackbar } from 'material-ui';

export default class RootView extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onInitFirebase();
	}

	render() {
		return (
			<div>
				<div>
					{this.props.errors.map((error, index) =>
						<Snackbar
							open={true}
							message={error}
							key={index}
							onRequestClose={() => {}} />
					)}
				</div>

				<RouterStoreInjector>
					{this.props.children}
				</RouterStoreInjector>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.get("errors")
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onInitFirebase: () => dispatch(initFirebase())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RootView);

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { initFirebase } from 'actions/firebase';
import RouterStoreInjector from './routerStoreInjector';

export default class RootView extends React.Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		this.props.onInitFirebase();
	}
	
	render() {
		return (
			<RouterStoreInjector>
				{this.props.children}
			</RouterStoreInjector>
		);
	}
}

function mapStateToProps(state) {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		onInitFirebase: () => dispatch(initFirebase())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RootView);
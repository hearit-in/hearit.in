require('normalize.css/normalize.css');
require('styles/style.stylus');

import React from 'react';
import AuthView from './authView';
import { AppBar, Icon, Snackbar } from 'material-ui';

import { connect } from 'react-redux';

class AppComponent extends React.Component {
	componentDidMount() {
		
	}
	
	render() {
		return (<div>
			<AppBar title="crowdplay" />
			<div>
				{this.props.errors.map((error, index) => {
					return <Snackbar open={true} message={error} key={index} onRequestClose={() => {}} />
				})}
			</div>
			{ this.props.children }
		</div>);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.errors
	}
}

export default connect(mapStateToProps)(AppComponent);

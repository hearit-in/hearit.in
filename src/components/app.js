require('normalize.css/normalize.css');
require('styles/style.stylus');

import React from 'react';
import AuthView from './authView';
import { AppBar, Icon, Snackbar } from 'material-ui';
import {
	ActionSearch
} from 'material-ui/lib/svg-icons';

import Nav from './nav';

import { VelocityTransitionGroup } from 'velocity-react';

import { connect } from 'react-redux';

import { history } from 'helpers';

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isNavigationOpen: false
		}
	}

	componentDidMount() {
		if(this.props.roomId == undefined) {
			history.push("/");
		}
	}

	setNavigationOpen(open) {
		this.setState({ isNavigationOpen: open });
	}

	render() {
		console.log(this.props);
		return (

		<div>
			<AppBar
				title="crowdplay"
				onLeftIconButtonTouchTap={ () => this.setNavigationOpen(true) }
				rightIcon={<ActionSearch />}
				style={{
					position: "fixed",
					top: 0
				}}>
			</AppBar>

			<Nav open={this.state.isNavigationOpen} onRequestChange={(open) => this.setNavigationOpen(open)} />

			<div>
				{this.props.errors.map((error, index) => {
					return <Snackbar open={true} message={error} key={index} onRequestClose={() => {}} />
				})}
			</div>

			<div style={{
				marginTop: "60px"
			}}>
				<VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
					{ this.props.children }
				</VelocityTransitionGroup>
			</div>
		</div>);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.get("errors"),
		roomId: state.get("session").get("roomId")
	}
}

export default connect(mapStateToProps)(AppComponent);

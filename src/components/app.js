require('normalize.css/normalize.css');
require('styles/style.stylus');

import React from 'react';
import { connect } from 'react-redux';

import { AppBar, Icon, Snackbar } from 'material-ui';
import {
	ActionSearch
} from 'material-ui/lib/svg-icons';
import { VelocityTransitionGroup } from 'velocity-react';

import Nav from './nav';
import AuthView from './authView';
import { history } from 'helpers';
import  RoomRefProvider from './roomRefProvider';

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
		return (
		<RoomRefProvider>
			<div>
				<AppBar
					onLeftIconButtonTouchTap={ () => this.setNavigationOpen(true) }
					rightIcon={<ActionSearch />}
					style={{
						position: "fixed",
						top: 0
					}}>
						<input className="search-bar" placeholder="Søk for å legge til sanger" />
				</AppBar>

				<Nav open={this.state.isNavigationOpen} onRequestChange={(open) => this.setNavigationOpen(open)} />

				<div>
					{this.props.errors.map((error, index) =>
						<Snackbar
							open={true}
							message={error}
							key={index}
							onRequestClose={() => {}} />
					)}
				</div>

				<div style={{
					marginTop: "62px"
				}}>
					<VelocityTransitionGroup enter={{animation: "slideDown"}} leave={{animation: "slideUp"}}>
						{ this.props.children }
					</VelocityTransitionGroup>
				</div>
			</div>
		</RoomRefProvider>
		);
	}
}

function mapStateToProps(state) {
	return {
		errors: state.get("errors"),
		roomId: state.get("session").get("roomId")
	}
}

export default connect(mapStateToProps)(AppComponent);

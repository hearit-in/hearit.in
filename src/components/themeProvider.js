import React, {PropTypes} from 'react';

import ThemeManager from 'material-ui/lib/styles/theme-manager';

import darkTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import lightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

import { connect } from 'react-redux';

class ThemeProvider extends React.Component {
	getChildContext() {
		const rawTheme = this.props.darkTheme ? darkTheme : lightTheme;
		return {
			muiTheme: ThemeManager.getMuiTheme(rawTheme)
		}
	}
	
	render() {
		return this.props.children;
	}
}

ThemeProvider.childContextTypes = {
	muiTheme: PropTypes.object
}

function mapStateToProps(state) {
	return {
		darkTheme: state.getIn(["settings", "darkTheme"], false)
	}
}

export default connect(mapStateToProps)(ThemeProvider);
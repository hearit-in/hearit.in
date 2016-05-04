import React, {PropTypes} from 'react';

import ThemeManager from 'material-ui/lib/styles/theme-manager';

import darkBaseTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import lightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

import colors from 'material-ui/lib/styles/colors';

import { merge } from 'lodash';

/*{
	spacing: _spacing2.default,
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: colors.default.cyan700,
		primary2Color: colors.default.cyan700,
		primary3Color: colors.default.grey600,
		accent1Color: colors.default.pinkA200,
		accent2Color: colors.default.pinkA400,
		accent3Color: colors.default.pinkA100,
		textColor: colors.default.fullWhite,
		alternateTextColor: '#303030',
		canvasColor: '#303030',
		borderColor: _colorManipulator2.default.fade(_colors2.default.fullWhite, 0.3),
		disabledColor: _colorManipulator2.default.fade(_colors2.default.fullWhite, 0.3),
		pickerHeaderColor: _colorManipulator2.default.fade(_colors2.default.fullWhite, 0.12),
		clockCircleColor: _colorManipulator2.default.fade(_colors2.default.fullWhite, 0.12)
	}
};*/

const darkTheme = merge({}, darkBaseTheme, {
	palette: {
		alternateTextColor: "#aaa"
	}
});

import { connect } from 'react-redux';

class ThemeProvider extends React.Component {
	getChildContext() {
		const rawTheme = this.props.darkThemeEnabled ? darkTheme : lightTheme;
		const muiTheme = ThemeManager.getMuiTheme(rawTheme);
		return { muiTheme };
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
		darkThemeEnabled: state.getIn(["settings", "darkThemeEnabled"], false)
	}
}

export default connect(mapStateToProps)(ThemeProvider);

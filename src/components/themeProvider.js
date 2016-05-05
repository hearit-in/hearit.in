import React, {PropTypes} from 'react';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import lightTheme from 'material-ui/lib/styles/baseThemes/lightBaseTheme';
import color from 'material-ui/lib/styles/colors';
import colorManipulator from 'material-ui/lib/utils/color-manipulator';

import { merge } from 'lodash';

/* {
	spacing: spacing,
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: cyan500,
		primary2Color: cyan700,
		primary3Color: grey400,
		accent1Color: pinkA200,
		accent2Color: grey100,
		accent3Color: grey500,
		textColor: darkBlack,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: grey300,
		disabledColor: fade(darkBlack, 0.3),
		pickerHeaderColor: cyan500,
		clockCircleColor: fade(darkBlack, 0.07),
		shadowColor: fullBlack,
	}
} */

const rawTheme = merge({}, lightTheme, {
	palette: {
		primary1Color: color.purple500,
		primary2Color: color.blue500,
		primary3Color: color.white,
		accent1Color: color.blue500,
		accent2Color: color.blue500,
		accent3Color: color.blue500
	}
});

const muiTheme = ThemeManager.getMuiTheme(rawTheme);

class ThemeProvider extends React.Component {
	getChildContext() {
		return { muiTheme };
	}
	
	render() {
		return this.props.children;
	}
}

ThemeProvider.childContextTypes = {
	muiTheme: PropTypes.object
}

export default ThemeProvider;

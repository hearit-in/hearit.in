import React, {PropTypes} from 'react';

import { Checkbox } from 'material-ui';

import {
	ActionFavorite,
	ActionFavoriteBorder
} from 'material-ui/lib/svg-icons';

import colors from 'material-ui/lib/styles/colors';

export default class LikeCheckbox extends React.Component {
	render() {
		return <Checkbox
					{...this.props}
					labelPosition="left"
					labelStyle={{
						color: colors.pink500
					}}
					iconStyle={{
						fill: colors.pink500
					}}
					checkedIcon={<ActionFavorite />}
					unCheckedIcon={<ActionFavoriteBorder />} />
	}
}
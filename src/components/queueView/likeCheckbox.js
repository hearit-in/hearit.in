import React, {PropTypes} from 'react';

import { Checkbox } from 'material-ui';

import {
	ActionFavorite,
	ActionFavoriteBorder,
	ActionLock,
	ActionLockOutline
} from 'material-ui/lib/svg-icons';

import colors from 'material-ui/lib/styles/colors';

export default class LikeCheckbox extends React.Component {
	render() {
		let props = this.props.isInfinity ? {
			checkedIcon: (<ActionLock />),
			unCheckedIcon: (<ActionLockOutline />),
			iconStyle: {
				fill: colors.blue400
			},
			labelStyle: {
				color: colors.blue400
			}
		} : {
			checkedIcon: <ActionFavorite />,
			unCheckedIcon: <ActionFavoriteBorder />,
			iconStyle: {
				fill: colors.pink500
			},
			labelStyle: {
				color: colors.pink500
			}
		};

		return <Checkbox
					{...this.props}
					{...props}
					labelPosition="left" />
	}
}

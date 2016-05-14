import React, {PropTypes} from 'react';

import { Checkbox } from 'material-ui';

import {
	ActionFavorite,
	ActionFavoriteBorder,
	PlacesAllInclusive
} from 'material-ui/lib/svg-icons';

import colors from 'material-ui/lib/styles/colors';

export default class LikeCheckbox extends React.Component {
	render() {
		let props = this.props.isInfinity ? {
			checkedIcon: (<PlacesAllInclusive />),
			unCheckedIcon: (<PlacesAllInclusive />),
			iconStyle: {
				fill: colors.blue400
			}
		} : {
			checkedIcon: <ActionFavorite />,
			unCheckedIcon: <ActionFavoriteBorder />,
			iconStyle: {
				fill: colors.pink500
			}
		};

		return <Checkbox
					{...this.props}
					{...props}
					labelPosition="left"
					labelStyle={{
						color: colors.pink500
					}} />
	}
}

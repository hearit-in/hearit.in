import React, {PropTypes} from 'react';
import className from 'helpers/className';

export default class AppBarTextField extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<input
				autoCorrect="off"
				autoComplete="off"
				className={"appBarTextField " + className({"active":this.state.active})} />
		);
	}
}

AppBarTextField.propTypes = {

};

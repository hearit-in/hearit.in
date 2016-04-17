import React, { PropTypes } from 'react';

class Overlay extends React.Component {
	render() {
		return (this.props.active) ? (<div className="overlay">{this.props.children}</div>) : (<span />);
	}
}

Overlay.propTypes = {
	active: PropTypes.optionalBool
};

Overlay.defaultProps = {
	active: true
};

export default Overlay;

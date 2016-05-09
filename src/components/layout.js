import React, { PropTypes } from 'react';

export class Container extends React.Component {
	render() {
		return <div className="container">{this.props.children}</div>
	}
}

export class Row extends React.Component {
	render() {
		return <div className="row">{this.props.children}</div>
	}
}

export class Col extends React.Component {
	classNameFromProperty(classPrefix, propertyValue) {
		if(propertyValue === undefined) {
			return "";
		}
		
		return classPrefix + propertyValue;
	}
	
	getClassName() {
		return [
			this.classNameFromProperty("col-md-", this.props.md),
			this.classNameFromProperty("col-md-push-", this.props.mdPush),
			this.classNameFromProperty("col-xs-", this.props.xs),
			this.classNameFromProperty("col-xs-push-", this.props.xsPush),
		].join(" ");
	}
	
	render() {
		return <div className={this.getClassName()}>{this.props.children}</div>
	}
}
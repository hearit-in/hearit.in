import React, { PropTypes } from 'react';

function MergeClassNames(baseClassName) {
	function mergeProps(props) {
		return Object.assign({}, props, {
			className: `${baseClassName} ${props.className}`
		});
	}
	
	return (ComposedComponent) => class extends React.Component {
		constructor(props) {
			super(mergeProps(props));
		}
		
		componentWillReceiveProps(newProps) {
			return mergeProps(newProps);
		}
		
		render() {
			return <ComposedComponent {...this.props} />
		}
	}
}

export const Container = MergeClassNames("container")("div");

export const Row = MergeClassNames("row")("div");

export class Col extends React.Component {
	classNameFromProperty(classPrefix, propertyValue) {
		if(propertyValue === undefined) {
			return null;
		}
		
		return classPrefix + propertyValue;
	}
	
	getClassName() {
		return [
			this.classNameFromProperty("col-md-", this.props.md),
			this.classNameFromProperty("col-md-push-", this.props.mdPush),
			this.classNameFromProperty("col-md-offset-", this.props.mdOffset),
			
			this.classNameFromProperty("col-xs-", this.props.xs),
			this.classNameFromProperty("col-xs-push-", this.props.xsPush),
			this.classNameFromProperty("col-xs-offset-", this.props.xsOffset)
		]
		.filter(a => a)
		.join(" ");
	}
	
	render() {
		return <div className={this.getClassName()} {...this.props}>{this.props.children}</div>
	}
}
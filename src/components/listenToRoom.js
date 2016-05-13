import React, {PropTypes} from 'react';

import { mapValues, map } from 'lodash';

function defaultMapPathsToProps() {
	return {
		room: ""
	}
}

/**
 * A higher-order component that takes an object, mapping prop names to firebase paths (or a function returning said object).
 * The component passed in to the function acquired by calling listenToRoom() will have the data passed as props
 *
 *        {a, b}  => c => c
 * (() => {a, b}) => c => c
 */
export default function listenToRoom(mapPathsToProps) {
	mapPathsToProps = mapPathsToProps || defaultMapPathsToProps;

	if(mapPathToProps == undefined) {
		throw new Error("listenToRoom() called without a prop/path mapping")
	}

	if(typeof(mapPathToProps) !== 'function') {
		let pathsProps = mapPathsToProps;
		mapPathsToProps = () => pathsProps;
	}

	return (ComposedComponent) => {
		class Listener extends React.Component {
			constructor(props) {
				super(props);

				this.state = {};
			}

			componentDidMount() {
				this.firebaseRefs = mapValues(mapPathsToProps(), (path) =>
					this.context.roomRef.child(path)
				);

				map(this.firebaseRefs, (ref, prop) => {
					ref.on("value", snapshot => {
						this.setState({ [prop]: snapshot.val() })
					})
				});
			}

			componentWillUnmount() {
				map(this.firebaseRefs, ref => ref.off());
			}

			render() {
				return <ComposedComponent {...this.state} {...this.props} />
			}
		}

		Listener.contextTypes = {
			roomRef: PropTypes.object
		};

		return Listener;
	}
}

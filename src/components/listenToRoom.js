import React, {PropTypes} from 'react';

import { mapValues, map } from 'lodash';

function defaultMapPathsToProps() {
	return {
		room: ""
	}
}

export default function listenToRoom(mapPathsToProps) {
	mapPathsToProps = mapPathsToProps || defaultMapPathsToProps;

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

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';
import React from 'react';
import routes from './routes';
import history from '../helpers/history';
import { initFirebase } from '../sources/firebase';

class Shell extends React.Component {
	componentDidMount() {
		initFirebase();
	}

	render () {
		return (
			<Provider store={store}>
				<Router history={history}>
					{ routes }
				</Router>
			</Provider>
		)
	}
}

export default Shell;

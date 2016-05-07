import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';
import React from 'react';
import routes from './routes';
import history from '../helpers/history';
import ThemeProvider from './themeProvider';
import { initFirebase } from 'actions/firebase';

class Shell extends React.Component {
	componentDidMount() {
		let hasLoadedPersistentState = false;

		store.dispatch(initFirebase());
	}

	render () {
		return (
			<Provider store={store}>
				<ThemeProvider>
					<Router history={history}>
						{ routes }
					</Router>
				</ThemeProvider>
			</Provider>
		)
	}
}

export default Shell;

import { Router, Route, IndexRoute } from 'react-router';
import { Provider as StoreProvider } from 'react-redux';
import store from '../store';
import React from 'react';
import routes from './routes';
import history from '../helpers/history';
import ThemeProvider from './themeProvider';

require('normalize.css/normalize.css');

class Shell extends React.Component {
	componentDidMount() {
	}

	render () {
		return (
			<StoreProvider store={store}>
				<ThemeProvider>
					<Router history={history}>
						{ routes }
					</Router>
				</ThemeProvider>
			</StoreProvider>
		)
	}
}

export default Shell;

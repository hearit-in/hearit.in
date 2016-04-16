import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';
import React from 'react';

import App from './app';
import AuthView from './authView';

class Routes extends React.Component {
	render () {
		return (
			<Provider store={store}>
				<Router history={browserHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={AuthView} />
					</Route>
				</Router>
			</Provider>
		)
	}
}

export default Routes;
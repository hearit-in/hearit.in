import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';
import React from 'react';

import App from './app';
import AuthView from './authView';
import QueueView from './queueView';
import SearchView from './searchView';

import history from '../helpers/history';

class Shell extends React.Component {
	componentDidMount() {
	}

	render () {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Route path="/">
						<IndexRoute component={AuthView} />
						<Route path="app" component={App}>
							<Route path="queue" component={QueueView} />
							<Route path="search" component={SearchView} />
						</Route>
					</Route>
				</Router>
			</Provider>
		)
	}
}

export default Shell;

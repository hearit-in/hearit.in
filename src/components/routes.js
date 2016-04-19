import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './app';
import AuthView from './authView';
import QueueView from './queueView';
import SearchView from './searchView';

const routes = (
	<Route path="/">
		<IndexRoute component={AuthView} />
		<Route path="app" component={App}>
			<Route path="queue" component={QueueView} />
			<Route path="search" component={SearchView} />
		</Route>
	</Route>
);

export default routes;

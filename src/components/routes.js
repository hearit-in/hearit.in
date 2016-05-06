import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './app';
import AuthView from './authView';
import QueueView from './queueView';
import SearchView from './searchView';
import SettingsView from './settingsView';
import HistoryView from './historyView';
import CreateRoomView from './createRoomView';

const routes = (
	<Route path="/">
		<IndexRoute component={AuthView} />
		<Route path="createRoom" component={CreateRoomView} />
		<Route path="app" component={App}>
			<Route path="queue" component={QueueView} />
			<Route path="search" component={SearchView} />
			<Route path="history" component={HistoryView} />
			<Route path="settings" component={SettingsView} />
		</Route>
	</Route>
);

export default routes;

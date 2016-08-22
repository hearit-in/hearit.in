import { Route, IndexRoute } from 'react-router';
import React from 'react';

import RootView from './rootView';
import App from './app';
import AuthView from './authView';
import QueueView from './queueView/';
import SettingsView from './settingsView/';
import HistoryView from './historyView';
import CreateRoomView from './createRoomView';
import AdminView from './adminView/';
import RedirectToRoomView from './redirectToRoomView';
import DownloadPlayerInstructionsView from './downloadPlayerInstructionsView';

import FourOhFour from './fourOhFour';

const routes = (
	<Route path="/" component={RootView}>
		<IndexRoute component={AuthView} />
		<Route path="createRoom" component={CreateRoomView} />
		<Route path="app" component={App}>
			<IndexRoute component={QueueView} />
			<Route path="history" component={HistoryView} />
			<Route path="settings" component={SettingsView} />
			<Route path="admin" component={AdminView} />
			<Route path="downloadPlayerInstructions" component={DownloadPlayerInstructionsView} />
		</Route>
		<Route path=":roomId" component={RedirectToRoomView} />
		<Route path="*" component={FourOhFour} />
	</Route>
);

export default routes;

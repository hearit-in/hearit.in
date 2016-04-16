import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import React from 'react'

import App from './app';
import AuthView from './authView';

class Routes extends React.Component {
	render () {
		return <Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={AuthView} />
			</Route>
		</Router>
	}
}

export default Routes;
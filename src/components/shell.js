import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from '../store';
import React from 'react';
import initialRoutes from './routes';

import history from '../helpers/history';

class Shell extends React.Component {
	componentDidMount() {
		this.routes = require("./routes");

		if (module.hot) {
			module.hot.accept('./routes', function () {
				this.routes = require('./routes');
				this.refs.router.replaceRoutes(this.routes);
			});
		}
	}

	render () {
		return (
			<Provider store={store}>
				<Router history={history} ref="router">
					{ initialRoutes }
				</Router>
			</Provider>
		)
	}
}

export default Shell;

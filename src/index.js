require('styles/style.stylus');

import 'core-js/fn/object/assign';
import 'core-js/fn/promise';


import React from 'react';
import ReactDOM from 'react-dom';


require("react-tap-event-plugin")();
require("velocity-animate");
require("velocity-animate/velocity.ui");
require('normalize.css/normalize.css');

import serviceWorkerRuntime from 'serviceworker-webpack-plugin/lib/runtime';
if('serviceWorker' in navigator) {
	const registration = serviceWorkerRuntime.register();
}

import Shell from './components/shell';

// Render the main component into the dom
ReactDOM.render(<Shell />, document.getElementById('app'));

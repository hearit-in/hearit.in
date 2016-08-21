import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Shell from './components/shell';

require("react-tap-event-plugin")();
require("velocity-animate");
require("velocity-animate/velocity.ui");

require("./serviceWorker");

// Render the main component into the dom
ReactDOM.render(<Shell />, document.getElementById('app'));

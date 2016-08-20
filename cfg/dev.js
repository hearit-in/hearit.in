'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');


let config = Object.assign({}, baseConfig, {
	host: "0.0.0.0",
	entry: [
		'webpack-dev-server/client?http://localhost:' + defaultSettings.port,
		'./src/index'
	],
	cache: true,
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"dev"'
		}),
		new webpack.NoErrorsPlugin()
	],
	module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
	test: /\.(js|jsx)$/,
	loader: 'babel-loader',
	include: [].concat(
		config.additionalPaths,
		[ path.join(__dirname, '/../src') ]
	),
	exclude: [
		"./node_modules"
	]
});

module.exports = config;

'use strict';
const path = require('path');
const ServiceWorkerPlugin = require("serviceworker-webpack-plugin");
const defaultSettings = require('./defaults');
const autoprefixer = require("autoprefixer");

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
	additionalPaths: additionalPaths,
	host: defaultSettings.host,
	port: defaultSettings.port,
	debug: true,
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, '/../dist'),
		filename: 'app.js',
		publicPath: defaultSettings.publicPath
	},
	plugins: [
		new ServiceWorkerPlugin({
			entry: path.join(__dirname, "../src/sw.js")
		})
	],
	devServer: {
		contentBase: './src/',
		historyApiFallback: true,
		hot: false,
		port: defaultSettings.port,
		publicPath: defaultSettings.publicPath,
		noInfo: false
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			actions: `${defaultSettings.srcPath}/actions/`,
			components: `${defaultSettings.srcPath}/components/`,
			sources: `${defaultSettings.srcPath}/sources/`,
			stores: `${defaultSettings.srcPath}/stores/`,
			styles: `${defaultSettings.srcPath}/styles/`,
			helpers: `${defaultSettings.srcPath}/helpers/`,
			config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
		}
	},
	module: {},
	postcss: function() {
		return [autoprefixer];
	}
};

"use strict";

// TODO: convert tojson and delegate the rootPath to ../index.js

var path = require('path');
var rootPath = path.normalize(path.join(__dirname,'/../..'));
var apiPath = path.normalize(path.join(rootPath,'api'));

var _path = {
	root: rootPath,
	api: path.join(rootPath,'api'),
	models: path.join(rootPath,'api','models'),
	routes: path.join(rootPath,'api','routes'),
	static: path.join(rootPath,'www')
}

module.exports = {
	app: {
		title: 'Hybrid Boilerplate',
		description: '',
		keywords: ''
	},
	root: rootPath,
	path: _path,
	port: process.env.PORT || 3000,
	templateEngine: 'jade',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	languages: ['bg','en'],
	defaultLanguage: 'bg',
	roles: ['anon','admin','user'],
	userRoles: ['user','publisher']
};
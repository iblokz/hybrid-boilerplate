"use strict";

var path = require('path');
var http = require('http');
var fileUtil = require('../util/file');
var passport = require('passport');

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var flash = require('connect-flash');

// restify
var restify = require("iblokz-node-restify");
var restMap = require("../../config/rest/map.json");

module.exports = function(config, db){
	// declare our app
	var app = express();

	// Initialize models
	fileUtil.walk(config.path.models, /(.*)\.(js$|coffee$)/).forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// init additional model from restify
	restify.loadModel(restMap, db);

	// config stuff
	/*
	app.set('views',__dirname+'/../app/views');
	app.set('view engine','jade');
	*/

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(flash());

	// serve static
	// TODO - move this logic to different ports for www && ionic
	app.use(express.static(config.path.static));

	/*
	fileUtil.walk('./app/middleware', /(.*)\.(js$|coffee$)/).forEach(function(middlewarePath) {
		require(path.resolve(middlewarePath))(app);
	});
*/

	// Load Routes
	fileUtil.walk(config.path.routes, /(.*)\.(js$|coffee$)/).forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	// TODO: load additional routes
	restify.initRoutes(app,restMap,{},db);

	return app;
}
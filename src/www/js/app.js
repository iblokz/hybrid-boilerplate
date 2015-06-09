"use strict"

var app = angular.module('hybrid', [
	'ui.router',
	'ngResource'
	]);

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider',
	function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url : '/',
				templateUrl: '/states/home.html'
			})

		$locationProvider.hashPrefix('!');

	}
]);
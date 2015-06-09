"use strict";

app.factory('Article', ['$resource', function($resource) {
	
	var defaultActions = {
		create: {
			method: 'POST'
		},
		update: {
			method: 'PUT'
		},
		query: {
			method: 'GET',
			isArray: false
		}
	}

	var Article = $resource('http://localhost:3000/api/articles/:_id', { _id: '@_id' }, defaultActions);

	return Article;
}]);
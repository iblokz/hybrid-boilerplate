"use strict";

app.controller('HomeCtrl', function ($scope, $state, $http, Article) {

	$scope.articles = [];

	Article.query().$promise.then(function(result){
		$scope.articles = result.list;
	})

});
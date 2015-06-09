"use strict";

app.controller('AdminArticlesCtrl', function ($scope, $state, Article) {

	$scope.articles = [];
	$scope.article = {};

	$scope.load = function(){
		Article.query().$promise.then(function(result){
			$scope.articles = result.list;
		});
	}

	$scope.load();

	$scope.reset = function(){
		$scope.article = {};
	}

	$scope.edit = function(article){
		$scope.article = article;
		
	}

	$scope.save = function(article){
		if(article._id){
			Article.update({_id: article._id}, article).$promise.then(function(){
				$scope.load();
			})
		} else {
			Article.create(article).$promise.then(function(){
				$scope.load();
			});
		}
		$scope.article = {};
	}

	$scope.delete = function(article){
		Article.delete({_id: article._id}, article).$promise.then(function(){
			$scope.load();
		})
	}

});
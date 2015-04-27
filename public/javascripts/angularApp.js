/* Gabriel Velasquez
	 gvelasquez@gmail.com
	 thinkster.io/mean-stacktutorial

	 The purpose of this program is lean the MEAN stack in CRUD web development

	 app.js - angular app
*/

//name of the app
var app = angular.module('flapperNews', ['ui.router']);

//config block for our app that will configure the gome state
//a name, template url, and controlled by MainCtrl.
app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		});

	$stateProvider
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});

	$urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function(){

	var o = {
		posts: []
	};

	return o;
}]);

//main controller of the app
app.controller('MainCtrl', [
'$scope',
'posts',

//this is where our variables will be stored for the app
function($scope, posts){
	$scope.test = 'Hello world!';

	$scope.posts = posts.posts; //bind the $scope.posts variable in the controller to the posts array in our service

	//new variable called posts that has a list of post titles
	$scope.posts = [
	{title: 'post 1', upvotes: 5},
	{title: 'post 2', upvotes: 2},
	{title: 'post 3', upvotes: 15},
	{title: 'post 4', upvotes: 9},
	{title: 'post 5', upvotes: 4}
	];

	//this function adds a post to the end of the lists of posts in the posts variable
	$scope.addPost = function(){
		//if the there is no text just exit the function
		if(!$scope.title || $scope.title === '') { return; } 

		//this function will append a new post to our $scope.posts variable
		$scope.posts.push({
			title: $scope.title,
			link: $scope.link,
			upvotes: 0,
			comments: [
				{author: 'Joe', body: 'Cool post!', upvotes:0},
				{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
			]
		});

		//clears the text box after the user hits enter
		$scope.title = ''; 
		$scope.link = '';
	};

	$scope.incrementUpvotes = function(post) {
		post.upvotes += 1;
	};
}]);

app.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
function($scope, $stateParams, posts){

	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function(){
		if($scope.body === '') { return; }

		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = '';
	};

}]);


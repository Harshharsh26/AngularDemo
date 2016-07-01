//Declare a App
var app = angular.module('chatApp', ['firebase']);
//Add Controller for App
app.controller('chatController', ['$scope', 'Message', function ($scope, Message) {

    $scope.user = "Guest";

    $scope.messages = Message.all;

    $scope.insert = function (message) {
        Message.create(message);
    };
    $scope.delete = function (message) {
        Message.delete(message);
    };
    $scope.update = function (message) {
        Message.update(message);
    };
    $scope.prependItem = function (message) {
        items.unshift(message);
    };
}]);
app.factory('Message', ['$firebase',
	function ($firebase) {
	    var ref = new Firebase('https://fir-project-a8d73.firebaseio.com/');
	    var messages = $firebase(ref.child('messages')).$asArray();

	    var Message = {
	        all: messages,
	        create: function (message) {
	            return messages.$add(message);
	        },
	        get: function (messageId) {
	            return $firebase(ref.child('messages').child(messageId)).$asObject();
	        },
	        delete: function (message) {
	            return messages.$remove(message);
	        }
	    };
	   
	    return Message;

	}
]);

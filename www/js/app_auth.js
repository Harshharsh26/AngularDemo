var firebaseApp = angular.module('starter', ['ionic', 'firebase', 'ngCordovaOauth']);
var fb = new Firebase("https://INSTANCE_ID_HERE.firebaseio.com");

firebaseApp.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});


firebaseApp.controller("ExampleController", function ($scope, $firebaseAuth, $cordovaOauth) {

    var auth = $firebaseAuth(fb);

    $scope.login = function () {
        $cordovaOauth.facebook("FACEBOOK_APP_ID_HERE", ["email"]).then(function (result) {
            auth.$authWithOAuthToken("facebook", result.access_token).then(function (authData) {
                console.log(JSON.stringify(authData));
            }, function (error) {
                console.error("ERROR: " + error);
            });
        }, function (error) {
            console.log("ERROR: " + error);
        });
    }

});
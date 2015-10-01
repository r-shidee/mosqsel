// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var appcore = angular.module('starter', ['ionic', 'starter.controllers', 'firebase'])
var fb = null;
var ref = new Firebase("https://mosqseltest.firebaseio.com/");


appcore.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    

    ref.unauth();
      
  });
});

appcore.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state("login", {
  url: "/login",
  templateUrl: "templates/login.html",
  controller: "LoginController"
  })
  
  .state("register", {
  url: "/register",
  templateUrl: "templates/register.html",
  controller: "RegisterController"
  })
  
    .state("resetpassword", {
  url: "/resetpassword",
  templateUrl: "templates/resetpassword.html",
  controller: "ResetPasswordController"
  })
  
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller:'SearchCtrl'
      }
    }
  })

    .state('app.announcements', {
    url: "/announcements",
    views: {
      'menuContent': {
        templateUrl: "templates/announcements.html",
        controller:'AnnouncementsCtrl'
      }
    }
  })
      .state('app.news', {
    url: "/news",
    views: {
      'menuContent': {
        templateUrl: "templates/news.html",
        controller:'NewsCtrl'
      }
    }
  })
  
    .state('app.events', {
    url: "/events",
    views: {
      'menuContent': {
        templateUrl: "templates/events.html",
		controller:'EventsCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

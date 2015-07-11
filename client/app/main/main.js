'use strict';

angular.module('predictYourCommitsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

      $stateProvider.state("commits", {
        url: "/commits/:user",
        templateUrl: "app/predict-your-commits/index.html",
        controller: function($stateParams, $scope){
            $scope.user = $stateParams.user;
        }
      });
  });

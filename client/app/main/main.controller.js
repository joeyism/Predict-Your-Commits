'use strict';

angular.module('predictYourCommitsApp')
  .controller('MainCtrl', function ($scope, $location) {

      $scope.press = function($event){
        if ($event.keyCode ==13){
            $scope.submit();
        }
      };

      $scope.submit = function(){
        $location.path("/commits/"+$scope.username);
      };

  });

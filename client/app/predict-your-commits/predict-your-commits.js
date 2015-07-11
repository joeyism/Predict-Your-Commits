"use strict";

angular.module('predictYourCommitsApp').directive("predictYourCommits", ["$http", function($http){

    return {
        templateUrl: "app/predict-your-commits/predict-your-commits.tpl.html",
        replace: true,
        scope: {
            username: '='
        },
        link: function(scope){

            $http.get("/api/user/"+scope.username).success(function(commits){
                scope.commits = commits;
            }).error(function(error){
                console.log(error); 
            });
        
        }
    };

}]);

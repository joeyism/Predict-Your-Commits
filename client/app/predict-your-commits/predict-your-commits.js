"use strict";

angular.module('predictYourCommitsApp').directive("predictYourCommits", ["$http", function($http){

    return {
        templateUrl: "app/predict-your-commits/predict-your-commits.tpl.html",
        replace: true,
        scope: {
            username: '='
        },
        link: function(scope){
            scope.loaded = false;

            $http.get("/api/user/"+scope.username).success(function(commits){
                scope.loaded = true;
                scope.chartConfig = {
                    options: {
                        chart: {
                            type: 'spline'
                        },
                        tooltip: {
                            style: {
                                padding: 10,
                                fontWeight: 'bold'
                            },
                            pointFormat: 'Commits: {point.y:f}',
                            xDateFormat: '%Y-%m-%d',
                        }
                    },
                    series:[{
                        name: "Total",
                        data: commits
                    }],
                    title: {
                        text: "Number of commits by " + scope.username
                    },
                    xAxis: {
                        type: 'datetime',
                        title: {
                            text: 'Date'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Number of Commits'
                        },
                        min: 0
                    },
                    loading: false
                }; 
            }).error(function(error){
                console.log(error); 
            });

        }
    };

}]);

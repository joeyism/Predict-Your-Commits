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
                var dataSeries = [];
                Object.keys(commits).forEach(function(repo){
                    dataSeries.push({
                        name: repo,
                        data: commits[repo]
                    });
                })
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
                            pointFormat: 'Commits to {series.name}: {point.y:f}',
                            xDateFormat: '%Y-%m-%d',
                        }
                    },
                    series: dataSeries,
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
                scope.error = "Could not find "+scope.username +" :( ";
                scope.error2 = "Are you sure you have the spelling correct, or that "+scope.username+" is a real person and not just a figment of your imagination?";
            });

        }
    };

}]);

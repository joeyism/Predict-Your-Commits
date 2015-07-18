"use strict";

angular.module('predictYourCommitsApp').directive("predictYourCommits", ["$http", function($http){
    var textColor = "#F3C110";
    var backgroundColor = "#393531";
    var legendTextColor = "#B5A6D3";
    var legendHoverColor = "#F1D9FB";
    var legendHiddenColor = "#1D2F43";

    return {
        templateUrl: "app/predict-your-commits/predict-your-commits.tpl.html",
        replace: true,
        scope: {
            username: '='
        },
        link: function(scope){
            scope.loaded = false;
            var textStyle = {
                color: textColor
            };
            var axisLabelStyle = {
                style: textStyle
            };

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
                            type: 'spline',
                            backgroundColor: backgroundColor,
                            color: textColor
                        },
                        tooltip: {
                            style: {
                                padding: 10,
                                fontWeight: 'bold'
                            },
                            pointFormat: 'Commits to <span style="color: {series.color}">{series.name}</span>: {point.y:f}',
                            xDateFormat: '%Y-%m-%d',
                        },
                        legend: {
                            itemStyle: {
                                color: legendTextColor
                            },
                            itemHoverStyle: {
                                color: legendHoverColor
                            },
                            itemHiddenStyle: {
                                color: legendHiddenColor
                            }
                        },
                    },
                    series: dataSeries,
                    title: {
                        text: "Number of commits by " + scope.username,
                        style: textStyle
                    },
                    xAxis: {
                        type: 'datetime',
                        title: {
                            text: 'Date',
                            style: textStyle
                        },
                        labels: axisLabelStyle
                    },
                    yAxis: {
                        title: {
                            text: 'Number of Commits',
                            style: textStyle 
                        },
                        min: 0,
                        labels: axisLabelStyle
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

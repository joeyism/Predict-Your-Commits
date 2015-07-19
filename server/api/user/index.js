"use strict";
var github = require("./github");
var data = require("./data");
var extract = require("./extract");
var async = require("async");
require("colors");

var getAllCommits = function(list){
    var allProjects = {};

    return new Promise(function(resolve, reject){
        var totalCommits = [];
        async.eachSeries(list, function(project, next){
            github.getCommits(project).then(function(result){

                data.bin(result).then(function(binnedData){
                    
                    return data.parse(binnedData);

                }).then(function(parsedData){

                    allProjects[extract.repoName(project)] = parsedData;

                });

                totalCommits = totalCommits.concat(result);
                next();
            }).catch(function(err){
                next();
            });
        }, 
        function(err){
            if(err){
                reject(err);
            }
            else {
                allProjects.total = totalCommits.sort();
                resolve(allProjects);
            }
        });
    });
};


module.exports = function(req, res){
    var user = req.params.user;
    var resObj;

    github.getUserRepo(user).then(function(result){

        return getAllCommits(result);

    }).then(function(result){

        resObj = result;
        return data.bin(result.total);

    }).then(function(result){

        return data.parse(result);

    }).then(function(result){

        resObj.total = result;
        res.status(200).json(resObj);    

    }).catch(function(err){

        console.log(err.toString().red);
        res.status(400).send(err.toString());

    });

}

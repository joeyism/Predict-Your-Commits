"use strict";
var github = require("./github");
var async = require("async");
require("colors");

var getAllCommits = function(list){
    return new Promise(function(resolve, reject){
        var totalCommits = [];
        async.eachSeries(list, function(project, next){
            github.getCommits(project).then(function(result){
                totalCommits = totalCommits.concat(result);
                next();
            }).catch(function(err){
                next(err);
            });
        }, 
        function(err){
            if(err){
                reject(err);
            }
            else {
                resolve(totalCommits);
            }
        });
    });
};


module.exports = function(req, res){
    var user = req.params.user;

    github.getUserRepo(user).then(function(result){

        return getAllCommits(result);

    }).then(function(result){
    
        console.log(result);

    }).catch(function(err){

        console.log(err.toString().red);

    });

}
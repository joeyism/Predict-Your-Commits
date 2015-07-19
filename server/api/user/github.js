"use strict";
var request = require("request");
var Promise = require("promise");
var url = require("./url");
var query = require("../../config.json");
var headers = {
    "User-Agent":"joeyism"
};

var rejectOtherwise = function(err, response, body, reject, callback){
    if (err){
        reject(err);
    }
    else {
        if (response.statusCode.toString().indexOf("2") === 0){
            callback();
        }
        else {
            reject(body);
        }
    }
};

var getUserRepo = function(user){
    return new Promise(function(resolve, reject){
        var options = {
            method:"GET",
            url: url.getUserRepo(user),
            qs: query,
            headers: headers
        };
        request(options, function(err, response, body){
            rejectOtherwise(err, response, body, reject, function(){
                var repoList = [];
                JSON.parse(body).forEach(function(each){
                    repoList.push(each.full_name);
                });
                resolve(repoList);
            });
        });
    });
};

var getCommits = function(project, username){
    return new Promise(function(resolve, reject){
        var options = {
            method: "GET",
            url: url.getCommits(project),
            qs: query,
            headers: headers
        };
        request(options, function(err, response, body){
            rejectOtherwise(err, response, body, reject, function(){
                var commitsForProject = [];
                JSON.parse(body).forEach(function(commit){
                    if (commit.commit.committer.name === username){
                        commitsForProject.push(commit.commit.committer.date);
                    }
                });
                resolve(commitsForProject);
            });
        });
    });
};

module.exports = {
    getUserRepo: getUserRepo,
    getCommits: getCommits
};

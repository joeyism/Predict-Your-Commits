"use strict";
var request = require("request");
var Promise = require("promise");
var url = require("./url");
var query = require("../../config.json");
var async = require("async");
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
        var pageNum = 1,
            done = true,
            repoList = [];

        async.whilst(function(){
            return done;
        }, function(next){
            var options = {
                method:"GET",
                url: url.getUserRepo(user),
                qs: {
                    "client_id": query["client_id"],
                    "client_secret": query["client_secret"],
                    page: pageNum
                },
                headers: headers
            };
            request(options, function(err, response, body){
                rejectOtherwise(err, response, body, reject, function(){
                    body = JSON.parse(body);
                    if (body.length > 0){
                        body.forEach(function(each){
                            var lastUpdate = new Date(each["updated_at"]);
                            var now = new Date();
                            if (lastUpdate.getTime() > now.getTime() - 1000*60*60*24*365){
                                repoList.push(each.full_name);
                            }
                        });
                        pageNum++;
                    }
                    else {
                        done = false;
                    }
                    next();
                });
            });
        }, function(){
            resolve(repoList);
        });
    });
};

var getCommits = function(project, username, name){
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
                    if (commit.commit.committer.name === name){
                        commitsForProject.push(commit.commit.committer.date);
                    }
                });
                resolve(commitsForProject);
            });
        });
    });
};

var getUserName = function(username){
    return new Promise(function(resolve, reject){
        var options = {
            method: "GET",
            url: url.getUserName(username),
            qs: query,
            headers: headers
        };
        request(options, function(err, response, body){
            rejectOtherwise(err, response, body, reject, function(){
                body = JSON.parse(body);
                resolve(body.name); 
            });    
        });
    });
};

module.exports = {
    getUserRepo: getUserRepo,
    getCommits: getCommits,
    getUserName: getUserName
};

"use strict";

var getUserRepo = function(user){
    return "https://api.github.com/users/" + user + "/repos";
};

var getCommits = function(project){
    return "https://api.github.com/repos/" +  project + "/commits";
};

var getUserName = function(user){
    return "https://api.github.com/users/" + user;
};

module.exports = {
    getUserRepo: getUserRepo,
    getCommits: getCommits,
    getUserName: getUserName
};

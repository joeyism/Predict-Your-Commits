"use strict";

var getUserRepo = function(user){
    return "https://api.github.com/users/" + user + "/repos";
};

var getCommits = function(project){
    return "https://api.github.com/repos/" +  project + "/commits";
};


module.exports = {
    getUserRepo: getUserRepo,
    getCommits: getCommits
};

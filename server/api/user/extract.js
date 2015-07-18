"use strict";

var repoName = function(fullName){
    return fullName.split("/")[1];
};



module.exports = {
    repoName: repoName
};

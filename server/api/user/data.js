"use strict";
var timestampBinner = require('timestamp-binning');
var Promise = require("promise");
var ayear = 31536000000;

var bin = function(data){
    return new Promise(function(resolve){
        var binner = new timestampBinner("year", "day");    
        data.forEach(function(timeString, i, thisArray){
            thisArray[i] = new Date(timeString);
        });
        
        binner.addTimestamps(data);
        resolve(binner.hist_object); 
    });
};

var parse = function(data){
    return new Promise(function(resolve){
        var result = [];
        data.forEach(function(pair){
            result.push([+pair.timestampbin, pair.count]);
        });
        resolve(result);
    });
};

module.exports = {
    bin: bin,
    parse: parse
};

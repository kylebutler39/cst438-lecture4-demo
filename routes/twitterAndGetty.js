var async = require('async'); 
var express = require('express');
var router = express.Router();
var btoa = require('btoa');
var https = require('https'); 
var twitter = require('./helpers/twitter');
var getty = require('./helpers/getty');


router.get('/', function(req, res, next) {
    async.parallel([
        twitter.doAllTwitterRequests,
        getty.makeGettyApiRequest
    ],
    // optional callback
    function(err, results) {
        // results is an array
        // first element is going to be 'tweets'
        // second element is going to be 'imageURI'
        
        var tweets = results[0]; 
        var imageURI = results[1]; 
        
        console.log("num tweets!!!!: " + tweets.length);
        console.log("image URI!!!: " + imageURI); 
        res.render('twitterAndGetty', {tweets: tweets, imageURI: imageURI});
    });
  
});

module.exports = router;


var friendList = require('../data/friends.js');
var path = require('path');

module.exports = function (app) {

	app.get('/api/friends', function (req, res) {
		res.json(friendList);
	});

	app.post('/api/friends', function (req, res) {
		//friendList.push(req.body);
		var currentMatch;
		var currentLow = 100
		// loops through all candidates to determine best match
		for (var j = 0; j < friendList.length; j++) {
			var totalDifference = 0
			//loops through scores, compares, and totals differences
			for (var k = 0; k < friendList[j].scores.length; k++) {
				totalDifference += difference(req.body.scores[k], friendList[j].scores[k]);
			}
			if (totalDifference < currentLow) {
				currentLow = totalDifference;
				currentMatch = friendList[j];
			}
		}
		//return result
		res.json(currentMatch)
		
	});

	function difference(a, b) {
		return Math.max(a, b) - Math.min(a, b);
	}
}
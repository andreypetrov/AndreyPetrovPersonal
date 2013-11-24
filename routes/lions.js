/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-10-21
 * Time: 11:45 AM
 * To change this template use File | Settings | File Templates.
 */


var gameJson = require('../data/lionsGame.json');



exports.game = function (req, res) {
    setTimeout((function() {
        res.send(gameJson);
        console.log("added 5 seconds delay");

    }), 2000);
};
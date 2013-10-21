/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-10-21
 * Time: 11:45 AM
 * To change this template use File | Settings | File Templates.
 */


var gameJson = require('../data/lionsGame.json');



exports.game = function (req, res) {
    //TODO figure out why this delay does not work
    setTimeout((function() {
        res.send(gameJson);
        console.log("delay");

    }), 2000);
};
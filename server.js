
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
var http = require('http');
var path = require('path');

var fs = require('fs');
var requirejs = require('requirejs');

var lionsApi = require ('./routes/lions');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://sa:sancho@ds047198.mongolab.com:47198/lions');
var db = mongoose.connection;


//TODO remove this db testing later
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
   //yay
    var kittySchema = mongoose.Schema({name: String});
    kittySchema.methods.speak = function() {
        var greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    }


    var Kitten = mongoose.model('Kitten', kittySchema);
    //create a new kitten, named Silence
    var silence = new Kitten({name: 'Silence'});
    var fluffy = new Kitten({name: 'Fluffy'});
    fluffy.speak();
    console.log(silence.name);  //'Silence'

    /* Commented out the saving of the model. It was just for testing
    silence.save();
    fluffy.save(function(err, fluffy) {
        if(err) {}
        fluffy.speak();
    });*/

    Kitten.find({name: /^Sil/},function(err, kittens){
       if(err); //TODO handle error

       console.log(kittens);

    });
    console.log("success");
});

var app = express();












app.get('/api/lions/game', lionsApi.game);











// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'games')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-09-12
 * Time: 4:26 PM
 * To change this template use File | Settings | File Templates.
 */

// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
    hbs : {
        disableI18n : true
    },

    paths: {
        jquery: '../lib/jquery-2.0.3',
        underscore: '../lib/underscore',
        backbone: '../lib/backbone',


        handlebars : "../lib/hbs/handlebars",
        Handlebars : "../lib/hbs/handlebars",

        hbs: '../lib/hbs/hbs',
        i18nprecompile : "../lib/hbs/i18nprecompile",
        json2 : "../lib/hbs/json2"
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    }
});

console.log("require config");

require([

    // Load our app module and pass it to our definition function
    'app',
    'hbs',
    'hbs!views/One'
], function(App, Hbs, One){
    console.log(Hbs);

    console.log(One);

    // The "app" dependency is passed in as "App"

    App.initialize();

});
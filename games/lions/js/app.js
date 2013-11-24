//Globally accessible as app
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'router' // Request router.js
], function ($, _, Backbone, Handlebars, Router) {

    var initHandlebars = function () {

        //A helper that adds the checked="checked" attribute based on the true/false value of the parameter passed to it. Usually the parameter comes from the model
        Handlebars.registerHelper('checked', function (currentValue) {
            return currentValue == '1' ? ' checked="checked"' : '';
        });

    }
    var initialize = function () {
        initHandlebars();

        // Pass in our Router module and call it's initialize function
        //also assign it to the app object for future acessibility
        this.router = Router.initialize();
    }


    return { initialize: initialize };
});
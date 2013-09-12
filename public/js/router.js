/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-09-12
 * Time: 4:33 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/home'
], function ($, _, Backbone , HomeView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "home"
        },

        initialize: function () {
            this.homeView = new HomeView();
            //this.infoView = new InfoView();
            //this.headerView = new HeaderView();
            //this.footerView = new FooterView();
        },

        renderHeader: function () {
            //$("#header").html(this.headerView.render().el);
        },

        renderFooter: function () {
        },

        preNavigate: function () {
        },

        postNavigate: function () {
        },

        home: function () {
            this.preNavigate();
            $('#app').html(this.homeView.render().el);
            this.postNavigate();
        }

    });

    var initialize = function() {
        var app = new AppRouter();
        Backbone.history.start();
    };

    return { initialize : initialize };
});



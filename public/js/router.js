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
    'views/home/home',
    'views/header/header',
    'views/footer/footer'
], function ($, _, Backbone ,
             HomeView,
             HeaderView,
    FooterView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "home"
        },

        initialize: function () {
            this.headerView = new HeaderView();
            this.footerView = new FooterView();

            this.homeView = new HomeView();

            this.renderHeader();
            this.renderFooter();
        },

        renderHeader: function () {
            $("#header").html(this.headerView.render().el);
        },
        renderFooter: function () {
            $("#footer").html(this.footerView.render().el);
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



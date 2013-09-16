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
    'views/footer/footer',
    'views/work/work',
    'views/games/games',
    'views/me/me',
    'views/you/you'
], function ($, _, Backbone ,
             HomeView,
             HeaderView,
    FooterView,
    WorkView,
    GamesView,
    MeView,
    YouView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            "work": "work",
            "games": "games",
            "me": "me",
            "you": "you"
        },

        initialize: function () {
            this.headerView = new HeaderView();
            this.footerView = new FooterView();

            this.homeView = new HomeView();
            this.workView = new WorkView();
            this.gamesView = new GamesView();
            this.meView = new MeView();
            this.youView = new YouView();


            this.renderHeader();
            this.renderFooter();
        },

        renderHeader: function () {
            $("#app-header").html(this.headerView.render().el);
        },
        renderFooter: function () {
            $("#app-footer").html(this.footerView.render().el);
        },

        preNavigate: function () {
        },

        postNavigate: function () {
        },



        home: function () {
            this.preNavigate();
            $('#app').html(this.homeView.render().el);
            this.postNavigate();
        },

        games:function() {
            $('#app').html(this.gamesView.render().el);
        },

        work:function() {
            $('#app').html(this.workView.render().el);
        },

        me:function() {
            $('#app').html(this.meView.render().el);
        },

        you:function() {
            $('#app').html(this.youView.render().el);
        }


    });

    var initialize = function() {
        var app = new AppRouter();
        Backbone.history.start();
    };

    return { initialize : initialize };
});



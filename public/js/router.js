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
    'views/you/you',


    //bulls and cows
    'views/bulls/bulls',
    'views/bulls/model/gameCreator'

], function ($, _, Backbone ,
             HomeView,
             HeaderView,
    FooterView,
    WorkView,
    GamesView,
    MeView,
    YouView,
    BullsView,
    bullsGameCreator) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            "work": "work",
            "games": "games",
            "me": "me",
            "you": "you",
            "bulls": "bulls"
        },

        initialize: function () {
            this.fetch();

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

        fetch: function() {
            this.bullsModel = bullsGameCreator();
        },






        renderHeader: function () {
            $("#app-header").html(this.headerView.render().el);
        },
        renderFooter: function () {
            $("#app-footer").html(this.footerView.render().el);
        },



        preNavigate: function (navIndex) {
            this.headerView.onNavigate(navIndex);
        },

        postNavigate: function () {

        },



        home: function () {
            this.preNavigate(0);
            $('#app').html(this.homeView.render().el);
            this.postNavigate();
        },

        work:function() {
            this.preNavigate(1);
            $('#app').html(this.workView.render().el);
            this.postNavigate();
        },

        games:function() {
            this.preNavigate(2);
            $('#app').html(this.gamesView.render().el);
            this.postNavigate();
        },


        me:function() {
            this.preNavigate(3);
            $('#app').html(this.meView.render().el);
            this.postNavigate();
        },

        you:function() {
            this.preNavigate(4);
            $('#app').html(this.youView.render().el);
            this.postNavigate();
        },


        bulls:function(){
            this.preNavigate(2);
            this.bullsView = new BullsView({model: this.bullsModel});
            $('#app').html(this.bullsView.render().el);
            this.postNavigate();
        }


    });

    //initialize the router and give a reference to it
    var initialize = function() {
        var appRouter = new AppRouter();
        Backbone.history.start();
        return appRouter;
    };

    return { initialize : initialize};
});



/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-09-12
 * Time: 4:33 PM
 * Globally accessible as app.router
 */

define([
    //bulls and cows
    'jquery',
    'underscore',
    'backbone',
    'views/loader/loader',
    'views/menu/menu',
    'views/game/game',
    'views/settings/settings',
    'views/about/about',
    'model/game'

], function ($, _, Backbone, LoaderView, MenuView, GameView, SettingsView, AboutView, Game) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "menu",
            "settings": "settings",
            "game": "game",
            "about": "about"
        },

        initialize: function () {
            console.log("init");

            this.loaderView = new LoaderView();

            //The model of the game, loaded from the server. Contains all settings. In the future may have a different model per user (personalized). Currently it comes from data/lionsGame.json
            this.model = new Game();
            loadData.apply(this);

            this.menuView = new MenuView({model: this.model});
            this.gameView = new GameView({model: this.model});
            this.settingsView = new SettingsView({model: this.model});
            this.aboutView = new AboutView({model: this.model});
        },




        menu: function () {
            console.log("render menu");
            $('#app').html(this.menuView.render().el);
        },

        settings: function () {
            $('#app').html(this.settingsView.render().el);
        },

        game: function () {
            $('#app').html(this.gameView.render().el);
        },

        about: function () {
            $('#app').html(this.aboutView.render().el);
        }

    });

    /**
     * Load the model from the server and upon completion, start backbone routing.
     * On page refresh this loading is re-executed.
     */
    var loadData = function () {
        //add spinner. Later it is removed when navigation starts
        $('#app').html(this.loaderView.render().el);

        //TODO finish the spinner logic
        this.model.fetch().done(function () {

            Backbone.history.start();   // start using the router.
            //TODO decide later if we want always to load the initial page
            //app.router.navigate("", {trigger: true});
        });


    };


    //initialize the router and give a reference to it
    var initialize = function () {
        var appRouter = new AppRouter();
        return appRouter;
    };

    //expose the initialize method, so that app.js can call it
    return { initialize: initialize};
});



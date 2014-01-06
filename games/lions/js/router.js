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
    'views/rules/rules',
    'views/end/end',
    'model/rules',
    'model/game'


], function ($, _, Backbone, LoaderView, MenuView, GameView, SettingsView, AboutView, RulesView, EndView, RulesModel, GameModel) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "menu",
            "settings": "settings",
            "game": "game",
            "about": "about",
            "rules": "rules",
            "end": "end"
        },

        initialize: function () {
            this.loaderView = new LoaderView();

            //The model of the game, loaded from the server. Contains all settings. In the future may have a different model per user (personalized). Currently it comes from data/lionsGame.json
            //Contains also the game state and the win-loss results
            this.gameModel = new GameModel();


            this.rulesModel =new RulesModel();

            loadData.apply(this);

            this.menuView = new MenuView({model: this.gameModel});
            this.gameView = new GameView({model: this.gameModel});
            this.endView = new EndView({model: this.gameModel});

            this.settingsView = new SettingsView({model: this.gameModel});
            this.aboutView = new AboutView();
            this.rulesView = new RulesView({model: this.rulesModel});
        },


        menu: function () {
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
        },

        rules: function () {
            $('#app').html(this.rulesView.render().el);
        },
        end: function () {
            $('#app').html(this.endView.render().el);
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
        this.gameModel.fetch().done(function () {

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



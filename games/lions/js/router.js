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
    'views/menu/menu',
    'views/game/game',
    'views/settings/settings',
    'views/about/about',
    'model/game'

], function ($, _, Backbone, MenuView, GameView, SettingsView, AboutView, Game) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "menu",
            "settings": "settings",
            "game": "game",
            "about": "about"
        },

        initialize: function () {
            this.model = new Game();

            this.menuView = new MenuView({model: this.model});
            this.gameView = new GameView({model: this.model});
            this.settingsView = new SettingsView({model: this.model});
            this.aboutView = new AboutView({model: this.model});
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
        }

    });

    //initialize the router and give a reference to it
    var initialize = function () {
        var appRouter = new AppRouter();
        Backbone.history.start();
        return appRouter;
    };

    return { initialize: initialize};
});



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

            this.model = new Game();
            loadData.apply(this);

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

    /**
     * On page refresh this loading is re-executed and user is navigated to the initial page. Maybe change that
     */
    var loadData = function() {
        //add spinner
        $('#app').html(this.loaderView.render().el);

        this.model.fetch().done(function(){
            //load the initial page
            app.router.navigate("", {trigger: true});
        });


    };


    //initialize the router and give a reference to it
    var initialize = function () {
        var appRouter = new AppRouter();
        Backbone.history.start();
        return appRouter;
    };

    return { initialize: initialize};
});



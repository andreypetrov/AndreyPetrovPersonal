/**
 * Created with IntelliJ IDEA.
 * User: andrey
 * Date: 2013-09-14
 * Time: 5:33 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'views/archview',
    'hbs!views/menu/menuTemplate',
    'views/game/game'
], function ($, ArchView, template, GameView) {
    return ArchView.extend({
        gameView: {},
        containerEl: {},
        template: template,

        events: {
            "click .bulls-menu-start": "onStart",
            "click .bulls-menu-settings": "onSettings",
            "click .bulls-menu-about": "onAbout"
        },

        onStart: function () {
            app.router.navigate("game", {trigger: true});
            //this.eventAggregator.trigger("bulls:menu:start");
        },

        onSettings: function () {
            app.router.navigate("settings", {trigger: true});
        },

        onAbout: function () {
            app.router.navigate("about", {trigger: true});
        }

    });
});
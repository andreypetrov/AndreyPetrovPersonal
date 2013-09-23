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
            "click .bulls-menu-rules": "onRules",
            "click .bulls-menu-options": "onOptions",
            "click .bulls-menu-about": "onAbout"
        },

        initialize: function() {
            this.gameView = new GameView({model: this.model});
        },

        initDomHandles: function() {
            this.containerEl = this.$el.find(".bulls-container");
        },

        onStart: function() {
            this.eventAggregator.trigger("bulls:menu:start");
        },

        onRules: function() {
            this.eventAggregator.trigger("bulls:menu:rules");
        },

        onOptions: function() {
            this.eventAggregator.trigger("bulls:menu:options");
        },

        onAbout: function() {
            this.eventAggregator.trigger("bulls:menu:about");
        }

    });
});
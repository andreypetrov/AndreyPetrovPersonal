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
    'hbs!views/lionsTemplate',
    'views/model/gameCreator',
    'views/menu/menu',
    'views/game/game'
], function ($, ArchView, template, gameCreator, MenuView, GameView) {
    return ArchView.extend({

        containerEl: {},
        menuView: {},
        gameView: {},

        template: template,

        initialize: function () {
            this.menuView = new MenuView({model: this.model});
            this.gameView = new GameView({model: this.model});

            this.eventAggregator.on("bulls:menu:start", this.onStart, this);
            this.eventAggregator.on("bulls:menu:rules", this.onRules, this);
            this.eventAggregator.on("bulls:menu:options", this.onOptions, this);
            this.eventAggregator.on("bulls:menu:about", this.onAbout, this);

        },

        initDomHandles: function() {
            console.log(this.$el);
            this.containerEl = this.$el.find(".bulls-container");

        },

        render: function () {
            ArchView.prototype.render.apply(this);
            this.containerEl.html(this.menuView.render().el);
            return this;
        },

        onStart: function() {
            this.containerEl.html(this.gameView.render().el);
        },

        onRules: function() {
            this.containerEl.html("rules");
        },

        onOptions: function() {
            this.containerEl.html("options");
        },

        onAbout: function() {
            this.containerEl.html("about");
        }
    });
});
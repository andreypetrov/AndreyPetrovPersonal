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
    'hbs!views/end/endTemplate'
], function ($, ArchView, template) {
    return ArchView.extend({
        template: template,

        endMessageEl: {},

        events: {
            "click .back-button": "onBack",
            "click .new-game-button": "onNewGame"
        },

        render: function () {
            ArchView.prototype.render.apply(this); //super call
            this.renderEndMessage();
            return this;
        },

        initDomHandles: function () {
            this.endMessageEl = this.$el.find('.lion-end-message');
        },

        renderEndMessage: function () {
            if (this.model.get("attemptsCount") === 1) var message = "Wow! Did you dream last night about <div class=\"lion-end-correct\">" + this.model.get("correctNumber") + "</div> or what?! You guessed it in just <div class=\"lion-end-attempts\">1</div> attempt. A new number will be loaded. Wanna try again?";
            else var message = "Nicey-nice! The number really is <div class=\"lion-end-correct\">" + this.model.get("correctNumber") + "</div> and you guessed it in <div class=\"lion-end-attempts\">" + this.model.get("attemptsCount") + "</div> attempts! Want to try again?";
            this.endMessageEl.html(message);
        },
        //override

        onBack: function () {
            app.router.navigate("", true);
        },

        onNewGame: function() {
            app.router.navigate("game", {trigger: true});
        }
    });



});
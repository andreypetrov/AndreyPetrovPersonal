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
            "click .back-button": "onBack"
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
            if (this.model.get("attemptsCount") === 1) var message = "Wow! You guessed it in just one attempt. Did you dream last night about " + this.model.get("correctNumber") + " or what?! A new number will be loaded. Wanna try again?";
            else var message = "Nicey-nice! The number really is " + this.model.get("correctNumber") + " and you guessed it in " + this.model.get("attemptsCount") + " attempts! Wanna try again?";
            this.endMessageEl.html(message);
        },
        //override

        onBack: function () {
            app.router.navigate("", true);
            this.render();
        }
    });



});
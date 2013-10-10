/**
 * Created with IntelliJ IDEA.
 * User: andrey
 * Date: 2013-09-14
 * Time: 5:33 PM
 * TODO add to settings: no repetitions, leading zero, number of digits
 */
define([
    'jquery',
    'views/archview',
    'hbs!views/settings/settingsTemplate'
], function ($, ArchView, template) {
    return ArchView.extend({
        template: template,

        digitsCountEl: {},

        events: {
            "click #settings-repeating-digits": "onRepeatingDigitsToggle",
            "click #settings-leading-zeros": "onLeadingZeroesToggle",
            "keyup #settings-digits-count": "onDigitsCountChanged" ,
            "click .back-button": "onBack"
        },
        //override
        initDomHandles: function() {
            this.digitsCountEl = this.$el.find('#settings-digits-count');
        },

        onRepeatingDigitsToggle: function() {
            this.model.toggle("hasRepeatingDigits");
        },

        onLeadingZeroesToggle: function() {
            this.model.toggle("hasLeadingZeros");
        } ,

        onDigitsCountChanged: function(e) {
            this.model.set("digitsCount", parseInt(this.digitsCountEl.val().trim()));
        } ,

        onBack: function() {
            app.router.navigate("", true);
        }


    });
});
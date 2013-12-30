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
    'hbs!views/settings/settingsTemplate',
    'utils'
], function ($, ArchView, template, Utils) {
    return ArchView.extend({
        template: template,

        digitsCountEl: {},

        events: {
            "click .settings-repeating-digits": "onRepeatingDigitsToggle",
            "click .settings-leading-zeros": "onLeadingZeroesToggle",
            //"keyup #settings-digits-count": "onDigitsCountChanged",
            "click .back-button": "onBack",
            "click .digits-count-increment": "onDigitsCountIncremented",
            "click .digits-count-decrement": "onDigitsCountDecremented"

        },
        //override
        initDomHandles: function () {
            this.digitsCountEl = this.$el.find('#settings-digits-count');
        },

        onRepeatingDigitsToggle: function (e) {
            this.model.toggle("hasRepeatingDigits");
            Utils.toggleButton(e);
        },

        onLeadingZeroesToggle: function (e) {
            this.model.toggle("hasLeadingZeros");
            Utils.toggleButton(e);
        },

        onDigitsCountIncremented: function (e) {
            var digitsCount = this.model.get("digitsCount");
            digitsCount++;

            //if (digitsCount <= 10) {  //TODO make the model supply max allowable digit count. Or just transfer validation to model, it does not belong here!
                this.model.set({"digitsCount": digitsCount}, {validate: true});
                this.digitsCountEl.html(this.model.get("digitsCount"));
           // }

            console.log(this.model.get("digitsCount"));
        },

        onDigitsCountDecremented: function (e) {
            var digitsCount = this.model.get("digitsCount");
            digitsCount--;
            //if (digitsCount > 0) {  //TODO make the model supply min allowable digit count. Or just transfer validation to model, it does not belong here!
                this.model.set({"digitsCount": digitsCount}, {validate: true});
                this.digitsCountEl.html(this.model.get("digitsCount"));
           // }
            console.log(this.model.get("digitsCount"));
        },

        onBack: function () {
            app.router.navigate("", true);
            this.render();
        }


    });
});
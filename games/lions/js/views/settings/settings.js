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

        events: {
            "click #settings-repeating-digits": "onRepeatingDigitsToggle",
            "click #settings-leading-zeros": "onLeadingZeroesToggle",
            "keyup #settings-digits-count": "onDigitsCountChanged"
        },
        //override
        initDomHandles: function() {


            //checkBoxes.attr("checked", !checkBoxes.attr("checked"));
        },

        onRepeatingDigitsToggle: function() {
            console.log(this.model);
            this.model.toggle("hasRepeatingDigits", true)
        },

        onLeadingZeroesToggle: function() {
           console.log("leading");

        } ,

        onDigitsCountChanged: function() {
           console.log("digits changed");
        }
    });
});
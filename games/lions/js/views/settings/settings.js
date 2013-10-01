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

        //override
        initDomHandles: function() {

        }
    });
});
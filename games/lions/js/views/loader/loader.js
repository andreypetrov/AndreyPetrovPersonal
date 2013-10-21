/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-10-21
 * Time: 12:09 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'jquery',
    'views/archview',
    'hbs!views/loader/loaderTemplate'
], function ($, ArchView, template) {
    return ArchView.extend({
        template: template,

        //override
        initDomHandles: function() {

        }
    });
});
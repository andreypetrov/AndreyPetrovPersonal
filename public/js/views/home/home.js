/**
 * Created with IntelliJ IDEA.
 * User: andrey
 * Date: 2013-09-11
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'views/archview',
    'hbs!views/home/homeTemplate'
], function ($, ArchView, template) {
    return ArchView.extend({
        template: template
    });
});
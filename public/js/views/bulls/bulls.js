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
    'hbs!views/bulls/bullsTemplate'
], function ($, ArchView, template) {
    return ArchView.extend({
        template: template
    });
});
/**
 * Created with IntelliJ IDEA.
 * User: andrey
 * Date: 2013-09-11
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    return Backbone.View.extend({
        render: function () {
            this.$el.html("Test Home View");
            return this;
        }
    });
});
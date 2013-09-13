/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-09-12
 * Time: 6:32 PM
 * Parent to all views
 */

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    return Backbone.View.extend({
        template: "This is an archetemplate!",   //TODO make this dynamically defined in the views, to search in the directory of the view for the resources

        render: function () {
            this.$el.html(this.template);
            this.delegateEvents();//TODO test if it is ok without argument and it really attaches this.events by default
            return this;
        }

    });
});
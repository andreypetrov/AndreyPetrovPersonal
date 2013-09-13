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
], function ($, Backbone, template) {
    return Backbone.View.extend({

        render: function () {
            console.log(template);

            this.$el.html(template);
            this.delegateEvents();//TODO test if it is ok without argument and it really attaches this.events by default
            return this;
        }

    });
});
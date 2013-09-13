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
        template: {},
        collection: {},
        model: {},

        //Render template with collection or model, or empty
        render: function () {
            if (this.collection && this.collection.length > 0) this.$el.html(this.template(this.collection));
            else if(this.model) this.$el.html(this.template(this.model));
            else this.$el.html(this.template());

            this.delegateEvents();//TODO test if it is ok without argument and it really attaches this.events by default
            return this;
        }

    });
});
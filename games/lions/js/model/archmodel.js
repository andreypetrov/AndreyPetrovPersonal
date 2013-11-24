/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-10-01
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    return Backbone.Model.extend({

        toggle: function (attr, options) {
            options = options ? _.clone(options) : {}
            return this.set(attr, !this.get(attr), options);
        }


    });


});
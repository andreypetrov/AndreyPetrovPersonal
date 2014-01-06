/**
 * Created with IntelliJ IDEA.
 * User: andrey
 * Date: 2014-01-05
 * Time: 5:48 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'underscore',
    'backbone',
    'model/archmodel',
    'utils'
], function (_, Backbone, Archmodel, Utils) {
    var Rules = Archmodel.extend({
        initialize: function () {
            this.set("firstPage", 1);
            this.set("lastPage", 5);

            this.set("currentPage", 1);

        }

    });


    return Rules;
});
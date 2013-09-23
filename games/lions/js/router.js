/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-09-12
 * Time: 4:33 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    //bulls and cows
    'jquery',
    'underscore',
    'backbone',
    'views/lions',
    'views/model/gameCreator'

], function ($, _, Backbone ,
    BullsView,
    bullsGameCreator) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "home"
        },

        initialize: function () {
            this.bullsModel = bullsGameCreator();
        },

        home:function(){
            this.bullsView = new BullsView({model: this.bullsModel});
            $('#app').html(this.bullsView.render().el);
        }
    });

    //initialize the router and give a reference to it
    var initialize = function() {
        var appRouter = new AppRouter();
        Backbone.history.start();
        return appRouter;
    };

    return { initialize : initialize};
});



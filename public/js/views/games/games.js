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
    'hbs!views/games/gamesTemplate'
], function ($, ArchView, template) {
    return ArchView.extend({
        template: template,

        events: {
          "click .startButton": "onStart"
        },

        onStart: function() {
            window.app.router.navigate("/bulls", true);
        }
    });
});
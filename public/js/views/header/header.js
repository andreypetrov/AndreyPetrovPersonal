/**
 * Created with IntelliJ IDEA.
 * User: andrey
 * Date: 2013-09-14
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'backbone',
    'views/archview',
    'hbs!views/header/headerTemplate'
], function ($, Backbone, ArchView, template) {
    return ArchView.extend({
        navLinkElements: [],

        template: template,

        initDomHandles: function() {
            this.navLinkElements = this.$el.find('.app-nav').children();
        },

        /**
         * Change style of navbar.
         * This is called in the router on navigation, so that it is triggered even on page refresh, not only on clicks
         * @param navIndex
         */
        onNavigate: function(navIndex) {
            //remove class from all a elements. Depends on the fact that a element is first child of li
            $(this.navLinkElements).each(function(){
               $($(this).children()[0]).removeClass('app-nav-active');
            });

            //add class to the current a element. Depends on the fact that a element is first child of li
            $($(this.navLinkElements[navIndex]).children()[0]).addClass('app-nav-active');

        }
    });
});



var AppRouter = Backbone.Router.extend({
    routes: {
        "": "home"
    },

    initialize: function () {
        this.homeView = new HomeView();
        //this.infoView = new InfoView();
        //this.headerView = new HeaderView();
        //this.footerView = new FooterView();
    },

    renderHeader: function() {
        //$("#header").html(this.headerView.render().el);
    },

    renderFooter: function() {},

    preNavigate: function() {},

    postNavigate: function () {},

    home: function () {
        console.log("here");
        this.preNavigate();
        $('#app').html(this.homeView.render().el);
        this.postNavigate();
    }

});

var app = new AppRouter();


//The facebook app starts here!

$(function () {

    Backbone.history.start();
});
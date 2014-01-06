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
    'hbs!views/rules/rulesTemplate',
    'hbs!views/rules/rulesPage1',
    'hbs!views/rules/rulesPage2',
    'hbs!views/rules/rulesPage3',
    'hbs!views/rules/rulesPage4',
    'hbs!views/rules/rulesPage5'

], function ($, ArchView, template, rulesPage1, rulesPage2, rulesPage3, rulesPage4, rulesPage5) {
    return ArchView.extend({
        template: template,

        pageNumberEl: {},
        previousButtonEl: {},
        nextButtonEl: {},
        rulesPageContainerEl: {},

        events: {
            "click .lion-rules-btn-previous": "onPrevious",
            "click .lion-rules-btn-next": "onNext",
            "click .back-button": "onBack"
        },

        render: function () {
            ArchView.prototype.render.apply(this); //super call
            this.previousButtonEl.hide();
            this.loadCurrentPageContent();  //init the current page content
            return this;
        },

        //override
        initDomHandles: function () {
            this.rulesPageContainerEl = this.$el.find(".lion-rules-page-container");

            this.pageNumberEl = this.$el.find(".lion_rules_page_number");
            this.previousButtonEl = this.$el.find(".lion-rules-btn-previous");
            this.nextButtonEl = this.$el.find(".lion-rules-btn-next");
        },


        onPrevious: function () {
            if (this.model.get("currentPage") > this.model.get("firstPage")) {
                this.model.set("currentPage", this.model.get("currentPage") - 1); //decrement

                this.updatePageNumberElement();
                this.loadCurrentPageContent();
                this.nextButtonEl.show();

                //remove previous button if we just went to the first page
                if (this.model.get("currentPage") === this.model.get("firstPage")) {
                    this.previousButtonEl.hide();
                }
            }

        },

        onNext: function () {
            if (this.model.get("currentPage") < this.model.get("lastPage")) {
                this.model.set("currentPage", this.model.get("currentPage") + 1); //increment

                this.updatePageNumberElement();
                this.loadCurrentPageContent();
                this.previousButtonEl.show();

                //remove next button if we just went to the last page
                if (this.model.get("currentPage") === this.model.get("lastPage")) {
                    this.nextButtonEl.hide();
                }
            }

        },


        onBack: function () {
            app.router.navigate("", true);
        },


        updatePageNumberElement: function () {
            this.pageNumberEl.html(this.model.get("currentPage"));
        },

        loadCurrentPageContent: function () {
            var rulesCurrentPageTemplate;

            switch (this.model.get("currentPage")) {
                case 1:
                    rulesCurrentPageTemplate = rulesPage1();
                    break;
                case 2:
                    rulesCurrentPageTemplate = rulesPage2();
                    break;
                case 3:
                    rulesCurrentPageTemplate = rulesPage3();
                    break;
                case 4:
                    rulesCurrentPageTemplate = rulesPage4();
                    break;
                case 5:
                    rulesCurrentPageTemplate = rulesPage5();
                    break;
                default:
                    //do nothing
                    break;
            }

            this.rulesPageContainerEl.html(rulesCurrentPageTemplate);

        }

    });


});
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
    'hbs!views/game/gameTemplate',
    'hbs!views/game/messageTemplate'
], function ($, ArchView, template, messageTemplate) {
    return ArchView.extend({
        template: template,

        events: {
            "click .guess-button": "onGuess"
        },

        //Dom elements
        guessInputEl: 0,
        logEl: 0,
        inputErrorEl: 0,
        hiddenNumberEl: 0,

        logScrollPosition: 0,

        model: {},

        render: function () {
            ArchView.prototype.render.apply(this); //super call

            this.model.newGame(); //TODO instead of just starting a new game, figure out if we should really start a new game or continue an old game on the first render

            this.hiddenNumberEl.html(''); //reset if there were any dummy values
            for(var i = 0; i<this.model.get('digitsCount');i++) {//show as many X as there are digits in the hidden number
                this.hiddenNumberEl.append('X');
            }

            this.logScrollPosition = 0; //init log scroll position

            return this;
        },

        //override
        initDomHandles: function () {
            this.guessInputEl = this.$el.find('.guess-input');
            this.logEl = this.$el.find('.lion-game-guess-log');
            this.inputErrorEl = this.$el.find('.guess-input-error');
            this.hiddenNumberEl = this.$el.find('.lion-game-hidden-number');

        },


        onGuess: function (e) {
            e.preventDefault();
            var guessNumber = this.guessInputEl.val();
            this.guessInputEl.val('');   //reset input field

            var result = this.model.compareGuessWithOriginalNumber(guessNumber);
            console.log(result);
            if (result.error) this.renderErrorMessage(result.error.message);
            else {
                this.renderErrorMessage(""); //remove previous error message if there was one
                this.renderGuessResult(result);
                if (this.model.get("hasWon")) this.onWin(result);
            }

            this.guessInputEl.focus();
        },

        onWin: function (result) {
            this.renderWin();
            this.model.newGame(this.digitsCount);
        },


        //RENDER METHODS

        renderErrorMessage: function (message) {
            this.inputErrorEl.html(message);
        },


        /**
         * Render the fact the player have won by navigating to the end screen. Potentially there can be other options such as to render the win in the current screen
         */
        renderWin: function () {
            //Navigate to the end screen
            app.router.navigate("end", true);
        },


        /**
         * Render the result of the guess in the chat panel.
         * Render as a prefix the index of the attempt
         * @param result of the game guess in  {bulls:number, cows:number} format
         */
        renderGuessResult: function (result) {
            var templateWithContent = messageTemplate(result);
            this.logEl.append(templateWithContent);
            this.logScrollPosition += 100;
            $(this.logEl).scrollTop(this.logScrollPosition);
            //console.log(this.logEl.scrollHeight);

            //var logelement = document.getElementById(".lion-game-guess-log");
            //console.log(this.logEl);
            console.log(this.logEl.scrollTop());

        },


        /**
         * Render a message
         * @param status one of the standrad bootstrap emphasis classes: muted, primary, success, info, warning, danger. Changes the color of the message
         * @param prefix a string coming before the message
         * @param message
         */
        renderMessage: function (status, prefix, message) {
            var templateWithContent = messageTemplate({status: status, prefix: prefix, message: message});
            this.logEl.append(templateWithContent);
        }

    });
});
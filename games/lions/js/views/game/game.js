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

        model: {},

        render: function() {
            ArchView.prototype.render.apply(this); //super call

            this.model.newGame(); //TODO figure out if we should really start a new game or continue an old game on the first render
            return this;
        },

        //override
        initDomHandles: function() {
            this.guessInputEl = this.$el.find('.guess-input');
            this.logEl = this.$el.find('.guess-log');
            this.inputErrorEl = this.$el.find('.guess-input-error');
        },


        onGuess: function(e) {
            e.preventDefault();

            var guessNumber = this.guessInputEl.val();
            this.guessInputEl.val('');   //reset input field

            var result = this.model.compareGuessWithOriginalNumber(guessNumber);
            console.log(result);
            if(result.error) this.renderErrorMessage(result.error.message);
            else {
                this.renderErrorMessage(""); //remove previous error message if there was one
                this.renderGuessResult(result);
                if (this.model.get("hasWon")) this.onWin(result);
            }

            this.guessInputEl.focus();
        },

        onWin: function(result) {
            this.renderWin();
            this.model.newGame(this.digitsCount);
        },





        //RENDER METHODS

        renderErrorMessage: function (message) {
           this.inputErrorEl.html(message);
        },


        /**
         * Render the fact the player have won.
         */
        renderWin: function() {
            var prefix = "";

            if(this.model.get("attemptsCount") === 1) var message = "Wow! You guessed it in just one attempt. Did you dream last night about " +this.model.get("correctNumber") + " or what?! A new number will be loaded. Wanna try again?";
            else var message = "Nicey-nice! The number really is " + this.model.get("correctNumber") +" and you guessed it in " + this.model.get("attemptsCount") + " attempts! A new number will be loaded. Wanna try again?";

            this.renderMessage("success", prefix, message);
        },


        /**
         * Render the result of the guess in the chat panel.
         * Render as a prefix the index of the attempt
         * @param result of the game guess in  {bulls:number, cows:number} format
         */
        renderGuessResult: function(result) {
            var prefix = this.model.get("attemptsCount") + ": ";
            var message = "For " + result.guessNumber + " you got " + result.bulls + " bulls and " + result.cows + " cows";
            this.renderMessage("info", prefix, message);
        },


        /**
         * Render a message
         * @param status one of the standrad bootstrap emphasis classes: muted, primary, success, info, warning, danger. Changes the color of the message
         * @param prefix a string coming before the message
         * @param message
         */
        renderMessage: function(status, prefix, message) {
            var templateWithContent = messageTemplate({status: status, prefix: prefix, message: message});
            this.logEl.append(templateWithContent);
        }

    });
});
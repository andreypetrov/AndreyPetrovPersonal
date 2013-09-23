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
            "click .bulls-guess": "guess"
        },

        //Dom elements
        guessInputEl: 0,
        logEl: 0,
        inputErrorEl: 0,

        digitsCount: 4,

        model: {},

        render: function() {
            ArchView.prototype.render.apply(this); //super call

            this.model.newGame(this.digitsCount);
            return this;
        },

        //override
        initDomHandles: function() {
            this.guessInputEl = this.$el.find('.bulls-number');
            this.logEl = this.$el.find('.bulls-log');
            this.inputErrorEl = this.$el.find('.bulls-input-error');
        },


        guess: function(e) {
            e.preventDefault();

            var guessNumber = this.guessInputEl.val();
            this.guessInputEl.val('');   //reset input field

            console.log(this.guessInputEl);

            var result = this.model.compareGuessWithOriginalNumber(guessNumber);
            console.log(result);
            if(result.error) this.renderErrorMessage(result.error.message);
            else {
                this.renderErrorMessage("");
                if (result.bulls === this.digitsCount) this.win(result);
                else this.renderGuessResult(result);
            }
        },



        renderErrorMessage: function (message) {
           this.inputErrorEl.html(message);
        },

        win: function(result) {
            this.renderGuessResult(result);
            this.renderWin();
            this.model.newGame(this.digitsCount);
        },

        /**
         * Render the fact the player have won.
         */
        renderWin: function() {
            var prefix = "";

            if(this.model.attemptsCount === 1) var message = "Wow! You guessed it in just one attempt. Did you dream last night about " +this.model.correctNumber + " or what?! A new number will be loaded. Wanna try again?";
            else var message = "Nicey-nice! The number really is " + this.model.correctNumber +" and you guessed it in " + this.model.attemptsCount + " attempts! A new number will be loaded. Wanna try again?";

            this.renderMessage("success", prefix, message);
        },


        /**
         * Render the result of the guess in the chat panel.
         * Render as a prefix the index of the attempt
         * @param result of the game guess in  {bulls:number, cows:number} format
         */
        renderGuessResult: function(result) {
            var prefix = this.model.attemptsCount + ": ";
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
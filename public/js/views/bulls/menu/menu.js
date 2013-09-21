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
    'hbs!views/bulls/menu/menuTemplate',
    'gamelogic/bullsGameLogic'
], function ($, ArchView, template, gameLogic) {
    return ArchView.extend({
        template: template,

        events: {
            "click .bulls-guess": "guess"
        },

        guessInputEl: 0,

        initialize: function() {    //calls also the parent init
        },

        newGame: function() {
            console.log('old correct number was: ' + gameLogic.correctNumber);
            //gameLogic.setRandomCorrectNumberWithDigitsCount(4);
        },

        guess: function(e) {
            e.preventDefault();
            if (!this.guessInputEl) this.guessInputEl = this.$el.find('#bulls-number');

            if(!gameLogic.correctNumber) gameLogic.setRandomCorrectNumberWithDigitsCount(4);


            var guessNumber = this.guessInputEl.val();
            this.guessInputEl.val('');   //reset input field


            var result = gameLogic.compareGuessWithOriginalNumber(guessNumber);

            if(result.error) this.renderErrorMessage(result.error);
            else if (result.bulls === 4) this.win();
            else this.renderGuessResult();

        },

        renderErrorMessage: function (error) {
           console.log(error.message);
        },

        win: function() {
            console.log('you win!!');
        },

        renderGuessResult: function() {
            console.log('ok guess')
        }
    });
});
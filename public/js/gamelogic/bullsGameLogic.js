define([], function () {
    return {
        correctNumber: 0,
        correctDigitsCount: 0,

        setRandomCorrectNumberWithDigitsCount: function(digitsCount) {
            this.correctDigitsCount = digitsCount;

            var smallMultiplier = Math.pow(10, digitsCount);
            var bigMultiplier = 9 * smallMultiplier;
            this.correctNumber = Math.floor(Math.random()*bigMultiplier) + smallMultiplier; // http://stackoverflow.com/questions/2175512/javascript-expression-to-generate-a-5-digit-number-in-every-case
        },


        setCorrectNumber: function (correctNumber) {
            this.correctNumber = correctNumber;
            this.correctDigitsCount = this.correctNumber.toString().length;
        },


        /**
         * Return an object with the number of bulls and cows in it or with an error if the input is not valid
         * @param guessNumber
         */
        compareGuessWithOriginalNumber: function(guessNumber) {
            if(!this.correctNumber) throw 'correctNumber cannot be 0 or uninitialized';
            var guessDigitsCount = guessNumber.toString().length;


            if(isNaN(guessNumber)) return {error:{code:0, message: "Not a valid number, use digits only please"}};
            if(guessDigitsCount < this.correctDigitsCount) return {error: {code: 1, message: "Not enough digits in your number"}};
            if(guessDigitsCount > this.correctDigitsCount) return {error: {code: 2, message: "Too many digits in your number"}};

            var bulls = 0;
            var cows = 0;

            //count the digits and compare
            return {bulls: bulls, cows: cows};

        }
    };
});
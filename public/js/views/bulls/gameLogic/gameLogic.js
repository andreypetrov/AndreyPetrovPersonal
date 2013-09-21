define([], function () {
    return {
        //TODO make this a model class maybe because the state needs to be shared by different views - game, setting, etc.
        //TODO should i disallow repeating numbers? probably it should be a setting
        //Settings: no repetitions, leading zero, number of digits


        //game state
        correctNumber: 0,
        correctDigitsCount: 0,
        attemptsCount: 0,

        defaultDigitsCount:4,

        /**
         * Initialize the correct number
         * This method needs to be called before the guess method
         * @param digitsCount
         */
        newGame: function (digitsCount) {
            {
                this.setRandomCorrectNumberWithDigitsCount(digitsCount);
                this.attemptsCount = 0;
            }
        },


        /**
         * Create a random number with digitsCount number of digits in it. can not start with 0
         * @param digitsCount
         */
        setRandomCorrectNumberWithDigitsCount: function (digitsCount) {
            if(!digitsCount || isNaN(digitsCount)) throw "Please pass in valid digits count parameter";

            this.correctDigitsCount = digitsCount;

            var smallMultiplier = Math.pow(10, digitsCount - 1);
            var bigMultiplier = 9 * smallMultiplier;
            this.correctNumber = Math.floor(Math.random() * bigMultiplier) + smallMultiplier; // http://stackoverflow.com/questions/2175512/javascript-expression-to-generate-a-5-digit-number-in-every-case
            console.log(this.correctNumber);
        },


        setCorrectNumber: function (correctNumber) {
            this.correctNumber = correctNumber;
            this.correctDigitsCount = this.correctNumber.toString().length;
        },


        /**
         * Return an object with the number of bulls and cows in it or with an error if the input is not valid
         * @param guessNumber a string representing the entered number, e.g. "0156"
         */
        compareGuessWithOriginalNumber: function (guessNumber) {
            if (!this.correctNumber) throw 'correctNumber cannot be 0 or uninitialized. Please first call newGame or setCorrectNumber';


            var error = this.validateGuessNumber(guessNumber);
            if (error.code !== 0) return {error: error};


            console.log(guessNumber);


            this.attemptsCount++;
            var bulls = this.getBullsCount(guessNumber, this.correctNumber); //could be optimized not to count cows if we have bulls === digitsCount
            var cowsAndBulls = this.getCowsAndBullsCount(guessNumber, this.correctNumber);
            var cows = cowsAndBulls - bulls;
            return {bulls: bulls, cows: cows};
        },


        getBullsCount: function (guessNumber, correctNumber) {
            var bulls = 0;
            //convert to strings if they are not already strings, for easier digit comparison
            var guess = guessNumber.toString();
            var correct = correctNumber.toString();
            if (guess.length !== correct.length) throw 'Compared numbers should have the same digits count';

            for (var i = 0; i < guess.length; i++) if (guess.charAt(i) === correct.charAt(i)) bulls++;

            return bulls;
        },

        /**
         * Count the total matching digits disregarding digit position.
         * @param guessNumber
         * @param correctNumber
         * @returns {number}
         */
        getCowsAndBullsCount: function (guessNumber, correctNumber) {
            var cowsAndBulls = 0;
            var guess = guessNumber.toString();
            var correct = correctNumber.toString();
            if (guess.length !== correct.length) throw 'Compared numbers should have the same digits count';


            //create hash-maps with the count of every digit type from 0 to 9 in the passed in numbers

            var guessCounts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0};
            var correctCounts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0};

            for (var i = 0; i < guess.length; i++)   guessCounts[guess.charAt(i)]++;
            for (var i = 0; i < correct.length; i++) correctCounts[correct.charAt(i)]++;

            //compare for every digit 0 to 9 and accumulate the total matches
            for (var i = 0; i < 10; i ++) cowsAndBulls += Math.min(guessCounts[i], correctCounts[i]);

            return cowsAndBulls;
        },


        /**
         * Validate the input and return an error if there is one.
         * code === 0, means no error
         * @param guessNumber
         * @returns {{error: {code: number, message: string}}}
         */
        validateGuessNumber: function (guessNumber) {

            if (isNaN(guessNumber)) return {code: 1, message: "Your number should include digits only"};


            if (guessNumber.charAt(0) === '0') return {code: 2, message: "Your number cannot start with zero"};

            var digitsCount = guessNumber.length;

            //convert to integer and then back to string and compare the number of digits. This assures there is no input such as "1.23"
            var actualGuessNumber = parseInt(guessNumber, 10);
            var actualDigitsCount = actualGuessNumber.toString().length;
            if (digitsCount !== actualDigitsCount) return {code: 3, message: "Your number must be an integer with digits only"};
            if (digitsCount < this.correctDigitsCount) return {code: 4, message: "Not enough digits in your number. It should have " + this.correctDigitsCount + " digits"};
            if (digitsCount > this.correctDigitsCount) return {code: 5, message: "Too many digits in your number. It should have " + this.correctDigitsCount + " digits only"};

            return {code: 0, message: "no error"};
        }
    };
});
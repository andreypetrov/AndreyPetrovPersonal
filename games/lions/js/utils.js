/**
 * Created with IntelliJ IDEA.
 * User: Andrey
 * Date: 2013-10-04
 * Time: 3:04 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'underscore',
    'backbone'
], function () {
    var getRandomDigit = function () {
        return Math.floor(Math.random() * 10);
    }

    //TODO make only one method with parameters. Essentially choose first digit from 1 to 9 and all other digits from 0 to 9.
    //And the same without repetitions but shrinking the selection pool after every selection

    /**
     * Get a random number with a certain digits count. It can be set up to contain leading zeroes and repetitions
     * @param digitsCount
     * @param hasLeadingZeros
     * @param hasRepetitions
     * @returns {string} the number as a string
     */
    var getRandomNumber = function (digitsCount, hasLeadingZeros, hasRepetitions) {
        if (digitsCount < 1 || digitsCount > 10) throw new Error("digitsCount can be only from 1 to 10");
        var result = "";
        var digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        for (var i = 0; i < digitsCount; i++){
            console.log(digits);
            result+=getDigitAtPosition(i, digits, digits.length, hasLeadingZeros, hasRepetitions);

        }
        console.log(result);
        return result;
    };


    /**
     * Private helper to get the next random number from the digits array
     * @param i
     * @param digits
     * @param length
     * @param hasLeadingZeros
     * @param hasRepetitions
     * @returns {*}
     */
    var getDigitAtPosition = function (i, digits, length, hasLeadingZeros, hasRepetitions) {
        var result;
        if (i === 0 && !hasLeadingZeros) {
            var position = getRandomNumberInInterval(0, length-2);   //digits[length-1] is the 0 and we want to exclude it
        } else if (!hasRepetitions) {
            var position = getRandomNumberInInterval(0, length-1-i); //don't take from the last i elements, because our pool of numbers gets smaller after every selection
        } else {
            var position = getRandomNumberInInterval(0, length-1);
        }

        result = digits[position];

        //we put the last number in the shrank pool in place of the current,
        //so on next selection the selected will not participate again.
        if(!hasRepetitions) digits[position] = digits[length-1-i];

        return result;
    }




    //string number with repetitions and with leading zeroes.
    var getRandomNumber = function (digitsCount) {
        var result = "";
        for (var i = 0; i < digitsCount; i++) {
            result += getRandomNumberInInterval(0, 9);//add a digit to the string
        }
        return result;
    }


    //get random number in interval
    var getRandomNumberInInterval = function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    /**
     * Expose the getRandomNumber method in the Utils object
     */
    return {getRandomNumber: getRandomNumber};

});

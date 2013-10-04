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
],function() {
    var getRandomDigit = function() {
        return Math.floor(Math.random()*10);
    }

    //TODO make only one method with parameters. Essentially choose first digit from 1 to 9 and all other digits from 0 to 9.
    //And the same without repetitions but shrinking the selection pool after every selection


    //string number with repetitions and with leading zeroes.
    var getRandomNumber = function(digitsCount) {
        var result = "";
        for (var i = 0; i< digitsCount; i++) {
            result += getRandomNumberInInterval(0,9);//add a digit to the string
        }
        return result;
    }


    //get a number without repetitions and with leading zero
    var getRandomNumberWithoutRepetitions = function(digitsCount) {
        if(digitsCount>10) return;
        //get the first digitsCount digits from the shuffled array
        var result = "";
        var shuffledDigits = shuffledDigitsArray();
        for (var i = 0; i< digitsCount; i++) {
            result += shuffledDigits[i];
        }
        return result;
    };


    //with repetitions and no leading zeroes
    var getNumberWithDigitsCount = function (digitsCount) { //TODO generate number differently if it cannot have repeating numbers or if it can have leading zeroes
        if (!digitsCount || isNaN(digitsCount)) throw "Please pass in valid digits count parameter";
        var smallMultiplier = Math.pow(10, digitsCount - 1);
        var bigMultiplier = 9 * smallMultiplier;
        return Math.floor(Math.random() * bigMultiplier) + smallMultiplier; // http://stackoverflow.com/questions/2175512/javascript-expression-to-generate-a-5-digit-number-in-every-case

    };

    //with repeti




    var shuffledDigitsArray = function() {
        var digits = [0,1,2,3,4,5,6,7,8,9];
        return shuffle(digits);
    }

    // http://bost.ocks.org/mike/shuffle/
    var shuffle = function (array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m);

            m--;

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    //get random number in interval
    var getRandomNumberInInterval = function(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1)) ;
    }


    return {getRandomDigit: getRandomDigit, getRandomNumberInInterval: getRandomNumberInInterval};

});

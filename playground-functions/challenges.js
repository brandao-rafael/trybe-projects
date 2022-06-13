// Desafio 1
function compareTrue(a, b) {
    if (a === true && b === true) {
        return true;
    }
    return false;
}

// Desafio 2
function calcArea(base, height) {
    let result = (base * height) / 2;
    return result;
}

// Desafio 3
function splitSentence(param) {
    let result;
    result = param.split(' ', param.length);
    return result;
}

// Desafio 4
function concatName(param) {
    let result = `${param[param.length - 1]}, ${param[0]}`;
    return result;
}

// Desafio 5
function footballPoints(wins, ties) {
    let winsPoints = wins * 3;
    let results = winsPoints + ties;
    return results;
}

// Desafio 6
function highestCount(param) {
    let counter = 0;
    let number = Math.max.apply(null, param);
    for (let i = 0; i < param.length; i += 1) {
        if (param[i] === number) {
            counter += 1;
        }
    }
    return counter;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
    let cat1Distance = cat1 - mouse;
    let cat2Distance = cat2 - mouse;
    if (cat1Distance < 0) {
        cat1Distance *= -1;
    }
    if (cat2Distance < 0) {
        cat2Distance *= -1;
    }
    if (cat1Distance === cat2Distance) {
        return 'os gatos trombam e o rato foge';
    } if (cat1Distance > cat2Distance) {
        return 'cat2';
    }
    return 'cat1';
}

// Desafio 8
function fizzBuzz(param) {
    let results = [];
    for (let i = 0; i < param.length; i += 1) {
        if (param[i] % 3 === 0 && param[i] % 5 === 0) {
            results.push('fizzBuzz');
        } else if (param[i] % 3 === 0) {
            results.push('fizz');
        } else if (param[i] % 5 === 0) {
            results.push('buzz');
        } else {
            results.push('bug!');
        }
    }
    return results;
}

// Desafio 9
function encode(param) {
    let word = param.replaceAll('a', '1');
    word = word.replaceAll('e', '2');
    word = word.replaceAll('i', '3');
    word = word.replaceAll('o', '4');
    word = word.replaceAll('u', '5');
    return word;
}
function decode(param) {
    let word = param.replaceAll('1', 'a');
    word = word.replaceAll('2', 'e');
    word = word.replaceAll('3', 'i');
    word = word.replaceAll('4', 'o');
    word = word.replaceAll('5', 'u');
    return word;
}

// Desafio 10
function techList(techPar, namePar) {
    let tech = techPar.sort();
    if (techPar.length === 0) {
        return 'Vazio!';
    }
    let result = [];
    for (let i = 0; i < tech.length; i += 1) {
        let temp = {
            tech: tech[i],
            name: namePar,
        };
        result.push(temp);
    }
    return result;
}
// console.log(techList(['React', 'Jest', 'HTML', 'CSS', 'JavaScript'], 'Lucas'));

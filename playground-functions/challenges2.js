// Desafio 11
function generatePhoneNumber(n) {
    let ddd = `(${n[0]}${n[1]})`;
    let counter = {};
    n.forEach(function (x) { counter[x] = (counter[x] || 0) + 1; });
    for (const key in counter) {
        if (counter[key] >= 3) {
            return 'não é possível gerar um número de telefone com esses valores';
        }
    }
    if (n.length != 11) {
        return 'Array com tamanho incorreto.';
    }
    for (let i = 0; i < n.length; i++) {
        if (n[i] > 9 || n[i] < 0) {
            return 'não é possível gerar um número de telefone com esses valores';
        }
    }
    return `${ddd} ${n[2]}${n[3]}${n[4]}${n[5]}${n[6]}-${n[7]}${n[8]}${n[9]}${n[10]}`;
}

// Desafio 12
// eslint-disable-next-line complexity
function triangleCheck(lineA, lineB, lineC) {
    let absoluteA = Math.abs(lineB - lineC);
    let absoluteB = Math.abs(lineA - lineC);
    let absoluteC = Math.abs(lineB - lineA)
    if (lineA >= lineB + lineC || lineB >= lineA + lineB || lineC >= lineA + lineB) {
        return false;
    } if (lineA < absoluteA || lineB < absoluteB || lineC < absoluteC) {
        return false;
    }
    return true;
}

// Desafio 13
function hydrate(param) {
    let regex = /\d+/g;
    let numbersArray = param.match(regex);
    let sum = 0;
    for (let i = 0; i < numbersArray.length; i += 1) {
        numbertemp = parseInt(numbersArray[i]);
        sum += numbertemp;
    }
    if (sum === 1) {
        return `${sum} copo de água`;
    }
    return `${sum} copos de água`;
}

const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, _age) {
  let matchAnimal = {};
  data.species.forEach((i) => {
    if (i.name === animal) matchAnimal = i;
  });
  return matchAnimal.residents.every((j) => j.age >= _age);
}

module.exports = getAnimalsOlderThan;

const data = require('../data/zoo_data');

const { species } = data;

function countAnimals(animals) {
  const allAnimals = {};
  if (!animals) {
    species.forEach((animal) => {
      allAnimals[animal.name] = animal.residents.length;
    });
    return allAnimals;
  }
  let animalsCountBySex = {};
  if (animals.sex) {
    animalsCountBySex = species.find((animal) => animal.name === animals.specie)
      .residents.filter((specie) => specie.sex === animals.sex).length;
    return animalsCountBySex;
  }
  if (!animals.sex) {
    return species.find((animal) => animal.name === animals.specie).residents.length;
  }
}

module.exports = countAnimals;

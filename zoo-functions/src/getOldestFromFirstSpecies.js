const data = require('../data/zoo_data');

const { employees, species } = data;

function getOldestFromFirstSpecies(ids) {
  const animalId = employees.filter(({ id }) => ids.includes(id))
    .find((specie) => specie).responsibleFor[0];
  const animalObject = species.filter(({ id }) => animalId.includes(id))[0]
    .residents.reduce((acc, actual) => ((acc.age > actual.age) ? acc : actual));
  const { name, sex, age } = animalObject;
  const final = [name, sex, age];
  return final;
}
getOldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1');

module.exports = getOldestFromFirstSpecies;

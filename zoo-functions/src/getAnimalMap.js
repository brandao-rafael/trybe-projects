const data = require('../data/zoo_data');

const { species } = data;

const order = (sort = 0) => species.reduce((acc, specie) => ({ ...acc,
  [specie.location]: species.map((el) => {
    if (el.location !== specie.location) return null;
    if (sort.sex) {
      return { [el.name]: el.residents.filter((element) => element.sex === sort.sex)
        .map((el4) => el4.name).sort() };
    }
    return { [el.name]: el.residents.map((el2) => el2.name).sort() };
  }).filter((elements) => elements !== null),
}), {});

const includesNameSearch = (arg = 0) => species.reduce((acc, specie) => ({ ...acc,
  [specie.location]: species.map((el) => {
    if (el.location !== specie.location) return null;
    if (arg.sex) {
      return { [el.name]: el.residents.filter((element) => element.sex === arg.sex)
        .map((el4) => el4.name) };
    }
    return { [el.name]: el.residents.map((el2) => el2.name) };
  }).filter((element) => element !== null),
}), {});

const namesByLocation = species.reduce((acc, specie) => ({ ...acc,
  [specie.location]: species.map((el) => {
    if (el.location === specie.location) {
      return el.name;
    }
    return null;
  }).filter((element) => element !== null),
}), {});

function getAnimalMap(options = 0) {
  if (!options.includeNames) {
    return namesByLocation;
  }
  if (options.sorted) {
    return order(options);
  }
  return includesNameSearch(options);
}

module.exports = getAnimalMap;

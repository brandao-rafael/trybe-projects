const data = require('../data/zoo_data');

const { adult, senior, child } = data.prices;

function countEntrants(...entrants) {
  const visitors = {
    adult: 0,
    child: 0,
    senior: 0,
  };
  entrants[0].forEach((entrant) => { // reduce acc.child
    if (entrant.age < 18) visitors.child += 1;
    if (entrant.age >= 50) visitors.senior += 1;
    if (entrant.age < 50 && entrant.age >= 18) visitors.adult += 1;
  });
  return visitors;
}

function calculateEntry(entrants = 0) {
  if (!entrants.length || entrants === 0) {
    return 0;
  }
  const entries = countEntrants(entrants);
  const total = (entries.adult * adult) + (entries.child * child) + (entries.senior * senior);
  return total;
}

module.exports = { calculateEntry, countEntrants };

const data = require('../data/zoo_data');

const { species, hours } = data;
const operationDays = {
  Tuesday: {
    officeHour: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close}pm`,
    exhibition: species.filter((specie) => specie.availability
      .includes('Tuesday')).map((a) => a.name),
  },
  Wednesday: {
    officeHour: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close}pm`,
    exhibition: species.filter((specie) => specie.availability
      .includes('Wednesday')).map((a) => a.name),
  },
  Thursday: {
    officeHour: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close}pm`,
    exhibition: species.filter((specie) => specie.availability
      .includes('Thursday')).map((a) => a.name),
  },
  Friday: {
    officeHour: `Open from ${hours.Friday.open}am until ${hours.Friday.close}pm`,
    exhibition: species.filter((specie) => specie.availability
      .includes('Friday')).map((a) => a.name),
  },
  Saturday: {
    officeHour: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close}pm`,
    exhibition: species.filter((specie) => specie.availability
      .includes('Saturday')).map((a) => a.name),
  },
  Sunday: {
    officeHour: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close}pm`,
    exhibition: species.filter((specie) => specie.availability
      .includes('Sunday')).map((a) => a.name),
  },
  Monday: {
    officeHour: 'CLOSED',
    exhibition: 'The zoo will be closed!',
  },
};

const animals = species.map((specie) => specie.name);

function getSchedule(scheduleTarget) {
  if (Object.keys(operationDays).includes(scheduleTarget)) {
    return {
      [scheduleTarget]: operationDays[scheduleTarget],
    };
  }

  if (animals.includes(scheduleTarget)) {
    return species.find((specie) => scheduleTarget === specie.name).availability;
  }
  return operationDays;
}

module.exports = getSchedule;

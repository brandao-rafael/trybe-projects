const data = require('../data/zoo_data');

function isManager(id) {
  return data.employees.some((i) => i.managers.includes(id));
}

function getRelatedEmployees(managerId) {
  if (isManager(managerId)) {
    return data.employees.filter((i) => i
      .managers.includes(managerId))
      .map((person) => `${person.firstName} ${person.lastName}`);
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

module.exports = { isManager, getRelatedEmployees };

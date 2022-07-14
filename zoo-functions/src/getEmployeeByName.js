const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((name) => {
    if (name.firstName.includes(employeeName) || name.lastName.includes(employeeName)) return true;
    return false;
  });
}

module.exports = getEmployeeByName;

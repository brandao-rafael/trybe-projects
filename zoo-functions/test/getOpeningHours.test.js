const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('Verifica se getOpeningHours é uma função', () => {
    expect(typeof getOpeningHours).toBe('function');
  });
  it('Verifica se ao não passar parametro a função retorna um objeto com todos os dias e horarios de funcionamento', () => {
    const returning = {
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    };
    expect(getOpeningHours()).toEqual(returning);
  });
  it('Verifica se ao passar um dia e um horario a função retorna se o zoologico esta aberto ou fechado', () => {
    expect(getOpeningHours('Monday', '09:00-AM')).toBe('The zoo is closed');
    expect(getOpeningHours('Tuesday', '09:00-AM')).toBe('The zoo is open');
    expect(getOpeningHours('wednesday', '09:00-PM')).toBe('The zoo is closed');
  });
  it('Verifica se passando parametros invalidos retorna um erro', () => {
    expect(() => getOpeningHours('Monday', '12:ae-AM')).toThrow('The minutes should represent a number');
    expect(() => getOpeningHours('123', '09:00-AM')).toThrow('The day must be valid. Example: Monday');
    expect(() => getOpeningHours('Monday', '09:00-Ante Meridiem')).toThrow('The abbreviation must be \'AM\' or \'PM\'');
    expect(() => getOpeningHours('Sunday', '15:00-PM')).toThrow('The hour must be between 0 and 12');
    expect(() => getOpeningHours('Tuesday', '09:78-AM')).toThrow('The minutes must be between 0 and 59');
  });
});

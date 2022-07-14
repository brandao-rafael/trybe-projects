const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('recebendo count como parametro retorna o munero de elefantes', () => {
    expect(handlerElephants('count')).toBe(4);
  });
  it('recebendo names como parametro retorna o nome dos elefantes', () => {
    expect(handlerElephants('names')).toEqual(['Ilana', 'Orval', 'Bea', 'Jefferson']);
  });
  it('recebendo averageAge como parametro retorna a media de idade dos elefantes', () => {
    expect(handlerElephants('averageAge')).toBeCloseTo(10.5);
  });
  it('recebendo location como parametro retorna a localização dos elefantes no zoologico', () => {
    expect(handlerElephants('location')).toBe('NW');
  });
  it('recebendo popularity como parametro retorna a popularidade dos elefantes', () => {
    expect(handlerElephants('popularity')).toBe(5);
  });
  it('recebendo availability como parametro retorna os dias da semanas que os elefantes estão disponiveis para visita', () => {
    expect(handlerElephants('availability')).toContain('Friday', 'Saturday', 'Sunday', 'Tuesday');
  });
  it('não recebendo nenhum parametro retorna undefined', () => {
    expect(handlerElephants()).toBeUndefined();
  });
  it('recebendo um parametro diferente de string retorna invalido', () => {
    expect(handlerElephants(1)).toBe('Parâmetro inválido, é necessário uma string');
    expect(handlerElephants(true)).toBe('Parâmetro inválido, é necessário uma string');
  });
  it('recebendo uma palavra que não faz parte das condições retorna null', () => {
    expect(handlerElephants('banana')).toBeNull();
  });
});

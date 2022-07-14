const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifica se getSavedCartItems é uma função', () => {
    expect.assertions(1);
    expect(typeof getSavedCartItems).toBe('function')
  });
  it('Verifica se ao executar getSavedCartItems o metodo localstorage.getItem é chamado', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Verifica se ao executar getSavedCartItems o metodo localstorage é chamado com o parametro cartItems', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});

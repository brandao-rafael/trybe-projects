const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it("Verifica se saveCartItems é uma função", () => {
    expect.assertions(1);
    expect(typeof saveCartItems).toBe('function');
  });
  it('Verifica se ao chamar a função com <ol><li>Item</li></ol> localstorage.set item é chamado', () =>{
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('verifica se ao chamar a função saveCartItems passando um argumento o setItem é chamado com dois argumentos', () => {
    expect.assertions(1);
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>')
  })
});

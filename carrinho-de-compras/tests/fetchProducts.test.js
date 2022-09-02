require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('Verifica se a ao chamar fetchProducts a requisição é feita', async () => {
    expect.assertions(2);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();

    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url)
  });

  it('Verifica se passado computador como paramêtro a função retorna o objeto correto', async () => {
    expect.assertions(1);
    const returned = await fetchProducts('computador');
    expect(returned).toEqual(computadorSearch);
  });

  it('Verifica se sem paramêtro a função retorna um erro', async () => {
    expect.assertions(1);
    const response = await fetchProducts();
    const result = new Error('You must provide an url');
    expect(response).toEqual(result);
  })
});

require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se ao passar um argumento o fetch será chamado', async () => {
    expect.assertions(2);
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();

    const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Verifica se ao passar um argumento a função retorna o esperado', async () => {
    expect.assertions(1);
    const expected = await fetchItem("MLB1615760527");
    expect(expected).toBe(item);
  });
  it('Verifica se ao chamar a função sem argumentos ela rtorna um erro', async () => {
    expect.assertions(1);
    const notArgs = await fetchItem();
    const erro = new Error('You must provide an url');
    expect(notArgs).toEqual(erro);
  })
});

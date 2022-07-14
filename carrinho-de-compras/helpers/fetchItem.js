const fetchItem = async (endpoint) => {
  const url = `https://api.mercadolibre.com/items/${endpoint}`;
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

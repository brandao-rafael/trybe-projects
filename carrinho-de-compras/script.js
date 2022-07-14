const ol = document.querySelector('.cart__items');
const modalBody = document.querySelector('.modal-body');
// Função para criar a imagem do produto
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};
// Função para customizar os elementos retornado da API
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};
// Função para criar os elementos criados pela API
const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  const parentSection = document.querySelector('.items');
  
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  parentSection.appendChild(section);

  return section;
};
// Função para pegar o id do item
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;
// Função para salvar o valor no localStorage
let priceArray = [];
const saveStoragePrice = (salePrice) => {
  priceArray.push(salePrice);
  const sumPrice = priceArray.reduce((acc, value) => acc + value);
  localStorage.setItem('Price', Math.round((sumPrice + Number.EPSILON) * 100) / 100);
};
// Função para pegar os valores do localStorage
const removeStoragePrice = (salePrice) => {
  const oldValue = localStorage.getItem('Price');
  const removedPrice = parseFloat(oldValue) - salePrice;
  const formatedPrice = Math.round((removedPrice + Number.EPSILON) * 100) / 100;
  priceArray = [formatedPrice];
  localStorage.setItem('Price', formatedPrice);
};
// Função para adicionar o valor total ao subtotal
const span = document.createElement('span');
const generateTotalValue = () => {
  const cartValue = localStorage.getItem('Price');
  const subtotal = document.getElementById('subtotal');
  span.className = 'total-price';
  span.innerHTML = `${cartValue}`;
  subtotal.appendChild(span);
};
// Função para salvar o html dos itens adicionados ao carrinho no localStorage
const saveItemInStorage = () => {
  saveCartItems(ol.innerHTML);
};
// Função para remover os itens do carrinho
const cartItemClickListener = (event) => {
  event.target.remove();
  saveItemInStorage();
};
// Função para criar os elementos que irão para o carrinho
const widths = [0, 650];
const createCartItemElement = ({ sku2, name, salePrice }) => { 
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku2} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (e) => {
    cartItemClickListener(e);
    removeStoragePrice(salePrice);
    generateTotalValue();
  });
  ol.appendChild(li);
  saveStoragePrice(salePrice);
// verifica o tamanho da tela e adiciona os items no modal
  if (window.innerWidth >= widths[0] && window.innerWidth < widths[1]) {
    const cart = document.querySelector('.cart');
    modalBody.appendChild(cart);
    cart.style.display = 'flex';
  }
  return li;
};
// Função para gerar os dados dos itens que vão pro carrinho
const generateDataForCart = (sku) => {
  fetchItem(sku)
    .then((response) => {
      const { id: sku2, title: name, price: salePrice } = response;
      const objToCart = {
        sku2,
        name,
        salePrice,
      };
      createCartItemElement(objToCart);
      saveItemInStorage();
      generateTotalValue();
    });
};
// Função para adicionar os itens ao carrinho
const createEventForAdd = () => {
  document.querySelectorAll('.item__add').forEach((element) => element
  .addEventListener('click', () => {
    generateDataForCart(getSkuFromProductItem(element.parentNode));
  }));
};
// Função para criar o texto 'carregando...' enquanto aguarda o retorno da API
const createLoadingText = () => {
  const itemSection = document.querySelector('.items');
  const p = document.createElement('p');
  p.innerText = 'carregando...';
  p.className = 'loading';
  itemSection.appendChild(p);
};
// Função para remover o texto 'carregando...' quando a API retornar os dados
const removeLoadingText = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};
// Função para tratar os dados da API
const generateData = () => {
  createLoadingText();
  fetchProducts('computador')
    .then((response) => response.results)
    .then((result) => result.forEach((item, i, array) => {
      const { id: sku, title: name, thumbnail: image } = item;
      const objToSend = {
        sku,
        name,
        image,
      };
      createProductItemElement(objToSend);
      if (i === array.length - 1) {
        createEventForAdd();
        removeLoadingText();
      }
    }));
};
// Função para pegar os dados dos elementos no localStorage
const getDataFromLocalStorage = () => {
  const savedCart = getSavedCartItems();
  if (savedCart) {
    ol.innerHTML = savedCart;
    const products = document.querySelectorAll('.cart__items');
    products.forEach((item) => {
      item.addEventListener('click', cartItemClickListener);
    });
  }
};
// Função para limpar os dados do localStorage
const clearDataFromStorage = () => {
  localStorage.removeItem('cartItems');
  localStorage.setItem('Price', 0);
  priceArray.splice(0, priceArray.length);
};
// Função para limpar o carrinho de compras
const clearCart = () => {
  const emptyBtn = document.querySelector('.empty-cart');
  emptyBtn.addEventListener('click', () => {
    ol.innerHTML = '';
    clearDataFromStorage();
    generateTotalValue();
  });
};

window.onload = () => { 
  generateData();
  getDataFromLocalStorage();
  clearCart();
  generateTotalValue();
};

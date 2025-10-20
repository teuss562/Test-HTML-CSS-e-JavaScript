const produtos = [
  { id: 1, nome: 'Camiseta Básica', preco: 49.90, img: 'https://via.placeholder.com/300?text=Camiseta', categoria: 'Camisetas', descricao: 'Camiseta 100% algodão, confortável e resistente.' },
  { id: 2, nome: 'Tênis Esportivo', preco: 199.90, img: 'https://via.placeholder.com/300?text=Tênis', categoria: 'Tênis', descricao: 'Tênis ideal para corrida e uso diário.' },
  { id: 3, nome: 'Boné Estiloso', preco: 39.90, img: 'https://via.placeholder.com/300?text=Boné', categoria: 'Bonés', descricao: 'Boné ajustável, design moderno.' },
  { id: 4, nome: 'Mochila Urbana', preco: 149.90, img: 'https://via.placeholder.com/300?text=Mochila', categoria: 'Mochilas', descricao: 'Mochila resistente com vários compartimentos.' }
];

let produtosFiltrados = [...produtos];
const container = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
let carrinho = {};

function renderProducts() {
  container.innerHTML = '';
  if (produtosFiltrados.length === 0) {
    container.innerHTML = '<p class="text-center">Nenhum produto encontrado.</p>';
    return;
  }
  produtosFiltrados.forEach(prod => {
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4 col-lg-3 mb-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${prod.img}" class="card-img-top" alt="${prod.nome}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${prod.nome}</h5>
          <p class="product-description">${prod.descricao}</p>
          <p class="card-text text-success fw-bold">R$ ${prod.preco.toFixed(2).replace('.', ',')}</p>
          <button class="btn btn-primary mt-auto" onclick="addToCart(${prod.id})">Adicionar ao carrinho</button>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function addToCart(prodId) {
  carrinho[prodId] = (carrinho[prodId] || 0) + 1;
  updateCartCount();
}

function updateCartCount() {
  const totalItens = Object.values(carrinho).reduce((acc, cur) => acc + cur, 0);
  if (totalItens > 0) {
    cartCount.textContent = totalItens;
    cartCount.classList.remove('d-none');
    checkoutBtn.disabled = false;
  } else {
    cartCount.classList.add('d-none');
    checkoutBtn.disabled = true;
  }
}

function renderCart() {
  cartItemsContainer.innerHTML = '';
  if (Object.keys(carrinho).length === 0) {
    cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    cartTotal.textContent = 'Total: R$ 0,00';
    checkoutBtn.disabled = true;
    return;
  }

  let total = 0;
  const ul = document.createElement('ul');
  ul.className = 'list-group';

  for (const prodId in carrinho) {
    const quantidade = carrinho[prodId];
    const prod = produtos.find(p => p.id === +prodId);
    const subtotal = quantidade * prod.preco;
    total += subtotal;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <div>
        <strong>${prod.nome}</strong> <br />
        R$ ${prod.preco.toFixed(2).replace('.', ',')} x ${quantidade} = R$ ${subtotal.toFixed(2).replace('.', ',')}
      </div>
      <div>
        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${prod.id})" aria-label="Remover 1 unidade de ${prod.nome}">-</button>
        <button class="btn btn-sm btn-outline-success" onclick="addToCart(${prod.id})" aria-label="Adicionar 1 unidade de ${prod.nome}">+</button>
      </div>
    `;
    ul.appendChild(li);
  }

  cartItemsContainer.appendChild(ul);
  cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removeFromCart(prodId) {
  if (!carrinho[prodId]) return;
  carrinho[prodId]--;
  if (carrinho[prodId] <= 0) delete carrinho[prodId];
  updateCartCount();
  renderCart();
}

function filterCategory(cat) {
  if (cat === 'Todos') {
    produtosFiltrados = [...produtos];
  } else {
    produtosFiltrados = produtos.filter(p => p.categoria === cat);
  }
  renderProducts();
}

function searchProducts() {
  const termo = document.getElementById('search-input').value.toLowerCase().trim();
  if (!termo) {
    produtosFiltrados = [...produtos];
  } else {
    produtosFiltrados = produtos.filter(p =>
      p.nome.toLowerCase().includes(termo) || 
      p.descricao.toLowerCase().includes(termo) ||
      p.categoria.toLowerCase().includes(termo)
    );
  }
  renderProducts();
}

function finalizarCompra() {
  alert('Compra finalizada! Obrigado pela preferência.');
  carrinho = {};
  updateCartCount();
  renderCart();
  // Fecha modal programaticamente (usando Bootstrap 5 modal API)
  const modalElement = document.getElementById('cartModal');
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}

// Atualiza o carrinho sempre que o modal for aberto
const cartModalElement = document.getElementById('cartModal');
cartModalElement.addEventListener('show.bs.modal', renderCart);

// Inicializa lista de produtos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
});
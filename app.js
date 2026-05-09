/* ============================================================
   FOLYO — Book Market
   app.js
   ============================================================ */

// ============================================================
// DATA  (static seed books)
// ============================================================

const COVERS = [
  { bg: '#2d4a3e', e: '🌿' },
  { bg: '#4a2d2d', e: '🔥' },
  { bg: '#2d3a4a', e: '🌌' },
  { bg: '#4a3d2d', e: '⚔️'  },
  { bg: '#3a2d4a', e: '🔮' },
  { bg: '#2d4a4a', e: '🌊' },
  { bg: '#4a4a2d', e: '🌻' },
  { bg: '#4a2d3d', e: '🌸' },
];

const SEED_BOOKS = [
  { id: 1,  title: 'Crime and Punishment',    author: 'Fyodor Dostoevsky',  genre: 'Fiction',     price: 89,  pages: 687,  year: 1866, stock: 5,  cover: 0, desc: 'A psychological masterpiece following a student who commits murder and spirals into guilt and breakdown.' },
  { id: 2,  title: 'Dune',                    author: 'Frank Herbert',      genre: 'Sci-Fi',      price: 120, pages: 896,  year: 1965, stock: 3,  cover: 2, desc: 'An epic science fiction saga set on the desert planet Arrakis, exploring politics, religion and ecology.' },
  { id: 3,  title: 'Sapiens',                 author: 'Yuval Noah Harari',  genre: 'History',     price: 135, pages: 512,  year: 2011, stock: 8,  cover: 3, desc: 'A groundbreaking account of 70,000 years of human history, from Stone Age to the modern era.' },
  { id: 4,  title: 'The Lord of the Rings',   author: 'J.R.R. Tolkien',    genre: 'Fiction',     price: 175, pages: 1200, year: 1954, stock: 2,  cover: 4, desc: 'The legendary journey through Middle-earth that will determine the fate of all free peoples.' },
  { id: 5,  title: 'The Alchemist',           author: 'Paulo Coelho',       genre: 'Fiction',     price: 75,  pages: 163,  year: 1988, stock: 12, cover: 5, desc: 'A young shepherd travels from Spain to Egypt in search of treasure and discovers the meaning of life.' },
  { id: 6,  title: '1984',                    author: 'George Orwell',      genre: 'Sci-Fi',      price: 95,  pages: 328,  year: 1949, stock: 6,  cover: 1, desc: 'A dystopian classic exploring surveillance, totalitarianism and the destruction of individual freedom.' },
  { id: 7,  title: 'Memed, My Hawk',          author: 'Yashar Kemal',       genre: 'Fiction',     price: 110, pages: 432,  year: 1955, stock: 4,  cover: 6, desc: 'A masterwork of Turkish literature following the legendary outlaw Memed in rural Anatolia.' },
  { id: 8,  title: 'Serenade',                author: 'Zulfu Livaneli',     genre: 'Fiction',     price: 98,  pages: 376,  year: 2011, stock: 7,  cover: 7, desc: 'A novel of love and music set across Istanbul, Prague and Vienna, spanning decades of history.' },
  { id: 9,  title: 'The Story of Philosophy', author: 'Will Durant',        genre: 'Philosophy',  price: 145, pages: 698,  year: 1926, stock: 3,  cover: 3, desc: 'A comprehensive survey of the great philosophers from ancient Greece to the modern age.' },
  { id: 10, title: 'Pollyanna',               author: 'Eleanor Porter',     genre: 'Children',    price: 55,  pages: 310,  year: 1913, stock: 9,  cover: 5, desc: 'A timeless story about finding joy in every situation, passed down through generations worldwide.' },
  { id: 11, title: 'Sherlock Holmes',         author: 'Arthur Conan Doyle', genre: 'Mystery',     price: 88,  pages: 464,  year: 1887, stock: 11, cover: 1, desc: 'The most thrilling cases of the legendary Baker Street detective, collected in one volume.' },
  { id: 12, title: 'Rubaiyat',               author: 'Omar Khayyam',       genre: 'Poetry',      price: 65,  pages: 124,  year: 1048, stock: 14, cover: 4, desc: 'Immortal quatrains on life, wine and love by the 11th-century Persian poet and mathematician.' },
];

// ============================================================
// STATE
// ============================================================

let currentUser  = null;
let purchased    = [];
let selectedType = 'buyer';
let modalBook    = null;

// All books = seed books + seller-added books (fetched from server)
let ALL_BOOKS    = [...SEED_BOOKS];
// Sales map: book_id -> number of sales
let salesMap     = {};

// ============================================================
// API HELPERS
// ============================================================

async function api(method, endpoint, body) {
  const res = await fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

// Load seller-added books from backend and merge with seed books
async function loadSellerBooks() {
  try {
    const data = await api('GET', '/api/books');
    if (data.success) {
      // Seller books get id = 's' + db_id to avoid collision with seed books
      const sellerBooks = data.books.map(b => ({
        id:    's' + b.id,
        title:  b.title,
        author: b.author,
        genre:  b.genre,
        price:  b.price,
        pages:  b.pages,
        year:   b.year,
        stock:  b.stock,
        cover:  b.cover % COVERS.length,
        desc:   b.description,
        seller: b.seller,
      }));
      ALL_BOOKS = [...SEED_BOOKS, ...sellerBooks];
    }
  } catch (e) {
    console.warn('Could not load seller books:', e);
  }
}

// Load purchase sales counts
async function loadSales() {
  try {
    const data = await api('GET', '/api/sales');
    if (data.success) {
      salesMap = {};
      data.sales.forEach(row => {
        salesMap[row.book_id] = row.sales;
      });
    }
  } catch (e) {
    console.warn('Could not load sales:', e);
  }
}

// ============================================================
// AUTH
// ============================================================

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'register' && i === 1));
  });
  document.getElementById('login-form').classList.toggle('active', tab === 'login');
  document.getElementById('register-form').classList.toggle('active', tab === 'register');
}

function selectType(type) {
  selectedType = type;
  document.getElementById('type-buyer').classList.toggle('selected', type === 'buyer');
  document.getElementById('type-seller').classList.toggle('selected', type === 'seller');
}

async function doLogin() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  if (!username || !password) {
    showToast('Please fill in all fields.', 'error');
    return;
  }

  const data = await api('POST', '/api/login', { username, password });

  if (!data.success) {
    showToast(data.error, 'error');
    return;
  }

  currentUser = data.user;
  purchased   = data.purchases.map(p => ({
    ...ALL_BOOKS.find(b => b.id === p.book_id),
    purchasedAt: new Date(p.purchased_at),
  })).filter(Boolean);

  enterApp();
}

async function doRegister() {
  const username = document.getElementById('reg-username').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const role     = selectedType === 'buyer' ? 'Buyer' : 'Seller';

  if (!username || !email || !password) {
    showToast('Please fill in all fields.', 'error');
    return;
  }

  const data = await api('POST', '/api/register', { username, email, password, role });

  if (!data.success) {
    showToast(data.error, 'error');
    return;
  }

  currentUser = data.user;
  purchased   = [];
  enterApp();
}

async function enterApp() {
  // Load seller books & sales data first
  await Promise.all([loadSellerBooks(), loadSales()]);

  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app').style.display         = 'block';
  document.getElementById('sidebar-username').textContent = currentUser.name || currentUser.username;
  document.getElementById('sidebar-role').textContent     = currentUser.role;

  // Show/hide seller-only nav items
  const isSeller = currentUser.role === 'Seller';
  document.querySelectorAll('.seller-only').forEach(el => {
    el.style.display = isSeller ? 'flex' : 'none';
  });

  buildAuthorDropdown();
  renderHome();
  doSearch();
}

function doLogout() {
  currentUser = null;
  purchased   = [];
  ALL_BOOKS   = [...SEED_BOOKS];
  salesMap    = {};
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('app').style.display         = 'none';
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  closeModal();
  showScreen('home');
}

// ============================================================
// NAVIGATION
// ============================================================

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');
  if (name === 'purchased') renderPurchased();
}

// ============================================================
// BOOK RENDERING
// ============================================================

function buildAuthorDropdown() {
  const select  = document.getElementById('search-author');
  const authors = [...new Set(ALL_BOOKS.map(b => b.author))].sort();
  select.innerHTML = '<option value="">All Authors</option>' + authors.map(a => `<option>${a}</option>`).join('');
}

function buildCover(book) {
  const cover = COVERS[book.cover % COVERS.length];
  return `
    <div class="book-cover" style="background:${cover.bg}">
      <span class="book-cover-emoji">${cover.e}</span>
      <div class="book-cover-text">
        <div style="font-family:'Playfair Display',serif;font-size:0.75rem;color:rgba(255,255,255,0.9);font-weight:700;line-height:1.3">${book.title}</div>
        <div style="font-size:0.6rem;color:rgba(255,255,255,0.5);margin-top:3px">${book.author}</div>
      </div>
      <span class="book-badge">${book.genre}</span>
    </div>`;
}

function buildCard(book) {
  const salesCount = salesMap[book.id] || 0;
  const salesBadge = salesCount > 0
    ? `<div class="book-sales-badge">🔥 ${salesCount} sold</div>`
    : '';
  return `
    <div class="book-card" onclick="openModal('${book.id}')">
      ${buildCover(book)}
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-meta">
          <div class="book-price">₺${book.price}</div>
          <div class="book-pages">${book.pages} sf</div>
        </div>
        ${salesBadge}
      </div>
    </div>`;
}

function getRecommended() {
  // Recommended: highest stock books (well-stocked = popular/recommended)
  return [...ALL_BOOKS]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 4);
}

function getBestSellers() {
  // Best sellers: books with actual purchase data; fallback to cheapest if no data
  const withSales = ALL_BOOKS
    .map(b => ({ ...b, sales: salesMap[b.id] || 0 }))
    .filter(b => b.sales > 0)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);

  if (withSales.length > 0) return withSales;

  // Fallback: lowest price (most affordable = popular)
  return [...ALL_BOOKS]
    .sort((a, b) => a.price - b.price)
    .slice(0, 4);
}

function renderHome() {
  document.getElementById('recommended-grid').innerHTML = getRecommended().map(buildCard).join('');
  document.getElementById('bestseller-grid').innerHTML  = getBestSellers().map(buildCard).join('');
  document.getElementById('home-books-grid').innerHTML  = ALL_BOOKS.map(buildCard).join('');
}

// ============================================================
// SEARCH  (with price filter + sort)
// ============================================================

function doSearch() {
  const author = document.getElementById('search-author')?.value || '';
  const genre  = document.getElementById('search-genre')?.value  || '';
  const minP   = parseFloat(document.getElementById('search-min-price')?.value) || 0;
  const maxP   = parseFloat(document.getElementById('search-max-price')?.value) || Infinity;
  const sort   = document.getElementById('search-sort')?.value || '';

  let results = ALL_BOOKS.filter(b =>
    (!author || b.author === author) &&
    (!genre  || b.genre  === genre)  &&
    b.price >= minP &&
    b.price <= maxP
  );

  if (sort === 'asc')  results = results.sort((a, b) => a.price - b.price);
  if (sort === 'desc') results = results.sort((a, b) => b.price - a.price);

  const grid    = document.getElementById('search-books-grid');
  const counter = document.getElementById('results-count');

  if (counter) counter.textContent = results.length + ' books found';
  if (grid) {
    grid.innerHTML = results.length
      ? results.map(buildCard).join('')
      : '<p style="color:var(--muted);font-size:0.9rem;padding:40px 0">No results found.</p>';
  }
}

// ============================================================
// MODAL
// ============================================================

function openModal(id) {
  // id may be number or string like 's5'
  const book = ALL_BOOKS.find(x => String(x.id) === String(id));
  if (!book) return;

  modalBook = book;

  const cover = COVERS[book.cover % COVERS.length];
  const owned = purchased.some(x => String(x.id) === String(id));

  document.getElementById('modal-cover').style.background   = cover.bg;
  document.getElementById('modal-cover-emoji').textContent  = cover.e;
  document.getElementById('modal-cover-title').textContent  = book.title;
  document.getElementById('modal-cover-author').textContent = book.author;
  document.getElementById('modal-genre').textContent        = book.genre;
  document.getElementById('modal-title').textContent        = book.title;
  document.getElementById('modal-author').textContent       = book.author;
  document.getElementById('modal-pages').textContent        = book.pages || '—';
  document.getElementById('modal-year').textContent         = book.year  || '—';
  document.getElementById('modal-stock').textContent        = book.stock;
  document.getElementById('modal-desc').textContent         = book.desc;
  document.getElementById('modal-price').textContent        = '₺' + book.price;

  const btn = document.getElementById('modal-buy-btn');

  // Sellers cannot buy (they list books)
  if (currentUser.role === 'Seller') {
    btn.textContent = 'Seller Account';
    btn.className   = 'modal-buy-btn owned';
  } else {
    btn.textContent = owned ? '✓ Purchased' : 'Buy Now';
    btn.className   = 'modal-buy-btn' + (owned ? ' owned' : '');
  }

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  modalBook = null;
}

function closeModalOnBg(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ============================================================
// PURCHASE
// ============================================================

async function buyFromModal() {
  if (!modalBook) return;
  if (currentUser.role === 'Seller') return;
  if (purchased.some(x => String(x.id) === String(modalBook.id))) return;

  const username = currentUser.name || currentUser.username;
  const data = await api('POST', '/api/purchase', { username, bookId: modalBook.id });

  if (!data.success) {
    showToast(data.error, 'error');
    return;
  }

  purchased.push({ ...modalBook, purchasedAt: new Date() });

  // Update local sales map
  salesMap[modalBook.id] = (salesMap[modalBook.id] || 0) + 1;

  showToast(`"${modalBook.title}" added to your library!`, 'success');

  const btn = document.getElementById('modal-buy-btn');
  btn.textContent = '✓ Purchased';
  btn.className   = 'modal-buy-btn owned';

  renderHome();
  doSearch();
}

// ============================================================
// ADD BOOK  (Seller only)
// ============================================================

async function addBook() {
  const title  = document.getElementById('add-title').value.trim();
  const author = document.getElementById('add-author').value.trim();
  const genre  = document.getElementById('add-genre').value;
  const price  = parseFloat(document.getElementById('add-price').value);
  const pages  = parseInt(document.getElementById('add-pages').value)  || 0;
  const year   = parseInt(document.getElementById('add-year').value)   || new Date().getFullYear();
  const stock  = parseInt(document.getElementById('add-stock').value)  || 1;
  const desc   = document.getElementById('add-desc').value.trim();

  if (!title || !author || !genre || isNaN(price) || price <= 0) {
    showToast('Please fill in all required fields (Title, Author, Genre, Price).', 'error');
    return;
  }

  const seller = currentUser.name || currentUser.username;
  // Random cover index
  const cover  = Math.floor(Math.random() * COVERS.length);

  const data = await api('POST', '/api/books', {
    seller, title, author, genre, price, pages, year, stock, cover, description: desc
  });

  if (!data.success) {
    showToast(data.error, 'error');
    return;
  }

  // Add to local list immediately
  ALL_BOOKS.push({
    id:    's' + data.bookId,
    title, author, genre, price, pages, year, stock, cover,
    desc,
    seller,
  });

  // Clear form
  ['add-title','add-author','add-price','add-pages','add-year','add-stock','add-desc'].forEach(id => {
    document.getElementById(id).value = '';
  });

  buildAuthorDropdown();
  renderHome();
  doSearch();

  showToast(`"${title}" listed successfully!`, 'success');
  showScreen('home');
}

// ============================================================
// PURCHASED LIST
// ============================================================

function renderPurchased() {
  const wrap = document.getElementById('purchased-list-wrap');

  if (!purchased.length) {
    wrap.innerHTML = `
      <div class="purchased-empty">
        <span class="empty-icon">📭</span>
        <p>You have not purchased any books yet.</p>
        <p style="margin-top:6px;font-size:0.78rem">Click on a book from the home screen.</p>
      </div>`;
    return;
  }

  const items = purchased.map(book => {
    const cover = COVERS[book.cover % COVERS.length];
    const date  = book.purchasedAt.toLocaleDateString('tr-TR');
    return `
      <div class="purchased-item">
        <div class="purchased-cover" style="background:${cover.bg}">${cover.e}</div>
        <div class="purchased-details">
          <div class="purchased-title">${book.title}</div>
          <div class="purchased-author">${book.author} · ${book.genre}</div>
          <div class="purchased-date">Purchased on ${date}</div>
        </div>
        <div style="text-align:right">
          <div class="purchased-price">₺${book.price}</div>
          <div class="owned-badge" style="display:inline-block;margin-top:6px">Owned</div>
        </div>
      </div>`;
  }).join('');

  wrap.innerHTML = `<div class="purchased-list">${items}</div>`;
}

// ============================================================
// PASSWORD UPDATE
// ============================================================

async function updatePassword() {
  const currentPassword = document.getElementById('cur-pass').value;
  const newPassword     = document.getElementById('new-pass').value;
  const newPassword2    = document.getElementById('new-pass2').value;

  if (!currentPassword || !newPassword || !newPassword2) {
    showToast('Please fill in all fields.', 'error');
    return;
  }

  if (newPassword !== newPassword2) {
    showToast('New passwords do not match.', 'error');
    return;
  }

  if (newPassword.length < 6) {
    showToast('Password must be at least 6 characters.', 'error');
    return;
  }

  const username = currentUser.name || currentUser.username;
  const data = await api('PUT', '/api/password', { username, currentPassword, newPassword });

  if (!data.success) {
    showToast(data.error, 'error');
    return;
  }

  ['cur-pass', 'new-pass', 'new-pass2'].forEach(id => {
    document.getElementById(id).value = '';
  });

  showToast('Password updated successfully!', 'success');
}

// ============================================================
// TOAST
// ============================================================

let toastTimer;

function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className   = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

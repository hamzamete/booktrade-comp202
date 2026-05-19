/* ============================================================
   FOLYO — Book Market  |  app.js
   ============================================================ */

// ============================================================
// TRANSLATIONS
// ============================================================

const TRANSLATIONS = {
  en: {
    'auth.tagline':                  'Book Market',
    'auth.signin':                   'Sign In',
    'auth.register':                 'Register',
    'auth.username':                 'Username',
    'auth.email':                    'E-mail',
    'auth.password':                 'Password',
    'auth.accountType':              'Account Type',
    'auth.buyer':                    'Buyer',
    'auth.buyer.desc':               'Buy books',
    'auth.seller':                   'Seller',
    'auth.seller.desc':              'Sell books',
    'auth.createAccount':            'Create Account',
    'auth.username.placeholder':     'your username',
    'auth.reg.username.placeholder': 'choose a username',
    'auth.email.placeholder':        'example@email.com',

    'sidebar.tagline':  'Book Market',
    'sidebar.navigate': 'Navigate',
    'nav.home':         'Home',
    'nav.search':       'Search Books',
    'nav.purchased':    'My Purchases',
    'nav.addbook':      'Add Book',
    'nav.password':     'Update Password',
    'sidebar.logout':   '↩ Log Out',

    'home.title':       'Featured Books',
    'home.subtitle':    'Click on a book to see details and purchase options',
    'home.recommended': '⭐ Recommended for You',
    'home.bestsellers': '🔥 Best Sellers',
    'home.allbooks':    '📚 All Books',

    'search.title':     'Search Books',
    'search.subtitle':  'Filter by author, genre or price',
    'search.author':    'Author',
    'search.allAuthors':'All Authors',
    'search.genre':     'Genre',
    'search.allGenres': 'All Genres',
    'search.priceRange':'Price Range (₺)',
    'search.sortBy':    'Sort By Price',
    'search.default':   'Default',
    'search.lowToHigh': 'Price: Low to High ↑',
    'search.highToLow': 'Price: High to Low ↓',
    'search.filter':    'Filter',
    'search.results':   '{n} books found',
    'search.noResults': 'No results found.',

    'purchases.title':    'My Purchases',
    'purchases.subtitle': 'Your Library',
    'purchases.empty':    'You have not purchased any books yet.',
    'purchases.emptyHint':'Click on a book from the home screen.',
    'purchases.on':       'Purchased on',
    'purchases.owned':    'Owned',

    'addbook.title':              'Add a Book',
    'addbook.subtitle':           'List a new book for sale',
    'addbook.details':            'Book Details',
    'addbook.bookTitle':          'Title *',
    'addbook.author':             'Author *',
    'addbook.genre':              'Genre *',
    'addbook.price':              'Price (₺) *',
    'addbook.pages':              'Number of Pages',
    'addbook.year':               'Publication Year',
    'addbook.stock':              'Stock Quantity',
    'addbook.desc':               'Description',
    'addbook.coverImage':         'Cover Image',
    'addbook.coverHint':          'Optional. Accepts JPG, PNG, WebP.',
    'addbook.submit':             '📚 List Book for Sale',
    'addbook.title.placeholder':  'Book title',
    'addbook.author.placeholder': 'Author name',
    'addbook.price.placeholder':  'e.g. 120',
    'addbook.pages.placeholder':  'e.g. 320',
    'addbook.year.placeholder':   'e.g. 2023',
    'addbook.stock.placeholder':  'e.g. 10',
    'addbook.desc.placeholder':   'Short description of the book...',

    'password.title':    'Update Password',
    'password.subtitle': 'Account security',
    'password.setNew':   'Set New Password',
    'password.current':  'Current Password',
    'password.new':      'New Password',
    'password.confirm':  'New Password (Confirm)',
    'password.submit':   'Update Password',

    'modal.pages':     'Pages',
    'modal.published': 'Published',
    'modal.inStock':   'In Stock',
    'modal.close':     'Close',
    'modal.buyNow':    'Buy Now',
    'modal.seller':    'Seller Account',
    'modal.purchased': '✓ Purchased',

    'err.fillAll':       'Please fill in all fields.',
    'err.userNotFound':  'User not found. Please register first.',
    'err.wrongPass':     'Incorrect password.',
    'err.usernameTaken': 'Username already taken.',
    'err.alreadyBought': 'Already purchased.',
    'err.missingFields': 'Missing fields.',
    'err.passIncorrect': 'Current password is incorrect.',
    'err.fillRequired':  'Please fill in all required fields (Title, Author, Genre, Price).',
    'err.passMismatch':  'New passwords do not match.',
    'err.passShort':     'Password must be at least 6 characters.',

    'ok.addedToLibrary': '"{title}" added to your library!',
    'ok.listedSuccess':  '"{title}" listed successfully!',
    'ok.passUpdated':    'Password updated successfully!',
  },
  tr: {
    'auth.tagline':                  'Kitap Pazarı',
    'auth.signin':                   'Giriş Yap',
    'auth.register':                 'Kayıt Ol',
    'auth.username':                 'Kullanıcı Adı',
    'auth.email':                    'E-posta',
    'auth.password':                 'Şifre',
    'auth.accountType':              'Hesap Türü',
    'auth.buyer':                    'Alıcı',
    'auth.buyer.desc':               'Kitap satın al',
    'auth.seller':                   'Satıcı',
    'auth.seller.desc':              'Kitap sat',
    'auth.createAccount':            'Hesap Oluştur',
    'auth.username.placeholder':     'kullanıcı adınız',
    'auth.reg.username.placeholder': 'kullanıcı adı seç',
    'auth.email.placeholder':        'ornek@email.com',

    'sidebar.tagline':  'Kitap Pazarı',
    'sidebar.navigate': 'Menü',
    'nav.home':         'Ana Sayfa',
    'nav.search':       'Kitap Ara',
    'nav.purchased':    'Satın Aldıklarım',
    'nav.addbook':      'Kitap Ekle',
    'nav.password':     'Şifre Güncelle',
    'sidebar.logout':   '↩ Çıkış Yap',

    'home.title':       'Öne Çıkan Kitaplar',
    'home.subtitle':    'Detayları görmek için bir kitaba tıklayın',
    'home.recommended': '⭐ Size Özel Öneriler',
    'home.bestsellers': '🔥 Çok Satanlar',
    'home.allbooks':    '📚 Tüm Kitaplar',

    'search.title':     'Kitap Ara',
    'search.subtitle':  'Yazar, tür veya fiyata göre filtrele',
    'search.author':    'Yazar',
    'search.allAuthors':'Tüm Yazarlar',
    'search.genre':     'Tür',
    'search.allGenres': 'Tüm Türler',
    'search.priceRange':'Fiyat Aralığı (₺)',
    'search.sortBy':    'Fiyata Göre Sırala',
    'search.default':   'Varsayılan',
    'search.lowToHigh': 'Fiyat: Düşükten Yükseğe ↑',
    'search.highToLow': 'Fiyat: Yüksekten Düşüğe ↓',
    'search.filter':    'Filtrele',
    'search.results':   '{n} kitap bulundu',
    'search.noResults': 'Sonuç bulunamadı.',

    'purchases.title':    'Satın Aldıklarım',
    'purchases.subtitle': 'Kütüphanem',
    'purchases.empty':    'Henüz hiç kitap satın almadınız.',
    'purchases.emptyHint':'Ana sayfadan bir kitaba tıklayın.',
    'purchases.on':       'Satın alındı:',
    'purchases.owned':    'Satın Alındı',

    'addbook.title':              'Kitap Ekle',
    'addbook.subtitle':           'Satışa yeni bir kitap ekle',
    'addbook.details':            'Kitap Bilgileri',
    'addbook.bookTitle':          'Başlık *',
    'addbook.author':             'Yazar *',
    'addbook.genre':              'Tür *',
    'addbook.price':              'Fiyat (₺) *',
    'addbook.pages':              'Sayfa Sayısı',
    'addbook.year':               'Yayın Yılı',
    'addbook.stock':              'Stok Miktarı',
    'addbook.desc':               'Açıklama',
    'addbook.coverImage':         'Kapak Görseli',
    'addbook.coverHint':          'İsteğe bağlı. JPG, PNG, WebP kabul edilir.',
    'addbook.submit':             '📚 Kitabı Satışa Ekle',
    'addbook.title.placeholder':  'Kitap başlığı',
    'addbook.author.placeholder': 'Yazar adı',
    'addbook.price.placeholder':  'örn. 120',
    'addbook.pages.placeholder':  'örn. 320',
    'addbook.year.placeholder':   'örn. 2023',
    'addbook.stock.placeholder':  'örn. 10',
    'addbook.desc.placeholder':   'Kitabın kısa açıklaması...',

    'password.title':    'Şifre Güncelle',
    'password.subtitle': 'Hesap güvenliği',
    'password.setNew':   'Yeni Şifre Belirle',
    'password.current':  'Mevcut Şifre',
    'password.new':      'Yeni Şifre',
    'password.confirm':  'Yeni Şifre (Tekrar)',
    'password.submit':   'Şifreyi Güncelle',

    'modal.pages':     'Sayfa',
    'modal.published': 'Yayın Yılı',
    'modal.inStock':   'Stokta',
    'modal.close':     'Kapat',
    'modal.buyNow':    'Satın Al',
    'modal.seller':    'Satıcı Hesabı',
    'modal.purchased': '✓ Satın Alındı',

    'err.fillAll':       'Lütfen tüm alanları doldurun.',
    'err.userNotFound':  'Kullanıcı bulunamadı. Lütfen önce kayıt olun.',
    'err.wrongPass':     'Hatalı şifre.',
    'err.usernameTaken': 'Bu kullanıcı adı zaten alınmış.',
    'err.alreadyBought': 'Zaten satın alındı.',
    'err.missingFields': 'Eksik alan.',
    'err.passIncorrect': 'Mevcut şifre hatalı.',
    'err.fillRequired':  'Lütfen zorunlu alanları doldurun (Başlık, Yazar, Tür, Fiyat).',
    'err.passMismatch':  'Yeni şifreler eşleşmiyor.',
    'err.passShort':     'Şifre en az 6 karakter olmalıdır.',

    'ok.addedToLibrary': '"{title}" kütüphanenize eklendi!',
    'ok.listedSuccess':  '"{title}" başarıyla listelendi!',
    'ok.passUpdated':    'Şifre başarıyla güncellendi!',
  },
};

// Server hata mesajlarını çeviri anahtarına eşler
const SERVER_ERROR_MAP = {
  'Please fill in all fields.':             'err.fillAll',
  'Username already taken.':               'err.usernameTaken',
  'User not found. Please register first.':'err.userNotFound',
  'Incorrect password.':                   'err.wrongPass',
  'Already purchased.':                    'err.alreadyBought',
  'Missing fields.':                       'err.missingFields',
  'Current password is incorrect.':        'err.passIncorrect',
  'Please fill in all required fields.':   'err.fillRequired',
};

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
  { id: 1,  title: 'Crime and Punishment',    author: 'Fyodor Dostoevsky',  genre: 'Fiction',    price: 89,  pages: 687,  year: 1866, stock: 5,  cover: 0, desc: 'A psychological masterpiece following a student who commits murder and spirals into guilt and breakdown.' },
  { id: 2,  title: 'Dune',                    author: 'Frank Herbert',      genre: 'Sci-Fi',     price: 120, pages: 896,  year: 1965, stock: 3,  cover: 2, desc: 'An epic science fiction saga set on the desert planet Arrakis, exploring politics, religion and ecology.' },
  { id: 3,  title: 'Sapiens',                 author: 'Yuval Noah Harari',  genre: 'History',    price: 135, pages: 512,  year: 2011, stock: 8,  cover: 3, desc: 'A groundbreaking account of 70,000 years of human history, from Stone Age to the modern era.' },
  { id: 4,  title: 'The Lord of the Rings',   author: 'J.R.R. Tolkien',    genre: 'Fiction',    price: 175, pages: 1200, year: 1954, stock: 2,  cover: 4, desc: 'The legendary journey through Middle-earth that will determine the fate of all free peoples.' },
  { id: 5,  title: 'The Alchemist',           author: 'Paulo Coelho',       genre: 'Fiction',    price: 75,  pages: 163,  year: 1988, stock: 12, cover: 5, desc: 'A young shepherd travels from Spain to Egypt in search of treasure and discovers the meaning of life.' },
  { id: 6,  title: '1984',                    author: 'George Orwell',      genre: 'Sci-Fi',     price: 95,  pages: 328,  year: 1949, stock: 6,  cover: 1, desc: 'A dystopian classic exploring surveillance, totalitarianism and the destruction of individual freedom.' },
  { id: 7,  title: 'Memed, My Hawk',          author: 'Yashar Kemal',       genre: 'Fiction',    price: 110, pages: 432,  year: 1955, stock: 4,  cover: 6, desc: 'A masterwork of Turkish literature following the legendary outlaw Memed in rural Anatolia.' },
  { id: 8,  title: 'Serenade',                author: 'Zulfu Livaneli',     genre: 'Fiction',    price: 98,  pages: 376,  year: 2011, stock: 7,  cover: 7, desc: 'A novel of love and music set across Istanbul, Prague and Vienna, spanning decades of history.' },
  { id: 9,  title: 'The Story of Philosophy', author: 'Will Durant',        genre: 'Philosophy', price: 145, pages: 698,  year: 1926, stock: 3,  cover: 3, desc: 'A comprehensive survey of the great philosophers from ancient Greece to the modern age.' },
  { id: 10, title: 'Pollyanna',               author: 'Eleanor Porter',     genre: 'Children',   price: 55,  pages: 310,  year: 1913, stock: 9,  cover: 5, desc: 'A timeless story about finding joy in every situation, passed down through generations worldwide.' },
  { id: 11, title: 'Sherlock Holmes',         author: 'Arthur Conan Doyle', genre: 'Mystery',    price: 88,  pages: 464,  year: 1887, stock: 11, cover: 1, desc: 'The most thrilling cases of the legendary Baker Street detective, collected in one volume.' },
  { id: 12, title: 'Rubaiyat',               author: 'Omar Khayyam',       genre: 'Poetry',     price: 65,  pages: 124,  year: 1048, stock: 14, cover: 4, desc: 'Immortal quatrains on life, wine and love by the 11th-century Persian poet and mathematician.' },
];

// ============================================================
// STATE
// ============================================================

let currentUser  = null;
let purchased    = [];
let rawPurchases = [];
let selectedType = 'buyer';
let modalBook    = null;
let currentLang  = localStorage.getItem('folyo_lang') || 'en';

let ALL_BOOKS = [...SEED_BOOKS];
let salesMap  = {};

// ============================================================
// I18N
// ============================================================

function t(key, vars) {
  const lang = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  let str = lang[key] || TRANSLATIONS.en[key] || key;
  if (vars) Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
  return str;
}

function translateServerError(msg) {
  const key = SERVER_ERROR_MAP[msg];
  return key ? t(key) : msg;
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Select options that get rebuilt or are static
  const sortOpts = document.querySelectorAll('#search-sort option');
  if (sortOpts.length >= 3) {
    sortOpts[0].textContent = t('search.default');
    sortOpts[1].textContent = t('search.lowToHigh');
    sortOpts[2].textContent = t('search.highToLow');
  }

  // Aktif dili daire ile vurgula
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === currentLang);
  });

  document.documentElement.lang = currentLang;
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'tr' : 'en';
  localStorage.setItem('folyo_lang', currentLang);
  applyLang();
  if (currentUser) {
    buildAuthorDropdown();
    renderHome();
    doSearch();
    renderPurchased();
  }
}

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

async function loadSellerBooks() {
  try {
    const data = await api('GET', '/api/books');
    if (data.success) {
      const sellerBooks = data.books.map(b => ({
        id:         's' + b.id,
        title:      b.title,
        author:     b.author,
        genre:      b.genre,
        price:      b.price,
        pages:      b.pages,
        year:       b.year,
        stock:      b.stock,
        cover:      b.cover % COVERS.length,
        desc:       b.description,
        seller:     b.seller,
        coverImage: b.cover_image || null,
      }));
      ALL_BOOKS = [...SEED_BOOKS, ...sellerBooks];
    }
  } catch (e) {
    console.warn('Could not load seller books:', e);
  }
}

async function loadSales() {
  try {
    const data = await api('GET', '/api/sales');
    if (data.success) {
      salesMap = {};
      data.sales.forEach(row => { salesMap[row.book_id] = row.sales; });
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

  if (!username || !password) { showToast(t('err.fillAll'), 'error'); return; }

  const data = await api('POST', '/api/login', { username, password });
  if (!data.success) { showToast(translateServerError(data.error), 'error'); return; }

  currentUser  = data.user;
  rawPurchases = data.purchases;
  enterApp();
}

async function doRegister() {
  const username = document.getElementById('reg-username').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const role     = selectedType === 'buyer' ? 'Buyer' : 'Seller';

  if (!username || !email || !password) { showToast(t('err.fillAll'), 'error'); return; }

  const data = await api('POST', '/api/register', { username, email, password, role });
  if (!data.success) { showToast(translateServerError(data.error), 'error'); return; }

  currentUser  = data.user;
  rawPurchases = [];
  enterApp();
}

async function enterApp() {
  await Promise.all([loadSellerBooks(), loadSales()]);

  // Build purchased list after seller books are loaded so IDs match
  purchased = rawPurchases.map(p => ({
    ...ALL_BOOKS.find(b => String(b.id) === String(p.book_id)),
    purchasedAt: new Date(p.purchased_at),
  })).filter(b => b && b.title);

  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app').style.display         = 'block';
  document.getElementById('sidebar-username').textContent = currentUser.name || currentUser.username;
  document.getElementById('sidebar-role').textContent     = currentUser.role;

  const isSeller = currentUser.role === 'Seller';
  document.querySelectorAll('.seller-only').forEach(el => {
    el.style.display = isSeller ? 'flex' : 'none';
  });

  buildAuthorDropdown();
  renderHome();
  doSearch();
  applyLang();
}

function doLogout() {
  currentUser  = null;
  purchased    = [];
  rawPurchases = [];
  ALL_BOOKS    = [...SEED_BOOKS];
  salesMap     = {};
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
  select.innerHTML = `<option value="">${t('search.allAuthors')}</option>` +
    authors.map(a => `<option>${a}</option>`).join('');
}

function buildCover(book) {
  if (book.coverImage) {
    return `
      <div class="book-cover book-cover-photo">
        <img src="${book.coverImage}" alt="${book.title}">
        <span class="book-badge">${book.genre}</span>
      </div>`;
  }
  const c = COVERS[book.cover % COVERS.length];
  return `
    <div class="book-cover" style="background:${c.bg}">
      <span class="book-cover-emoji">${c.e}</span>
      <div class="book-cover-text">
        <div style="font-family:'Playfair Display',serif;font-size:0.75rem;color:rgba(255,255,255,0.9);font-weight:700;line-height:1.3">${book.title}</div>
        <div style="font-size:0.6rem;color:rgba(255,255,255,0.5);margin-top:3px">${book.author}</div>
      </div>
      <span class="book-badge">${book.genre}</span>
    </div>`;
}

function buildCard(book) {
  const salesCount = salesMap[book.id] || 0;
  const salesBadge = salesCount > 0 ? `<div class="book-sales-badge">🔥 ${salesCount} sold</div>` : '';
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
  return [...ALL_BOOKS].sort((a, b) => b.stock - a.stock).slice(0, 4);
}

function getBestSellers() {
  const withSales = ALL_BOOKS
    .map(b => ({ ...b, sales: salesMap[b.id] || 0 }))
    .filter(b => b.sales > 0)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);
  if (withSales.length > 0) return withSales;
  return [...ALL_BOOKS].sort((a, b) => a.price - b.price).slice(0, 4);
}

function renderHome() {
  document.getElementById('recommended-grid').innerHTML = getRecommended().map(buildCard).join('');
  document.getElementById('bestseller-grid').innerHTML  = getBestSellers().map(buildCard).join('');
  document.getElementById('home-books-grid').innerHTML  = ALL_BOOKS.map(buildCard).join('');
}

// ============================================================
// SEARCH
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
    b.price >= minP && b.price <= maxP
  );

  if (sort === 'asc')  results = results.sort((a, b) => a.price - b.price);
  if (sort === 'desc') results = results.sort((a, b) => b.price - a.price);

  const grid    = document.getElementById('search-books-grid');
  const counter = document.getElementById('results-count');

  if (counter) counter.textContent = t('search.results', { n: results.length });
  if (grid) {
    grid.innerHTML = results.length
      ? results.map(buildCard).join('')
      : `<p style="color:var(--muted);font-size:0.9rem;padding:40px 0">${t('search.noResults')}</p>`;
  }
}

// ============================================================
// MODAL
// ============================================================

function openModal(id) {
  const book = ALL_BOOKS.find(x => String(x.id) === String(id));
  if (!book) return;
  modalBook = book;

  const modalCover  = document.getElementById('modal-cover');
  const modalEmoji  = document.getElementById('modal-cover-emoji');
  const coverTitle  = document.getElementById('modal-cover-title');
  const coverAuthor = document.getElementById('modal-cover-author');

  if (book.coverImage) {
    modalCover.style.background         = '#1a1208';
    modalCover.style.backgroundImage    = `url(${book.coverImage})`;
    modalCover.style.backgroundSize     = 'cover';
    modalCover.style.backgroundPosition = 'center';
    modalEmoji.textContent  = '';
    coverTitle.textContent  = '';
    coverAuthor.textContent = '';
  } else {
    const c = COVERS[book.cover % COVERS.length];
    modalCover.style.background      = c.bg;
    modalCover.style.backgroundImage = '';
    modalEmoji.textContent  = c.e;
    coverTitle.textContent  = book.title;
    coverAuthor.textContent = book.author;
  }

  document.getElementById('modal-genre').textContent  = book.genre;
  document.getElementById('modal-title').textContent  = book.title;
  document.getElementById('modal-author').textContent = book.author;
  document.getElementById('modal-pages').textContent  = book.pages || '—';
  document.getElementById('modal-year').textContent   = book.year  || '—';
  document.getElementById('modal-stock').textContent  = book.stock;
  document.getElementById('modal-desc').textContent   = book.desc;
  document.getElementById('modal-price').textContent  = '₺' + book.price;

  const owned = purchased.some(x => String(x.id) === String(id));
  const btn   = document.getElementById('modal-buy-btn');

  if (currentUser.role === 'Seller') {
    btn.textContent = t('modal.seller');
    btn.className   = 'modal-buy-btn owned';
  } else {
    btn.textContent = owned ? t('modal.purchased') : t('modal.buyNow');
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

  if (!data.success) { showToast(translateServerError(data.error), 'error'); return; }

  purchased.push({ ...modalBook, purchasedAt: new Date() });
  salesMap[modalBook.id] = (salesMap[modalBook.id] || 0) + 1;

  showToast(t('ok.addedToLibrary', { title: modalBook.title }), 'success');

  const btn = document.getElementById('modal-buy-btn');
  btn.textContent = t('modal.purchased');
  btn.className   = 'modal-buy-btn owned';

  renderHome();
  doSearch();
}

// ============================================================
// COVER IMAGE PREVIEW
// ============================================================

function previewCover(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img         = document.getElementById('cover-preview-img');
    const placeholder = document.getElementById('cover-upload-placeholder');
    img.src           = e.target.result;
    img.style.display = 'block';
    placeholder.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function resetCoverUpload() {
  document.getElementById('add-cover-img').value = '';
  const img         = document.getElementById('cover-preview-img');
  const placeholder = document.getElementById('cover-upload-placeholder');
  img.src           = '';
  img.style.display = 'none';
  placeholder.style.display = 'flex';
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
    showToast(t('err.fillRequired'), 'error');
    return;
  }

  // Read cover image as base64 data URL (optional)
  let coverImage = null;
  const coverFile = document.getElementById('add-cover-img').files[0];
  if (coverFile) {
    coverImage = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.readAsDataURL(coverFile);
    });
  }

  const seller = currentUser.name || currentUser.username;
  const cover  = Math.floor(Math.random() * COVERS.length);

  const data = await api('POST', '/api/books', {
    seller, title, author, genre, price, pages, year, stock, cover,
    description: desc,
    coverImage,
  });

  if (!data.success) { showToast(translateServerError(data.error), 'error'); return; }

  ALL_BOOKS.push({ id: 's' + data.bookId, title, author, genre, price, pages, year, stock, cover, desc, seller, coverImage });

  ['add-title','add-author','add-price','add-pages','add-year','add-stock','add-desc'].forEach(id => {
    document.getElementById(id).value = '';
  });
  resetCoverUpload();

  buildAuthorDropdown();
  renderHome();
  doSearch();
  showToast(t('ok.listedSuccess', { title }), 'success');
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
        <p>${t('purchases.empty')}</p>
        <p style="margin-top:6px;font-size:0.78rem">${t('purchases.emptyHint')}</p>
      </div>`;
    return;
  }

  const items = purchased.map(book => {
    const c    = COVERS[book.cover % COVERS.length];
    const date = book.purchasedAt.toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US');
    const coverEl = book.coverImage
      ? `<div class="purchased-cover" style="background:#1a1208;overflow:hidden"><img src="${book.coverImage}" style="width:100%;height:100%;object-fit:cover" alt="${book.title}"></div>`
      : `<div class="purchased-cover" style="background:${c.bg}">${c.e}</div>`;
    return `
      <div class="purchased-item">
        ${coverEl}
        <div class="purchased-details">
          <div class="purchased-title">${book.title}</div>
          <div class="purchased-author">${book.author} · ${book.genre}</div>
          <div class="purchased-date">${t('purchases.on')} ${date}</div>
        </div>
        <div style="text-align:right">
          <div class="purchased-price">₺${book.price}</div>
          <div class="owned-badge" style="display:inline-block;margin-top:6px">${t('purchases.owned')}</div>
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

  if (!currentPassword || !newPassword || !newPassword2) { showToast(t('err.fillAll'), 'error'); return; }
  if (newPassword !== newPassword2)  { showToast(t('err.passMismatch'), 'error'); return; }
  if (newPassword.length < 6)        { showToast(t('err.passShort'),    'error'); return; }

  const username = currentUser.name || currentUser.username;
  const data = await api('PUT', '/api/password', { username, currentPassword, newPassword });

  if (!data.success) { showToast(translateServerError(data.error), 'error'); return; }

  ['cur-pass', 'new-pass', 'new-pass2'].forEach(id => { document.getElementById(id).value = ''; });
  showToast(t('ok.passUpdated'), 'success');
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

// ============================================================
// INIT
// ============================================================

applyLang();

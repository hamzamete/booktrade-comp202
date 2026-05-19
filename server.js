const express              = require('express');
const { DatabaseSync }     = require('node:sqlite');
const path                 = require('path');

const app = express();
const db  = new DatabaseSync(path.join(__dirname, 'database.db'));

// ============================================================
// DATABASE SETUP
// ============================================================

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    username   TEXT UNIQUE NOT NULL,
    email      TEXT NOT NULL,
    password   TEXT NOT NULL,
    role       TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS purchases (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    username     TEXT NOT NULL,
    book_id      INTEGER NOT NULL,
    purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(username, book_id),
    FOREIGN KEY (username) REFERENCES users(username)
  );

  CREATE TABLE IF NOT EXISTS seller_books (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    seller      TEXT NOT NULL,
    title       TEXT NOT NULL,
    author      TEXT NOT NULL,
    genre       TEXT NOT NULL,
    price       REAL NOT NULL,
    pages       INTEGER NOT NULL DEFAULT 0,
    year        INTEGER NOT NULL DEFAULT 2024,
    stock       INTEGER NOT NULL DEFAULT 1,
    cover       INTEGER NOT NULL DEFAULT 0,
    description TEXT NOT NULL DEFAULT '',
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller) REFERENCES users(username)
  );
`);

// Add cover_image column if not yet present (safe to call on existing DB)
try { db.exec('ALTER TABLE seller_books ADD COLUMN cover_image TEXT DEFAULT NULL'); } catch {}

// Prepared statements
const stmts = {
  findUser:        db.prepare('SELECT * FROM users WHERE username = ?'),
  insertUser:      db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)'),
  updatePassword:  db.prepare('UPDATE users SET password = ? WHERE username = ?'),
  getPurchases:    db.prepare('SELECT book_id, purchased_at FROM purchases WHERE username = ?'),
  insertPurchase:  db.prepare('INSERT INTO purchases (username, book_id) VALUES (?, ?)'),
  getAllUsers:      db.prepare('SELECT username, email, role, created_at FROM users ORDER BY created_at DESC'),
  countPurchases:  db.prepare('SELECT username, COUNT(*) as total FROM purchases GROUP BY username'),
  insertBook:      db.prepare('INSERT INTO seller_books (seller, title, author, genre, price, pages, year, stock, cover, description, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'),
  getAllBooks:      db.prepare('SELECT * FROM seller_books ORDER BY created_at DESC'),
  countBookSales:  db.prepare('SELECT book_id, COUNT(*) as sales FROM purchases GROUP BY book_id'),
};

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// ============================================================
// API ROUTES
// ============================================================

// POST /api/register
app.post('/api/register', (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.json({ success: false, error: 'Please fill in all fields.' });
  }

  try {
    stmts.insertUser.run(username, email, password, role);
    res.json({ success: true, user: { username, role } });
  } catch {
    res.json({ success: false, error: 'Username already taken.' });
  }
});

// POST /api/login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = stmts.findUser.get(username);
  if (!user)                      return res.json({ success: false, error: 'User not found. Please register first.' });
  if (user.password !== password) return res.json({ success: false, error: 'Incorrect password.' });

  const purchases = stmts.getPurchases.all(username);
  res.json({
    success: true,
    user: { username: user.username, role: user.role },
    purchases,
  });
});

// POST /api/purchase
app.post('/api/purchase', (req, res) => {
  const { username, bookId } = req.body;
  if (!username || bookId == null) return res.json({ success: false, error: 'Missing fields.' });

  try {
    stmts.insertPurchase.run(username, bookId);
    res.json({ success: true });
  } catch {
    res.json({ success: false, error: 'Already purchased.' });
  }
});

// PUT /api/password
app.put('/api/password', (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  const user = stmts.findUser.get(username);
  if (!user || user.password !== currentPassword) {
    return res.json({ success: false, error: 'Current password is incorrect.' });
  }

  stmts.updatePassword.run(newPassword, username);
  res.json({ success: true });
});

// POST /api/books  — seller adds a book
app.post('/api/books', (req, res) => {
  const { seller, title, author, genre, price, pages, year, stock, cover, description, coverImage } = req.body;

  if (!seller || !title || !author || !genre || price == null) {
    return res.json({ success: false, error: 'Please fill in all required fields.' });
  }

  const coverIdx = Number(cover) || 0;
  const result = stmts.insertBook.run(
    seller, title, author, genre,
    Number(price),
    Number(pages) || 0,
    Number(year)  || new Date().getFullYear(),
    Number(stock) || 1,
    coverIdx,
    description || '',
    coverImage || null
  );

  res.json({ success: true, bookId: result.lastInsertRowid });
});

// GET /api/books  — all seller-added books
app.get('/api/books', (req, res) => {
  const books = stmts.getAllBooks.all();
  res.json({ success: true, books });
});

// GET /api/sales  — sales count per book_id
app.get('/api/sales', (req, res) => {
  const rows = stmts.countBookSales.all();
  // returns: [{ book_id, sales }, ...]
  res.json({ success: true, sales: rows });
});

// ============================================================
// START
// ============================================================

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Folyo running → http://localhost:${PORT}`);
});

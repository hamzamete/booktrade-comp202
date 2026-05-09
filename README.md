# Folyo — Book Market

Node.js + Express + SQLite ile geliştirilmiş kitap alım-satım uygulaması.

---

## Kurulum

### Gereksinimler
- Node.js v22.5 veya üstü

### Adımlar

```bash
# 1. Repoyu klonla
git clone https://github.com/hamzamete/booktrade-comp202.git
cd booktrade-comp202

# 2. Bağımlılıkları yükle
npm install

# 3. Sunucuyu başlat
npm start
```

Tarayıcıda aç: **http://localhost:3000**

> İlk çalıştırmada `database.db` dosyası otomatik oluşur, tablo kurulumu da otomatik yapılır. Ekstra bir şey yapmana gerek yok.

---

## Proje Yapısı

```
├── index.html       # Arayüz (HTML)
├── style.css        # Stiller
├── app.js           # Frontend mantığı (fetch API)
├── server.js        # Backend (Express + SQLite)
├── package.json     # Bağımlılıklar
└── database.db      # Veritabanı (otomatik oluşur, git'e eklenmez)
```

---

## Özellikler

- Kullanıcı kayıt ve girişi (SQLite'a kaydedilir)
- Alıcı / Satıcı hesap türü seçimi
- Kitap arama ve filtreleme (yazar, tür, fiyat aralığı)
- Kitap satın alma ve kütüphane takibi
- Şifre güncelleme
- Veriler kalıcı — sayfa yenilenince veya tekrar giriş yapınca kaybolmaz

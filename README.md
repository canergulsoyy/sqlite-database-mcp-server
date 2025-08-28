# 🗄️ Database MCP Server

[![Node.js](https://img.shields.io/badge/Node.js-18.18.0+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![MCP](https://img.shields.io/badge/MCP-1.3.0-orange.svg)](https://modelcontextprotocol.io/)

**Database MCP Server**, Model Context Protocol (MCP) kullanarak veritabanı sorgulama yetenekleri sunan modern bir Node.js uygulamasıdır. LLM entegrasyonu ile doğal dil kullanarak veritabanı sorguları yapabilirsiniz.

## ✨ Özellikler

- 🚀 **MCP 1.3.0** protokol desteği
- 🗄️ **SQLite** veritabanı entegrasyonu
- 🤖 **LLM entegrasyonu** (OpenAI/OpenRouter)
- 🔍 **Gelişmiş sorgu filtreleme** ve arama
- 📊 **Gerçek zamanlı istatistikler** ve raporlama
- 🛡️ **Güvenli SQL sorguları** (sadece SELECT)
- 📱 **Interactive CLI** arayüzü
- 🧪 **Otomatik test** senaryoları
- 🔧 **TypeScript** ile tam tip güvenliği

## 🏗️ Mimari

```
src/
├── index.ts              # MCP Server ana dosyası
├── database/
│   ├── setup.ts         # Veritabanı yönetimi
│   ├── query-service.ts # Sorgu servisleri
│   └── seed.ts          # Örnek veri ekleme
└── client/
    ├── index.ts         # CLI arayüzü
    └── weather-client.ts # LLM client
```

## 🚀 Hızlı Başlangıç

### Gereksinimler

- **Node.js** >= 18.18.0
- **npm** veya **yarn**
- **OpenRouter API Key** (ücretsiz)

### Kurulum

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/canergulsoyy/database-mcp-server.git
cd database-mcp-server
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment dosyasını oluşturun**
```bash
cp env.example .env
```

4. **OpenRouter API key'inizi ekleyin**
```bash
# .env dosyasını düzenleyin
OPENROUTER_API_KEY=your_api_key_here
```

5. **Projeyi build edin**
```bash
npm run build
```

6. **Veritabanını kurun**
```bash
npm run db:setup
npm run db:seed
```

### Çalıştırma

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

#### Interactive CLI
```bash
npm run client:dev
```

#### Test Client
```bash
npm run test:client
```

## 📚 Kullanım

### MCP Tools

#### 1. Health Check
```typescript
"health_check": {
    title: "Database Health Check",
    description: "Veritabanı ve sunucu sağlık kontrolü"
}
```

#### 2. User Management
```typescript
"get_users": {
    title: "Kullanıcıları Getir",
    description: "Kullanıcı bilgilerini filtreleme ile getirir",
    inputSchema: {
        name: "Kullanıcı adında arama",
        city: "Şehir bazında filtreleme",
        minAge/maxAge: "Yaş aralığı",
        email: "Email arama"
    }
}
```

#### 3. Product Management
```typescript
"get_products": {
    title: "Ürünleri Getir",
    description: "Ürün bilgilerini kategorilere göre getirir",
    inputSchema: {
        name: "Ürün adı arama",
        category: "Kategori filtreleme",
        minPrice/maxPrice: "Fiyat aralığı",
        inStock: "Stok durumu"
    }
}
```

#### 4. Order Management
```typescript
"get_orders": {
    title: "Siparişleri Getir",
    description: "Sipariş bilgilerini detaylı olarak getirir",
    inputSchema: {
        userId: "Kullanıcı ID'si",
        productId: "Ürün ID'si",
        status: "Sipariş durumu",
        minTotal/maxTotal: "Toplam tutar aralığı"
    }
}
```

#### 5. Database Statistics
```typescript
"get_database_stats": {
    title: "Veritabanı İstatistikleri",
    description: "Genel veritabanı istatistikleri ve analizler"
}
```

#### 6. Custom SQL Queries
```typescript
"execute_custom_query": {
    title: "Özel SQL Sorgusu",
    description: "Güvenli SELECT sorguları çalıştırır",
    inputSchema: {
        sql: "SELECT sorgusu",
        params: "Sorgu parametreleri"
    }
}
```

### Örnek Kullanımlar

#### CLI ile Sorgulama
```bash
npm run client:dev

# Örnek sorular:
🤔 Sorunuz: İstanbul'da yaşayan kullanıcıları göster
🤔 Sorunuz: Elektronik kategorisindeki ürünleri listele
🤔 Sorunuz: Tamamlanan siparişleri göster
🤔 Sorunuz: Veritabanı istatistiklerini göster
```

#### Programmatic Usage
```typescript
import { DatabaseLLMClient } from './dist/client/weather-client.js';

const client = new DatabaseLLMClient('./dist/index.js');
await client.initialize();

const response = await client.processQuestion("En pahalı 5 ürünü getir");
console.log(response);
```

## 🗄️ Veritabanı Şeması

### Users Tablosu
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER,
    city TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Products Tablosu
```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Tablosu
```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
);
```

## 🔧 API Reference

### DatabaseQueryService

#### getUsers(query: UserQuery): Promise<QueryResult>
```typescript
interface UserQuery {
    name?: string;      // Kullanıcı adında arama
    city?: string;      // Şehir bazında filtreleme
    minAge?: number;    // Minimum yaş
    maxAge?: number;    // Maksimum yaş
    email?: string;     // Email arama
}
```

#### getProducts(query: ProductQuery): Promise<QueryResult>
```typescript
interface ProductQuery {
    name?: string;      // Ürün adı arama
    category?: string;  // Kategori filtreleme
    minPrice?: number;  // Minimum fiyat
    maxPrice?: number;  // Maksimum fiyat
    inStock?: boolean;  // Stok durumu
}
```

#### getOrders(query: OrderQuery): Promise<QueryResult>
```typescript
interface OrderQuery {
    userId?: number;    // Kullanıcı ID'si
    productId?: number; // Ürün ID'si
    status?: string;    // Sipariş durumu
    minTotal?: number;  // Minimum toplam tutar
    maxTotal?: number;  // Maksimum toplam tutar
}
```

## 🧪 Test

### Otomatik Test
```bash
npm run test:client
```

### Manuel Test
```bash
# Server'ı başlat
npm run dev

# Yeni terminal'de client'ı başlat
npm run client:dev
```

## 📦 Scripts

| Script | Açıklama |
|--------|----------|
| `build` | TypeScript compilation |
| `dev` | Development mode |
| `start` | Production mode |
| `db:setup` | Veritabanı kurulumu |
| `db:seed` | Örnek veri ekleme |
| `test:client` | Otomatik test |
| `client:dev` | Interactive CLI |
| `typecheck` | Type checking |

## 🔐 Güvenlik

- ✅ **SQL Injection koruması** - Parametrized queries
- ✅ **Sadece SELECT sorguları** - Güvenli sorgu çalıştırma
- ✅ **Input validation** - Zod schema validation
- ✅ **Foreign key constraints** - Veri bütünlüğü
- ✅ **Unique constraints** - Duplicate data önleme

## 🚀 Deployment

### Docker ile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables
```bash
# Gerekli
OPENROUTER_API_KEY=your_api_key_here

# Opsiyonel
MCP_SERVER_PATH=./dist/index.js
DB_PATH=./data/app.db
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

## 🤝 Katkıda Bulunma

1. **Fork** yapın
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** yapın (`git commit -m 'Add amazing feature'`)
4. **Push** yapın (`git push origin feature/amazing-feature`)
5. **Pull Request** oluşturun

### Development Setup
```bash
# Repository'yi klonlayın
git clone https://github.com/canergulsoyy/database-mcp-server.git

# Development branch'e geçin
git checkout develop

# Bağımlılıkları yükleyin
npm install

# Pre-commit hooks kurun
npm run prepare
```

## 📄 License

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

## 🙏 Teşekkürler

- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP protokolü
- [OpenRouter](https://openrouter.ai/) - LLM API servisi
- [SQLite](https://www.sqlite.org/) - Veritabanı motoru
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği

## 📞 İletişim

- **Author**: Caner Gülsoy
- **GitHub**: [@canergulsoyy](https://github.com/canergulsoyy)
- **Email**: canergulsoyy@gmail.com
- **Project**: [https://github.com/canergulsoyy/database-mcp-server](https://github.com/canergulsoyy/database-mcp-server)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 
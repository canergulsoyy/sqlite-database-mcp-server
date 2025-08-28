# 🗄️ Database MCP Server


## 🎯 Proje Hakkında

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

## 🚀 Hızlı Başlangıç

### Gereksinimler
- **Node.js** >= 18.18.0
- **npm** veya **yarn**
- **OpenRouter API Key** (ücretsiz)

### Kurulum
```bash
# Repository'yi klonlayın
git clone https://github.com/canergulsoyy/database-mcp-server.git
cd database-mcp-server

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp env.example .env

# OpenRouter API key'inizi ekleyin
# .env dosyasını düzenleyin

# Projeyi build edin
npm run build

# Veritabanını kurun
npm run db:setup
npm run db:seed

# Server'ı başlatın
npm start
```

### Kullanım
```bash
# Interactive CLI
npm run client:dev

# Test client
npm run test:client

# Development mode
npm run dev
```

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

## 🗄️ MCP Tools

- **health_check** - Veritabanı sağlık kontrolü
- **get_users** - Kullanıcı yönetimi
- **get_products** - Ürün yönetimi
- **get_orders** - Sipariş yönetimi
- **get_database_stats** - Veritabanı istatistikleri
- **execute_custom_query** - Özel SQL sorguları

## 📚 Dokümantasyon

- **[README.md](README.md)** - Ana dokümantasyon
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Katkıda bulunma rehberi
- **[CHANGELOG.md](CHANGELOG.md)** - Sürüm değişiklikleri
- **[SECURITY.md](SECURITY.md)** - Güvenlik politikası
- **[SUPPORT.md](.github/SUPPORT.md)** - Destek ve yardım

## 🤝 Katkıda Bulunma

Bu projeye katkıda bulunmak istiyorsanız:

1. **Fork** yapın
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** yapın (`git commit -m 'Add amazing feature'`)
4. **Push** yapın (`git push origin feature/amazing-feature`)
5. **Pull Request** oluşturun

Detaylı bilgi için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını inceleyin.


## 🚀 Deployment

### Docker ile
```bash
# Production
docker-compose up

# Development
docker-compose --profile dev up

# Test
docker-compose --profile test up
```

### Manuel Kurulum
```bash
npm run build
npm start
```

## 🔐 Güvenlik

Güvenlik açıklarını özel olarak rapor edin:
- **Email**: security@yourdomain.com
- **GPG Key**: [Download](link-to-gpg-key)

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
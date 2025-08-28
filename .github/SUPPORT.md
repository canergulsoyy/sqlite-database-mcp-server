# 🆘 Support & Help

## 📋 İçindekiler

- [Hızlı Yardım](#hızlı-yardım)
- [Sık Sorulan Sorular](#sık-sorulan-sorular)
- [Dokümantasyon](#dokümantasyon)
- [Topluluk Desteği](#topluluk-desteği)
- [Profesyonel Destek](#profesyonel-destek)
- [İletişim](#iletişim)

## 🚀 Hızlı Yardım

### 🔧 Kurulum Sorunları

#### "npm install" hatası
```bash
# Node.js versiyonunu kontrol edin
node --version  # >= 18.18.0 olmalı

# npm cache'ini temizleyin
npm cache clean --force

# node_modules'u silin ve yeniden yükleyin
rm -rf node_modules package-lock.json
npm install
```

#### "Database connection failed" hatası
```bash
# Veritabanı dizinini oluşturun
mkdir -p data

# Veritabanını kurun
npm run db:setup

# Örnek verileri ekleyin
npm run db:seed
```

#### "OPENROUTER_API_KEY not found" hatası
```bash
# .env dosyasını oluşturun
cp env.example .env

# API key'inizi ekleyin
echo "OPENROUTER_API_KEY=your_api_key_here" >> .env
```

### 🐛 Çalışma Zamanı Hataları

#### Server başlatılamıyor
```bash
# Port kullanımını kontrol edin
lsof -i :3000

# Farklı port kullanın
PORT=3001 npm run dev
```

#### MCP Client bağlantı hatası
```bash
# Server'ın çalıştığından emin olun
npm run dev

# Yeni terminal'de client'ı başlatın
npm run client:dev
```

## ❓ Sık Sorulan Sorular

### Genel Sorular

#### Q: Database MCP Server nedir?
**A:** Database MCP Server, Model Context Protocol (MCP) kullanarak veritabanı sorgulama yetenekleri sunan modern bir Node.js uygulamasıdır. LLM entegrasyonu ile doğal dil kullanarak veritabanı sorguları yapabilirsiniz.

#### Q: Hangi veritabanlarını destekler?
**A:** Şu anda SQLite desteklenmektedir. PostgreSQL, MySQL ve MongoDB desteği gelecek sürümlerde eklenecektir.

#### Q: Ücretsiz mi?
**A:** Evet, açık kaynak ve MIT lisansı altında ücretsizdir. Sadece OpenRouter API key'inize ihtiyacınız var.

### Teknik Sorular

#### Q: Node.js 16 kullanabilir miyim?
**A:** Hayır, Node.js 18.18.0 veya üzeri gereklidir. ES2022 özellikleri kullanılmaktadır.

#### Q: Docker olmadan çalıştırabilir miyim?
**A:** Evet, doğrudan Node.js ile çalıştırabilirsiniz. Docker sadece kolaylık sağlar.

#### Q: Production'da kullanabilir miyim?
**A:** Evet, production-ready'dir. Güvenlik özellikleri ve error handling eklenmiştir.

### API ve Entegrasyon

#### Q: Kendi LLM'im ile entegre edebilir miyim?
**A:** Evet, MCP protokolü sayesinde farklı LLM'ler ile entegre edilebilir.

#### Q: REST API var mı?
**A:** Şu anda sadece MCP protokolü desteklenmektedir. REST API gelecek sürümlerde eklenecektir.

#### Q: Web arayüzü var mı?
**A:** Şu anda sadece CLI arayüzü mevcuttur. Web dashboard gelecek sürümlerde eklenecektir.

## 📚 Dokümantasyon

### 📖 Ana Dokümantasyon
- **[README.md](README.md)** - Proje genel bakış ve kurulum
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Katkıda bulunma rehberi
- **[CHANGELOG.md](CHANGELOG.md)** - Sürüm değişiklikleri
- **[SECURITY.md](SECURITY.md)** - Güvenlik politikası

### 🔧 Teknik Dokümantasyon
- **[API Reference](docs/api.md)** - API dokümantasyonu
- **[Database Schema](docs/database.md)** - Veritabanı şeması
- **[Deployment Guide](docs/deployment.md)** - Deployment rehberi
- **[Troubleshooting](docs/troubleshooting.md)** - Sorun giderme

### 🎥 Video Tutorials
- **[Getting Started](link-to-video)** - Başlangıç rehberi
- **[Advanced Usage](link-to-video)** - Gelişmiş kullanım
- **[Troubleshooting](link-to-video)** - Sorun giderme
- **[Best Practices](link-to-video)** - En iyi uygulamalar

## 👥 Topluluk Desteği

### 💬 GitHub Discussions
- **[General Discussion](link-to-discussions)** - Genel tartışmalar
- **[Q&A](link-to-qa)** - Soru-cevap
- **[Show & Tell](link-to-showcase)** - Projeler ve örnekler
- **[Ideas](link-to-ideas)** - Öneriler ve fikirler

### 🐛 GitHub Issues
- **[Bug Reports](link-to-bugs)** - Hata raporları
- **[Feature Requests](link-to-features)** - Özellik istekleri
- **[Documentation](link-to-docs)** - Dokümantasyon istekleri

### 📱 Sosyal Medya
- **[Discord](link-to-discord)** - Canlı sohbet ve destek
- **[Twitter](link-to-twitter)** - Güncellemeler ve duyurular
- **[LinkedIn](link-to-linkedin)** - Profesyonel ağ
- **[YouTube](link-to-youtube)** - Video içerikler

### 🌐 Topluluk Kaynakları
- **[Community Wiki](link-to-wiki)** - Topluluk bilgi bankası
- **[FAQ](link-to-faq)** - Sık sorulan sorular
- **[Tutorials](link-to-tutorials)** - Topluluk tutorial'ları
- **[Examples](link-to-examples)** - Örnek projeler

## 🏢 Profesyonel Destek

### 💼 Enterprise Support
- **24/7 Support**: Kritik iş süreçleri için
- **Custom Development**: Özel geliştirmeler
- **Training**: Ekip eğitimleri
- **Consulting**: Mimari danışmanlık

### 🔧 Technical Support
- **Priority Support**: Hızlı yanıt garantisi
- **Remote Assistance**: Uzaktan yardım
- **Performance Optimization**: Performans iyileştirme
- **Security Audit**: Güvenlik denetimi

### 📊 Support Plans

| Plan | Response Time | Features | Price |
|------|---------------|----------|-------|
| **Community** | 48-72 hours | GitHub Issues, Discussions | Free |
| **Standard** | 24 hours | Email Support, Documentation | $99/month |
| **Professional** | 8 hours | Phone Support, Priority Issues | $299/month |
| **Enterprise** | 2 hours | 24/7 Support, Custom Development | Custom |

## 📞 İletişim

### 🆘 Acil Destek
- **Emergency Hotline**: +1-XXX-XXX-XXXX
- **Emergency Email**: emergency@yourdomain.com
- **Slack**: #emergency-support

### 📧 Genel İletişim
- **Support Email**: support@yourdomain.com
- **Sales Email**: sales@yourdomain.com
- **General Email**: hello@yourdomain.com

### 🏢 Şirket Bilgileri
- **Company**: Your Company Name
- **Address**: Your Address
- **Phone**: +1-XXX-XXX-XXXX
- **Website**: https://yourdomain.com

### 🕒 Çalışma Saatleri
- **Monday - Friday**: 9:00 AM - 6:00 PM (UTC+3)
- **Saturday**: 10:00 AM - 2:00 PM (UTC+3)
- **Sunday**: Closed
- **Holidays**: Closed

## 🚀 Hızlı Başlangıç

### 1. Kurulum
```bash
git clone https://github.com/canergulsoyy/database-mcp-server.git
cd database-mcp-server
npm install
```

### 2. Konfigürasyon
```bash
cp env.example .env
# .env dosyasını düzenleyin
```

### 3. Çalıştırma
```bash
npm run build
npm run db:setup
npm run db:seed
npm start
```

### 4. Test
```bash
npm run test:client
```

## 📋 Destek Talebi

Destek almak için:

1. **[GitHub Issues](link-to-issues)** - Teknik sorunlar için
2. **[GitHub Discussions](link-to-discussions)** - Genel sorular için
3. **[Email Support](mailto:support@yourdomain.com)** - Özel destek için
4. **[Phone Support](tel:+1-XXX-XXX-XXXX)** - Acil durumlar için

---

## 🙏 Teşekkürler

Database MCP Server topluluğuna destek verdiğiniz için teşekkürler! Birlikte daha iyi bir proje oluşturuyoruz.

**Not**: Destek alırken mümkün olduğunca detaylı bilgi verin. Bu, sorununuzu daha hızlı çözmemize yardımcı olur. 
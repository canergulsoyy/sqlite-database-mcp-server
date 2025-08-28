---
name: 🌐 Translation
about: Request translations or report translation issues
title: '[I18N] '
labels: ['translation', 'i18n', 'needs-triage']
assignees: ''
---

## 🌐 Translation Issue

### 🔍 Issue Type

<!-- Uygun olanları işaretleyin -->

- [ ] 🌍 New language request
- [ ] 🔧 Translation improvement
- [ ] ❌ Incorrect translation
- [ ] 📝 Missing translation
- [ ] 🎯 Context clarification
- [ ] 💡 Translation suggestion
- [ ] 📚 Documentation translation
- [ ] 🏷️ Label translation

## 📋 Details

### Language Information

<!-- Dil bilgileri -->

**Target Language**: <!-- e.g. Turkish, Spanish, French, German, Japanese -->
**Language Code**: <!-- e.g. tr, es, fr, de, ja -->
**Native Speaker**: <!-- Are you a native speaker? Yes/No -->
**Proficiency Level**: <!-- Beginner, Intermediate, Advanced, Native -->

### Translation Request

<!-- Çeviri isteği detayları -->

### Current Text

<!-- Mevcut metin (İngilizce) -->

### Desired Translation

<!-- İstenen çeviri -->

### Context

<!-- Bağlam ve kullanım alanı -->

## 🔍 Scope

### Components to Translate

<!-- Çevrilecek bileşenler -->

- [ ] User interface (CLI)
- [ ] Error messages
- [ ] Help text
- [ ] Documentation
- [ ] README files
- [ ] API responses
- [ ] Configuration files
- [ ] Other: <!-- specify -->

### Priority Level

<!-- Öncelik seviyesi -->

- [ ] 🔴 Critical - Core functionality
- [ ] 🟠 High - User experience
- [ ] 🟡 Medium - Documentation
- [ ] 🔵 Low - Nice to have

## 🌍 Language Support

### Current Languages

<!-- Mevcut diller -->

- [x] **English** (en) - Primary language
- [ ] **Turkish** (tr) - In progress
- [ ] **Spanish** (es) - Not started
- [ ] **French** (fr) - Not started
- [ ] **German** (de) - Not started
- [ ] **Japanese** (ja) - Not started
- [ ] **Chinese** (zh) - Not started
- [ ] **Other**: <!-- specify -->

### Translation Status

<!-- Çeviri durumu -->

| Component | English | Turkish | Spanish | French | German |
|-----------|---------|---------|---------|--------|--------|
| CLI Interface | ✅ 100% | 🟡 60% | ❌ 0% | ❌ 0% | ❌ 0% |
| Error Messages | ✅ 100% | 🟡 80% | ❌ 0% | ❌ 0% | ❌ 0% |
| Documentation | ✅ 100% | 🟡 40% | ❌ 0% | ❌ 0% | ❌ 0% |
| README | ✅ 100% | 🟡 70% | ❌ 0% | ❌ 0% | ❌ 0% |

## 📝 Translation Guidelines

### Style Guide

<!-- Stil rehberi -->

- **Formal vs Informal**: <!-- Formal or informal tone? -->
- **Technical Terms**: <!-- How to handle technical terms? -->
- **Cultural Adaptation**: <!-- Any cultural considerations? -->
- **Length Constraints**: <!-- Any length limitations? -->

### Terminology

<!-- Terminoloji -->

- **Consistent Terms**: <!-- Maintain consistency with existing translations -->
- **Technical Jargon**: <!-- Translate or transliterate? -->
- **Brand Names**: <!-- Keep original or translate? -->
- **Abbreviations**: <!-- Expand or keep abbreviated? -->

## 🧪 Quality Assurance

### Review Process

<!-- İnceleme süreci -->

- [ ] Self-review completed
- [ ] Peer review completed
- [ ] Native speaker review
- [ ] Technical accuracy verified
- [ ] Cultural appropriateness checked
- [ ] Consistency verified

### Testing

<!-- Test süreci -->

- [ ] Translation displayed correctly
- [ ] No text overflow issues
- [ ] Proper encoding (UTF-8)
- [ ] Right-to-left support (if applicable)
- [ ] Context maintained
- [ ] User experience preserved

## 💡 Implementation

### File Structure

<!-- Dosya yapısı -->

```
locales/
├── en/
│   ├── cli.json
│   ├── errors.json
│   └── help.json
├── tr/
│   ├── cli.json
│   ├── errors.json
│   └── help.json
└── es/
    ├── cli.json
    ├── errors.json
    └── help.json
```

### Translation Keys

<!-- Çeviri anahtarları -->

```json
{
  "cli": {
    "welcome": "Welcome to Database MCP Server",
    "help": "Type 'help' for available commands",
    "error": "An error occurred"
  },
  "errors": {
    "database_connection": "Database connection failed",
    "invalid_query": "Invalid query syntax",
    "permission_denied": "Permission denied"
  }
}
```

## 📊 Progress Tracking

### Translation Progress

<!-- Çeviri ilerlemesi -->

- **Total Strings**: <!-- Total number of strings to translate -->
- **Completed**: <!-- Number of completed translations -->
- **Remaining**: <!-- Number of remaining translations -->
- **Completion Rate**: <!-- Percentage of completion -->

### Timeline

<!-- Zaman çizelgesi -->

- **Start Date**: <!-- When did you start? -->
- **Target Date**: <!-- When do you plan to finish? -->
- **Estimated Hours**: <!-- How many hours will it take? -->

## 📝 Checklist

- [ ] Issue type seçildi
- [ ] Dil bilgileri sağlandı
- [ ] Çeviri isteği detaylandırıldı
- [ ] Kapsam belirlendi
- [ ] Öncelik seviyesi belirlendi
- [ ] Mevcut dil desteği kontrol edildi
- [ ] Çeviri rehberi incelendi
- [ ] Kalite güvencesi süreci planlandı
- [ ] Uygulama detayları belirtildi
- [ ] İlerleme takibi planlandı
- [ ] Uygun etiketler eklendi

## 🎯 Priority

<!-- Öncelik seviyesi -->

- [ ] 🔴 Critical - Core functionality
- [ ] 🟠 High - User experience
- [ ] 🟡 Medium - Documentation
- [ ] 🔵 Low - Nice to have

## 🏷️ Labels

<!-- Uygun etiketleri ekleyin -->
- [ ] `translation`
- [ ] `i18n`
- [ ] `localization`
- [ ] `language`
- [ ] `documentation`
- [ ] `user-experience`
- [ ] `cli`
- [ ] `help`

---

## 🌍 Internationalization Commitment

Database MCP Server is committed to being accessible to users worldwide. We support multiple languages and welcome translation contributions.

**Remember**: Good translations maintain the technical accuracy while being culturally appropriate and natural to native speakers.

For translation support:
- **Email**: i18n@yourdomain.com
- **Documentation**: [Translation Guide](link-to-translation-guide)
- **Resources**: [Localization Best Practices](link-to-localization-guide) 
---
name: 🔐 Security
about: Report security vulnerabilities or security-related issues
title: '[SECURITY] '
labels: ['security', 'needs-triage']
assignees: ''
---

## 🔐 Security Issue

### 🚨 IMPORTANT

**DO NOT post security vulnerabilities publicly!** This template is for reporting security issues privately to the security team.

For security vulnerabilities, please:
1. **Email**: security@yourdomain.com
2. **GPG Key**: [Download GPG Key](link-to-gpg-key)
3. **HackerOne**: [Security Program](link-to-hackerone)

### 🔍 Issue Type

<!-- Uygun olanları işaretleyin -->

- [ ] 🚨 Security vulnerability
- [ ] 🔒 Security configuration issue
- [ ] 🛡️ Security feature request
- [ ] 📊 Security audit finding
- [ ] 🔍 Security testing issue
- [ ] 📝 Security documentation
- [ ] 🚪 Access control issue
- [ ] 💡 Security improvement suggestion

## 📋 Details

### Security Concern

<!-- Güvenlik endişesini detaylı açıklayın -->

### Vulnerability Description

<!-- Güvenlik açığının açıklaması -->

### Impact Assessment

<!-- Etki değerlendirmesi -->

- [ ] 🔴 Critical - System compromise
- [ ] 🟠 High - Data breach
- [ ] 🟡 Medium - Information disclosure
- [ ] 🔵 Low - Minor security issue

### Attack Vector

<!-- Saldırı vektörü -->

- [ ] SQL Injection
- [ ] XSS (Cross-Site Scripting)
- [ ] CSRF (Cross-Site Request Forgery)
- [ ] Authentication bypass
- [ ] Authorization bypass
- [ ] Information disclosure
- [ ] Denial of Service
- [ ] Other: <!-- specify -->

## 🔍 Technical Details

### Environment

<!-- Test ortamı bilgileri -->

- **OS**: <!-- e.g. Ubuntu 22.04 -->
- **Node.js**: <!-- e.g. 18.18.0 -->
- **Database**: <!-- e.g. SQLite 3.40.0 -->
- **Version**: <!-- e.g. 1.0.0 -->

### Proof of Concept

<!-- Güvenlik açığını kanıtlayan kod veya komutlar -->

```bash
# Example PoC (sanitize sensitive data)
curl "http://localhost:3000/api/users?id=1' OR 1=1--"
```

### Reproduction Steps

<!-- Güvenlik açığını tekrar etmek için adımlar -->

1. **Setup**: <!-- Test ortamını hazırlayın -->
2. **Action**: <!-- Hangi işlemi yapın -->
3. **Observe**: <!-- Ne gözlemlediniz -->

### Affected Components

<!-- Etkilenen bileşenler -->

- [ ] Database layer
- [ ] API endpoints
- [ ] Authentication system
- [ ] Authorization system
- [ ] Input validation
- [ ] Output encoding
- [ ] Configuration files
- [ ] Other: <!-- specify -->

## 🛡️ Security Analysis

### Current Security Measures

<!-- Mevcut güvenlik önlemleri -->

- [ ] Input validation
- [ ] Output encoding
- [ ] Authentication
- [ ] Authorization
- [ ] Rate limiting
- [ ] HTTPS enforcement
- [ ] Security headers
- [ ] Other: <!-- specify -->

### Security Gaps

<!-- Güvenlik boşlukları -->

### Recommended Fixes

<!-- Önerilen düzeltmeler -->

## 📊 Risk Assessment

### Severity Matrix

| Impact | Likelihood | Risk Level |
|--------|------------|------------|
| High | High | 🔴 Critical |
| High | Medium | 🟠 High |
| Medium | High | 🟠 High |
| Medium | Medium | 🟡 Medium |
| Low | Any | 🔵 Low |

### Business Impact

<!-- İş etkisi -->

- [ ] Financial loss
- [ ] Data breach
- [ ] Reputation damage
- [ ] Compliance violation
- [ ] Service disruption
- [ ] Other: <!-- specify -->

## 🔧 Mitigation

### Immediate Actions

<!-- Acil eylemler -->

### Long-term Solutions

<!-- Uzun vadeli çözümler -->

### Prevention Measures

<!-- Önleme önlemleri -->

## 🧪 Security Testing

### Tests Performed

<!-- Yapılan güvenlik testleri -->

- [ ] Vulnerability scanning
- [ ] Penetration testing
- [ ] Code review
- [ ] Security audit
- [ ] Threat modeling
- [ ] Other: <!-- specify -->

### Tools Used

<!-- Kullanılan araçlar -->

- [ ] OWASP ZAP
- [ ] Burp Suite
- [ ] SQLMap
- [ ] Nmap
- [ ] Custom scripts
- [ ] Other: <!-- specify -->

## 📝 Checklist

- [ ] Issue type seçildi
- [ ] Güvenlik endişesi detaylı açıklandı
- [ ] Etki değerlendirmesi yapıldı
- [ ] Teknik detaylar sağlandı
- [ ] Proof of Concept eklendi
- [ ] Tekrar etme adımları yazıldı
- [ ] Etkilenen bileşenler belirtildi
- [ ] Güvenlik analizi yapıldı
- [ ] Risk değerlendirmesi tamamlandı
- [ ] Azaltma önerileri sunuldu
- [ ] Güvenlik testleri belirtildi
- [ ] Uygun etiketler eklendi

## 🎯 Priority

<!-- Öncelik seviyesi -->

- [ ] 🔴 Critical - Immediate action required
- [ ] 🟠 High - Action required within 24 hours
- [ ] 🟡 Medium - Action required within 1 week
- [ ] 🔵 Low - Action required within 1 month

## 🏷️ Labels

<!-- Uygun etiketleri ekleyin -->
- [ ] `security`
- [ ] `high-priority`
- [ ] `vulnerability`
- [ ] `authentication`
- [ ] `authorization`
- [ ] `input-validation`
- [ ] `sql-injection`
- [ ] `xss`

---

## 🔒 Security Commitment

Database MCP Server takes security seriously. All security reports are reviewed and addressed promptly.

**Remember**: Never post security vulnerabilities publicly. Always report them through private channels.

For immediate security concerns:
- **Email**: security@yourdomain.com
- **GPG Key**: [Download](link-to-gpg-key)
- **Emergency**: +1-XXX-XXX-XXXX 
---
name: ♿ Accessibility
about: Report accessibility issues or suggest improvements
title: '[A11Y] '
labels: ['accessibility', 'needs-triage']
assignees: ''
---

## ♿ Accessibility Issue

### 🔍 Issue Type

<!-- Uygun olanları işaretleyin -->

- [ ] 🚫 Missing alt text
- [ ] 🎨 Color contrast issues
- [ ] ⌨️ Keyboard navigation problems
- [ ] 🗣️ Screen reader compatibility
- [ ] 📱 Mobile accessibility
- [ ] 🔍 Focus management
- [ ] 📝 Form accessibility
- [ ] 💡 Accessibility improvement suggestion

## 📋 Details

### Accessibility Problem

<!-- Erişilebilirlik sorununu detaylı açıklayın -->

### Current State

<!-- Mevcut durum nedir? -->

### Expected State

<!-- Nasıl olması gerekiyor? -->

### Impact on Users

<!-- Kullanıcılar üzerindeki etkisi -->

- [ ] Screen reader users
- [ ] Keyboard-only users
- [ ] Users with motor disabilities
- [ ] Users with visual impairments
- [ ] Users with cognitive disabilities
- [ ] Users with hearing impairments
- [ ] Other: <!-- specify -->

## 🔍 Technical Details

### Affected Components

<!-- Etkilenen bileşenler -->

- [ ] CLI interface
- [ ] Error messages
- [ ] Help text
- [ ] Status indicators
- [ ] Navigation elements
- [ ] Form inputs
- [ ] Other: <!-- specify -->

### Environment

<!-- Test ortamı bilgileri -->

- **OS**: <!-- e.g. Windows 11, macOS 12.0, Ubuntu 22.04 -->
- **Terminal**: <!-- e.g. iTerm2, Windows Terminal, GNOME Terminal -->
- **Screen Reader**: <!-- e.g. NVDA, JAWS, VoiceOver, Orca -->
- **Browser**: <!-- e.g. Chrome 120.0, Firefox 121.0 -->

### Reproduction Steps

<!-- Erişilebilirlik sorununu tekrar etmek için adımlar -->

1. **Setup**: <!-- Test ortamını hazırlayın -->
2. **Action**: <!-- Hangi işlemi yapın -->
3. **Observe**: <!-- Ne gözlemlediniz -->

## 🎯 Accessibility Standards

### WCAG 2.1 Compliance

<!-- WCAG 2.1 uyumluluğu -->

- [ ] **Level A**: Basic accessibility
- [ ] **Level AA**: Enhanced accessibility
- [ ] **Level AAA**: Maximum accessibility

### Specific Guidelines

<!-- Spesifik yönergeler -->

- [ ] **1.1.1**: Non-text content
- [ ] **1.3.1**: Info and relationships
- [ ] **1.4.1**: Use of color
- [ ] **2.1.1**: Keyboard
- [ ] **2.1.2**: No keyboard trap
- [ ] **2.4.1**: Bypass blocks
- [ ] **2.4.2**: Page titled
- [ ] **4.1.1**: Parsing
- [ ] **4.1.2**: Name, role, value

## 🧪 Testing

### Accessibility Tests

<!-- Erişilebilirlik testleri -->

- [ ] Screen reader testing
- [ ] Keyboard navigation testing
- [ ] Color contrast testing
- [ ] Focus management testing
- [ ] Form accessibility testing
- [ ] Mobile accessibility testing

### Tools Used

<!-- Kullanılan araçlar -->

- [ ] axe-core
- [ ] WAVE
- [ ] Lighthouse
- [ ] Color Contrast Analyzer
- [ ] NVDA
- [ ] VoiceOver
- [ ] Manual testing
- [ ] Other: <!-- specify -->

### Test Results

<!-- Test sonuçları -->

```bash
# Accessibility audit results
npm run test:a11y

# Color contrast analysis
# Background: #ffffff, Foreground: #000000
# Contrast ratio: 21:1 (Pass)
```

## 💡 Solutions

### Immediate Fixes

<!-- Acil düzeltmeler -->

### Long-term Improvements

<!-- Uzun vadeli iyileştirmeler -->

### Best Practices

<!-- En iyi uygulamalar -->

## 📊 Impact Assessment

### User Impact

<!-- Kullanıcı etkisi -->

- [ ] 🔴 Critical - Feature unusable
- [ ] 🟠 High - Significant difficulty
- [ ] 🟡 Medium - Moderate difficulty
- [ ] 🔵 Low - Minor inconvenience

### Compliance Impact

<!-- Uyumluluk etkisi -->

- [ ] Legal compliance issues
- [ ] WCAG guidelines violation
- [ ] Section 508 violation
- [ ] Other regulations: <!-- specify -->

## 📝 Checklist

- [ ] Issue type seçildi
- [ ] Erişilebilirlik sorunu detaylı açıklandı
- [ ] Mevcut ve beklenen durum belirtildi
- [ ] Kullanıcı etkisi analiz edildi
- [ ] Etkilenen bileşenler belirtildi
- [ ] Test ortamı bilgileri sağlandı
- [ ] Tekrar etme adımları yazıldı
- [ ] WCAG uyumluluğu kontrol edildi
- [ ] Erişilebilirlik testleri yapıldı
- [ ] Çözüm önerileri sunuldu
- [ ] Etki değerlendirmesi tamamlandı
- [ ] Uygun etiketler eklendi

## 🎯 Priority

<!-- Öncelik seviyesi -->

- [ ] 🔴 Critical - Legal compliance issue
- [ ] 🟠 High - Significant user impact
- [ ] 🟡 Medium - Moderate user impact
- [ ] 🔵 Low - Minor user impact

## 🏷️ Labels

<!-- Uygun etiketleri ekleyin -->
- [ ] `accessibility`
- [ ] `a11y`
- [ ] `user-experience`
- [ ] `wcag`
- [ ] `screen-reader`
- [ ] `keyboard-navigation`
- [ ] `color-contrast`
- [ ] `form-accessibility`

---

## ♿ Accessibility Commitment

Database MCP Server is committed to providing an accessible experience for all users. We follow WCAG 2.1 guidelines and continuously work to improve accessibility.

**Remember**: Accessibility is not a feature, it's a fundamental requirement for inclusive design.

For accessibility support:
- **Email**: accessibility@yourdomain.com
- **Documentation**: [Accessibility Guide](link-to-a11y-guide)
- **Resources**: [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) 
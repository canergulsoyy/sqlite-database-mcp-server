---
name: ⚡ Performance
about: Report performance issues or suggest optimizations
title: '[PERF] '
labels: ['performance', 'needs-triage']
assignees: ''
---

## ⚡ Performance Issue

### 🔍 Issue Type

<!-- Uygun olanları işaretleyin -->

- [ ] 🐌 Slow response time
- [ ] 💾 High memory usage
- [ ] 🔥 High CPU usage
- [ ] 🗄️ Database performance
- [ ] 🌐 Network latency
- [ ] 📱 Resource consumption
- [ ] 🔄 Slow startup time
- [ ] 💡 Optimization suggestion

## 📋 Details

### Performance Problem

<!-- Performans sorununu detaylı açıklayın -->

### Current Performance

<!-- Mevcut performans metrikleri -->

- **Response Time**: <!-- e.g. 2.5 seconds -->
- **Memory Usage**: <!-- e.g. 512MB -->
- **CPU Usage**: <!-- e.g. 85% -->
- **Database Queries**: <!-- e.g. 15 queries -->
- **Throughput**: <!-- e.g. 100 requests/second -->

### Expected Performance

<!-- Beklenen performans metrikleri -->

- **Response Time**: <!-- e.g. < 500ms -->
- **Memory Usage**: <!-- e.g. < 256MB -->
- **CPU Usage**: <!-- e.g. < 50% -->
- **Database Queries**: <!-- e.g. < 5 queries -->
- **Throughput**: <!-- e.g. > 1000 requests/second -->

### Impact

<!-- Bu performans sorununun etkisi nedir? -->

- [ ] User experience degraded
- [ ] System resources exhausted
- [ ] Scalability limited
- [ ] Cost increased
- [ ] Other: <!-- specify -->

## 🔍 Investigation

### Environment

<!-- Test ortamı bilgileri -->

- **OS**: <!-- e.g. Ubuntu 22.04 -->
- **Node.js**: <!-- e.g. 18.18.0 -->
- **Hardware**: <!-- e.g. 4GB RAM, 2 CPU cores -->
- **Database**: <!-- e.g. SQLite 3.40.0 -->
- **Load**: <!-- e.g. 100 concurrent users -->

### Reproduction Steps

<!-- Performans sorununu tekrar etmek için adımlar -->

1. **Setup**: <!-- Test ortamını hazırlayın -->
2. **Action**: <!-- Hangi işlemi yapın -->
3. **Measure**: <!-- Hangi metrikleri ölçün -->
4. **Observe**: <!-- Ne gözlemlediniz -->

### Performance Profiling

<!-- Performans analizi sonuçları -->

```bash
# CPU profiling
node --prof your-script.js

# Memory profiling
node --inspect your-script.js

# Database profiling
EXPLAIN QUERY PLAN SELECT * FROM users;
```

## 📊 Metrics & Benchmarks

### Before (Current Performance)

<!-- Mevcut performans verileri -->

| Metric | Value | Unit |
|--------|-------|------|
| Response Time | | ms |
| Memory Usage | | MB |
| CPU Usage | | % |
| Database Queries | | count |
| Throughput | | req/s |

### After (Expected Performance)

<!-- Beklenen performans verileri -->

| Metric | Value | Unit |
|--------|-------|------|
| Response Time | | ms |
| Memory Usage | | MB |
| CPU Usage | | % |
| Database Queries | | count |
| Throughput | | req/s |

## 💡 Optimization Suggestions

### Code Level

<!-- Kod seviyesinde optimizasyon önerileri -->

- [ ] Algorithm optimization
- [ ] Data structure improvement
- [ ] Caching implementation
- [ ] Async/await optimization
- [ ] Memory leak fixes
- [ ] Other: <!-- specify -->

### Database Level

<!-- Veritabanı seviyesinde optimizasyon önerileri -->

- [ ] Query optimization
- [ ] Index creation
- [ ] Connection pooling
- [ ] Query caching
- [ ] Database tuning
- [ ] Other: <!-- specify -->

### Infrastructure Level

<!-- Altyapı seviyesinde optimizasyon önerileri -->

- [ ] Load balancing
- [ ] CDN implementation
- [ ] Caching layer
- [ ] Resource scaling
- [ ] Monitoring setup
- [ ] Other: <!-- specify -->

## 🧪 Testing

### Performance Tests

<!-- Performans testleri -->

- [ ] Load testing completed
- [ ] Stress testing completed
- [ ] Memory profiling completed
- [ ] CPU profiling completed
- [ ] Database profiling completed
- [ ] Network profiling completed

### Test Results

<!-- Test sonuçları -->

```bash
# Load test results
ab -n 1000 -c 10 http://localhost:3000/api/users

# Memory test results
node --max-old-space-size=512 your-script.js

# Database test results
sqlite3 performance.db "PRAGMA cache_size = 10000;"
```

## 📝 Checklist

- [ ] Issue type seçildi
- [ ] Performans sorunu detaylı açıklandı
- [ ] Mevcut ve beklenen performans belirtildi
- [ ] Etki analizi yapıldı
- [ ] Test ortamı bilgileri sağlandı
- [ ] Tekrar etme adımları yazıldı
- [ ] Performans analizi yapıldı
- [ ] Metrikler ve benchmark'lar eklendi
- [ ] Optimizasyon önerileri sunuldu
- [ ] Test sonuçları paylaşıldı
- [ ] Uygun etiketler eklendi

## 🎯 Priority

<!-- Öncelik seviyesi -->

- [ ] 🔴 Critical - System unusable
- [ ] 🟠 High - Significant impact
- [ ] 🟡 Medium - Moderate impact
- [ ] 🔵 Low - Minor impact

## 🏷️ Labels

<!-- Uygun etiketleri ekleyin -->
- [ ] `performance`
- [ ] `high-priority`
- [ ] `optimization`
- [ ] `database`
- [ ] `memory`
- [ ] `cpu`
- [ ] `scalability`
- [ ] `monitoring`

---

## 💡 Additional Notes

<!-- Ek notlar ve açıklamalar -->

**Not**: Performans optimizasyonları kullanıcı deneyimini önemli ölçüde iyileştirir. Detaylı metrikler ve test sonuçları paylaşarak size daha iyi yardım edebiliriz. 
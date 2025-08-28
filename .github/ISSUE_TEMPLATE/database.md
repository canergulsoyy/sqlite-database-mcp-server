---
name: 🗄️ Database
about: Report database issues or suggest improvements
title: '[DB] '
labels: ['database', 'sqlite', 'needs-triage']
assignees: ''
---

## 🗄️ Database Issue

### 🔍 Issue Type

<!-- Uygun olanları işaretleyin -->

- [ ] 🚫 Connection failure
- [ ] ❌ Query execution error
- [ ] 🔧 Schema issue
- [ ] 📊 Performance problem
- [ ] 🚀 Migration issue
- [ ] 💡 Database improvement suggestion
- [ ] 📝 Database documentation
- [ ] 🔍 Data integrity issue

## 📋 Details

### Database Problem

<!-- Veritabanı sorununu detaylı açıklayın -->

### Current State

<!-- Mevcut durum nedir? -->

### Expected State

<!-- Nasıl olması gerekiyor? -->

### Impact

<!-- Bu sorunun etkisi nedir? -->

- [ ] Application unusable
- [ ] Data loss/corruption
- [ ] Performance degraded
- [ ] User experience affected
- [ ] Other: <!-- specify -->

## 🔍 Technical Details

### Database Environment

<!-- Veritabanı ortamı bilgileri -->

- **Database Engine**: <!-- e.g. SQLite 3.40.0 -->
- **Database File**: <!-- e.g. ./data/app.db -->
- **File Size**: <!-- e.g. 2.5MB -->
- **Connection Type**: <!-- e.g. File-based, Memory -->
- **Node.js Driver**: <!-- e.g. sqlite3, better-sqlite3 -->

### Affected Components

<!-- Etkilenen bileşenler -->

- [ ] Database connection
- [ ] Table creation
- [ ] Data insertion
- [ ] Data querying
- [ ] Data updates
- [ ] Data deletion
- [ ] Schema migration
- [ ] Other: <!-- specify -->

### Database Schema

<!-- Veritabanı şeması -->

```sql
-- Current schema
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER,
    city TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Issues identified
-- 1. Missing index on email field
-- 2. No constraint on age field
-- 3. Missing created_at index
```

## 🚫 Connection Issues

### Connection Failure Details

<!-- Bağlantı hatası detayları -->

```bash
# Connection attempt
npm run db:setup

# Error message
Error: SQLITE_CANTOPEN: unable to open database file
Error: ENOENT: no such file or directory, open './data/app.db'

# Stack trace
at Database.open (node_modules/sqlite/lib/database.js:45:15)
at DatabaseManager.initialize (src/database/setup.ts:35:15)
```

### File System Issues

<!-- Dosya sistemi sorunları -->

- [ ] Directory doesn't exist
- [ ] Permission denied
- [ ] Disk space full
- [ ] File locked
- [ ] Path incorrect
- [ ] Other: <!-- specify -->

### Environment Issues

<!-- Ortam sorunları -->

- [ ] Working directory incorrect
- [ ] Environment variables not set
- [ ] Path resolution issues
- [ ] Container volume mounts
- [ ] Other: <!-- specify -->

## ❌ Query Issues

### Query Execution Errors

<!-- Sorgu çalıştırma hataları -->

```sql
-- Query that failed
SELECT * FROM users WHERE age > 25 AND city = 'İstanbul';

-- Error message
SQLITE_ERROR: no such column: age

-- Expected result
-- Should return users older than 25 in İstanbul
```

### Schema Mismatch

<!-- Şema uyumsuzluğu -->

- [ ] Table doesn't exist
- [ ] Column doesn't exist
- [ ] Column type mismatch
- [ ] Constraint violation
- [ ] Index missing
- [ ] Other: <!-- specify -->

### Data Type Issues

<!-- Veri tipi sorunları -->

- [ ] String vs Integer comparison
- [ ] Date format issues
- [ ] Boolean handling
- [ ] NULL value handling
- [ ] Other: <!-- specify -->

## 🔧 Schema Issues

### Table Creation Problems

<!-- Tablo oluşturma sorunları -->

```sql
-- Table creation attempt
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Issues identified
-- 1. No index on name field for search
-- 2. No constraint on price (negative values)
-- 3. No foreign key constraints
```

### Migration Issues

<!-- Migration sorunları -->

- [ ] Schema version mismatch
- [ ] Migration script failed
- [ ] Data loss during migration
- [ ] Rollback failed
- [ ] Other: <!-- specify -->

### Constraint Issues

<!-- Kısıtlama sorunları -->

- [ ] Primary key violation
- [ ] Unique constraint violation
- [ ] Foreign key constraint violation
- [ ] Check constraint violation
- [ ] Other: <!-- specify -->

## 📊 Performance Issues

### Query Performance

<!-- Sorgu performansı -->

```sql
-- Slow query
SELECT u.*, p.*, o.* 
FROM users u 
JOIN orders o ON u.id = o.user_id 
JOIN products p ON o.product_id = p.id 
WHERE u.city = 'İstanbul';

-- Execution time: 2.5 seconds
-- Expected time: < 100ms
-- Missing indexes identified
```

### Index Issues

<!-- Index sorunları -->

- [ ] Missing indexes
- [ ] Unused indexes
- [ ] Index fragmentation
- [ ] Index size too large
- [ ] Other: <!-- specify -->

### Data Volume Issues

<!-- Veri hacmi sorunları -->

- **Total Records**: <!-- e.g. 100,000 users -->
- **Table Sizes**: <!-- e.g. users: 50MB, products: 30MB -->
- **Query Performance**: <!-- e.g. 2.5 seconds -->
- **Expected Performance**: <!-- e.g. < 100ms -->

## 🚀 Migration Issues

### Schema Changes

<!-- Şema değişiklikleri -->

```sql
-- Migration script
ALTER TABLE users ADD COLUMN phone TEXT;

-- Issues encountered
-- 1. SQLite doesn't support ALTER TABLE ADD COLUMN easily
-- 2. Need to recreate table with new schema
-- 3. Data preservation required
```

### Data Migration

<!-- Veri migration'ı -->

- [ ] Data format changes
- [ ] Data validation required
- [ ] Data cleanup needed
- [ ] Backup/restore required
- [ ] Other: <!-- specify -->

## 💡 Solutions

### Immediate Fixes

<!-- Acil düzeltmeler -->

### Long-term Improvements

<!-- Uzun vadeli iyileştirmeler -->

### Best Practices

<!-- En iyi uygulamalar -->

## 🔍 Troubleshooting

### Debug Commands

<!-- Debug komutları -->

```bash
# Check database file
ls -la ./data/

# Check database integrity
sqlite3 ./data/app.db "PRAGMA integrity_check;"

# Check schema
sqlite3 ./data/app.db ".schema"

# Check table info
sqlite3 ./data/app.db "PRAGMA table_info(users);"

# Check indexes
sqlite3 ./data/app.db "PRAGMA index_list(users);"

# Analyze query plan
sqlite3 ./data/app.db "EXPLAIN QUERY PLAN SELECT * FROM users WHERE city = 'İstanbul';"
```

### Common Issues

<!-- Yaygın sorunlar -->

- [ ] File permissions
- [ ] Path resolution
- [ ] Schema mismatch
- [ ] Constraint violations
- [ ] Performance bottlenecks
- [ ] Other: <!-- specify -->

## 📝 Checklist

- [ ] Issue type seçildi
- [ ] Veritabanı sorunu detaylı açıklandı
- [ ] Mevcut ve beklenen durum belirtildi
- [ ] Etki analizi yapıldı
- [ ] Veritabanı ortamı bilgileri sağlandı
- [ ] Etkilenen bileşenler belirtildi
- [ ] Veritabanı şeması eklendi
- [ ] Bağlantı sorunları detaylandırıldı
- [ ] Sorgu sorunları belirtildi
- [ ] Şema sorunları kontrol edildi
- [ ] Performans metrikleri eklendi
- [ ] Migration sorunları belirtildi
- [ ] Çözüm önerileri sunuldu
- [ ] Troubleshooting adımları eklendi
- [ ] Uygun etiketler eklendi

## 🎯 Priority

<!-- Öncelik seviyesi -->

- [ ] 🔴 Critical - Database completely unusable
- [ ] 🟠 High - Significant database issues
- [ ] 🟡 Medium - Some database problems
- [ ] 🔵 Low - Minor database improvements

## 🏷️ Labels

<!-- Uygun etiketleri ekleyin -->
- [ ] `database`
- [ ] `sqlite`
- [ ] `schema`
- [ ] `performance`
- [ ] `migration`
- [ ] `data-integrity`
- [ ] `query-optimization`
- [ ] `connection`

---

## 🗄️ Database Commitment

Database MCP Server is committed to maintaining a reliable and performant database. We believe that good database practices lead to better data integrity and application performance.

**Remember**: Database issues can affect the entire application. Proper indexing, constraints, and query optimization are essential.

For database support:
- **Email**: database@yourdomain.com
- **Documentation**: [Database Guide](link-to-database-guide)
- **Resources**: [SQLite Best Practices](https://www.sqlite.org/bestpractices.html) 
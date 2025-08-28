# 🔐 Güvenlik Politikası

## 📋 İçindekiler

- [Güvenlik Açıkları](#güvenlik-açıkları)
- [Güvenlik Özellikleri](#güvenlik-özellikleri)
- [Güvenlik En İyi Uygulamaları](#güvenlik-en-iyi-uygulamaları)
- [Güvenlik Kontrol Listesi](#güvenlik-kontrol-listesi)
- [Güvenlik Testleri](#güvenlik-testleri)
- [İletişim](#iletişim)

## 🚨 Güvenlik Açıkları

### Güvenlik Açığı Raporlama

Eğer bir güvenlik açığı keşfettiyseniz, lütfen **özel olarak** rapor edin:

- **Email**: security@yourdomain.com
- **GPG Key**: [GPG Public Key](link-to-gpg-key)
- **HackerOne**: [Program Link](link-to-hackerone)

### Güvenlik Açığı Raporlama Süreci

1. **Keşif**: Güvenlik açığını keşfedin
2. **Raporlama**: Güvenlik ekibine özel olarak rapor edin
3. **Doğrulama**: Güvenlik ekibi açığı doğrular
4. **Düzeltme**: Geliştirici ekibi düzeltmeyi hazırlar
5. **Yayınlama**: Güvenlik güncellemesi yayınlanır
6. **Kredi**: Katkıda bulunan kişiye kredi verilir

### Güvenlik Açığı Türleri

#### 🔴 Kritik (Critical)
- **SQL Injection** - Veritabanı güvenlik açığı
- **Authentication Bypass** - Kimlik doğrulama bypass
- **Remote Code Execution** - Uzaktan kod çalıştırma
- **Data Breach** - Veri sızıntısı

#### 🟠 Yüksek (High)
- **Privilege Escalation** - Yetki yükseltme
- **Information Disclosure** - Bilgi açıklanması
- **Cross-Site Scripting (XSS)** - Cross-site scripting
- **CSRF** - Cross-site request forgery

#### 🟡 Orta (Medium)
- **Directory Traversal** - Dizin traversal
- **Insecure Deserialization** - Güvensiz deserialization
- **Broken Authentication** - Bozuk kimlik doğrulama
- **Sensitive Data Exposure** - Hassas veri maruziyeti

#### 🟢 Düşük (Low)
- **Information Disclosure** - Bilgi açıklanması
- **Missing Security Headers** - Eksik güvenlik başlıkları
- **Weak Password Policy** - Zayıf şifre politikası

## 🛡️ Güvenlik Özellikleri

### 1. SQL Injection Koruması

```typescript
// ✅ Güvenli - Parametrized Queries
async getUsers(query: UserQuery): Promise<QueryResult> {
    let sql = 'SELECT * FROM users WHERE 1=1';
    const params: any[] = [];

    if (query.name) {
        sql += ' AND name LIKE ?';
        params.push(`%${query.name}%`);
    }

    const users = await db.all<User[]>(sql, params);
    return { success: true, data: users };
}

// ❌ Güvensiz - String Concatenation
async getUsersUnsafe(query: UserQuery): Promise<QueryResult> {
    let sql = `SELECT * FROM users WHERE name LIKE '%${query.name}%'`;
    const users = await db.all<User[]>(sql);
    return { success: true, data: users };
}
```

### 2. Input Validation

```typescript
// ✅ Güvenli - Zod Schema Validation
import { z } from "zod";

const UserQuerySchema = z.object({
    name: z.string().optional(),
    city: z.string().optional(),
    minAge: z.number().min(0).max(150).optional(),
    maxAge: z.number().min(0).max(150).optional(),
    email: z.string().email().optional()
});

// Validation
const validatedQuery = UserQuerySchema.parse(query);
```

### 3. Read-Only Operations

```typescript
// ✅ Güvenli - Sadece SELECT sorguları
server.registerTool(
    "execute_custom_query",
    {
        title: "Özel SQL Sorgusu",
        description: "Güvenli SELECT sorguları çalıştırır",
        inputSchema: {
            sql: z.string().describe("Çalıştırılacak SELECT sorgusu"),
            params: z.array(z.any()).optional().describe("Sorgu parametreleri")
        }
    },
    async ({ sql, params = [] }) => {
        // SQL injection koruması
        if (!sql.trim().toLowerCase().startsWith('select')) {
            throw new Error('Sadece SELECT sorgularına izin verilir');
        }
        
        // Güvenli sorgu çalıştırma
        const result = await queryService.executeCustomQuery(sql, params);
        return result;
    }
);
```

### 4. Authentication & Authorization

```typescript
// ✅ Güvenli - API Key Validation
const validateApiKey = (apiKey: string): boolean => {
    if (!apiKey || apiKey.length < 32) {
        return false;
    }
    
    // API key format kontrolü
    const apiKeyRegex = /^[a-zA-Z0-9]{32,}$/;
    return apiKeyRegex.test(apiKey);
};

// Middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'] as string;
    
    if (!validateApiKey(apiKey)) {
        return res.status(401).json({ error: 'Invalid API key' });
    }
    
    next();
};
```

### 5. Rate Limiting

```typescript
// ✅ Güvenli - Rate Limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100, // IP başına maksimum 100 istek
    message: 'Too many requests from this IP',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);
```

## 🔒 Güvenlik En İyi Uygulamaları

### 1. Environment Variables

```bash
# ✅ Güvenli - .env dosyası
OPENROUTER_API_KEY=your_secure_api_key_here
DATABASE_URL=sqlite:./data/app.db
NODE_ENV=production

# ❌ Güvensiz - Hardcoded values
const API_KEY = "hardcoded_api_key_123";
const DB_URL = "sqlite:./data/app.db";
```

### 2. Secrets Management

```typescript
// ✅ Güvenli - Environment variables
import dotenv from 'dotenv';
dotenv.config();

const config = {
    apiKey: process.env.OPENROUTER_API_KEY,
    databaseUrl: process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV || 'development'
};

// Validation
if (!config.apiKey) {
    throw new Error('OPENROUTER_API_KEY is required');
}
```

### 3. Error Handling

```typescript
// ✅ Güvenli - Generic error messages
try {
    const result = await databaseOperation();
    return result;
} catch (error) {
    // Production'da detaylı hata bilgisi verme
    if (process.env.NODE_ENV === 'production') {
        console.error('Database operation failed:', error);
        throw new Error('Internal server error');
    } else {
        throw error;
    }
}
```

### 4. Logging & Monitoring

```typescript
// ✅ Güvenli - Structured logging
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Security events logging
logger.info('User authentication attempt', {
    userId: user.id,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
});
```

## ✅ Güvenlik Kontrol Listesi

### Development
- [ ] **Input Validation** - Tüm input'lar validate edildi
- [ ] **SQL Injection** - Parametrized queries kullanıldı
- [ ] **XSS Protection** - Output encoding yapıldı
- [ ] **CSRF Protection** - CSRF token'ları eklendi
- [ ] **Authentication** - Güvenli kimlik doğrulama
- [ ] **Authorization** - Yetki kontrolü yapıldı
- [ ] **Error Handling** - Güvenli hata mesajları
- [ ] **Logging** - Güvenlik event'leri loglanıyor

### Deployment
- [ ] **HTTPS** - SSL/TLS sertifikası kuruldu
- [ ] **Security Headers** - Güvenlik başlıkları eklendi
- [ ] **Rate Limiting** - Rate limiting aktif
- [ ] **CORS** - CORS politikası yapılandırıldı
- [ ] **Environment Variables** - Hassas bilgiler .env'de
- [ ] **Dependencies** - Güvenlik açıkları kontrol edildi
- [ ] **Firewall** - Firewall kuralları yapılandırıldı
- [ ] **Monitoring** - Güvenlik monitoring aktif

### Maintenance
- [ ] **Updates** - Düzenli güvenlik güncellemeleri
- [ ] **Vulnerability Scanning** - Güvenlik taramaları
- [ ] **Backup** - Güvenli backup stratejisi
- [ ] **Incident Response** - Olay müdahale planı
- [ ] **Training** - Güvenlik eğitimleri

## 🧪 Güvenlik Testleri

### 1. Automated Security Testing

```bash
# Dependency vulnerability scanning
npm audit

# OWASP ZAP security testing
zap-baseline.py -t https://your-app.com

# SQLMap for SQL injection testing
sqlmap -u "https://your-app.com/api/users?id=1" --dbs
```

### 2. Manual Security Testing

```bash
# SQL Injection test
curl "https://your-app.com/api/users?name=' OR 1=1--"

# XSS test
curl "https://your-app.com/api/search?q=<script>alert('xss')</script>"

# Authentication bypass test
curl -H "Authorization: Bearer invalid_token" "https://your-app.com/api/admin"
```

### 3. Security Headers Test

```bash
# Security headers check
curl -I "https://your-app.com"

# Expected headers:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
# Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## 📞 İletişim

### Güvenlik Ekibi

- **Security Email**: security@yourdomain.com
- **GPG Key**: [Download GPG Key](link-to-gpg-key)
- **HackerOne**: [Security Program](link-to-hackerone)
- **Bug Bounty**: [Program Details](link-to-bug-bounty)

### Acil Durumlar

- **24/7 Security Hotline**: +1-XXX-XXX-XXXX
- **Emergency Email**: emergency@yourdomain.com
- **Incident Response**: [Response Plan](link-to-response-plan)

### Güvenlik Kaynakları

- **Security Documentation**: [Docs](link-to-security-docs)
- **Security Training**: [Training Materials](link-to-training)
- **Security Tools**: [Tool List](link-to-tools)
- **Security Blog**: [Blog](link-to-security-blog)

---

## 🔒 Güvenlik Sözü

Database MCP Server projesi, güvenliği en üst düzeyde tutmayı taahhüt eder. Güvenlik açıklarını ciddiye alır ve hızlı bir şekilde müdahale eder.

**Güvenlik herkesin sorumluluğudur.** 
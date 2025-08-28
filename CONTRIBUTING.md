# 🤝 Katkıda Bulunma Rehberi

Database MCP Server projesine katkıda bulunmak istediğiniz için teşekkürler! Bu rehber, projeye nasıl katkıda bulunabileceğinizi açıklar.

## 📋 İçindekiler

- [Başlamadan Önce](#başlamadan-önce)
- [Geliştirme Ortamı Kurulumu](#geliştirme-ortamı-kurulumu)
- [Kod Yazma Kuralları](#kod-yazma-kuralları)
- [Test Yazma](#test-yazma)
- [Pull Request Süreci](#pull-request-süreci)
- [Issue Raporlama](#issue-raporlama)
- [İletişim](#iletişim)

## 🚀 Başlamadan Önce

### Katkıda Bulunabileceğiniz Alanlar

- 🐛 **Bug fixes** - Hata düzeltmeleri
- ✨ **New features** - Yeni özellikler
- 📚 **Documentation** - Dokümantasyon iyileştirmeleri
- 🧪 **Tests** - Test kapsamı artırma
- 🔧 **Performance** - Performans iyileştirmeleri
- 🎨 **UI/UX** - Kullanıcı arayüzü iyileştirmeleri

### Gereksinimler

- **Node.js** >= 18.18.0
- **Git** >= 2.30.0
- **npm** veya **yarn**
- **TypeScript** bilgisi
- **MCP protokolü** hakkında temel bilgi

## 🛠️ Geliştirme Ortamı Kurulumu

### 1. Repository'yi Fork Edin

GitHub'da [database-mcp-server](https://github.com/canergulsoyy/database-mcp-server) repository'sini fork edin.

### 2. Local Repository'yi Klonlayın

```bash
# Fork'unuzu klonlayın
git clone https://github.com/YOUR_USERNAME/database-mcp-server.git
cd database-mcp-server

# Upstream remote'u ekleyin
git remote add upstream https://github.com/original-owner/database-mcp-server.git
```

### 3. Development Branch Oluşturun

```bash
# Main branch'i güncelleyin
git checkout main
git pull upstream main

# Feature branch oluşturun
git checkout -b feature/your-feature-name
```

### 4. Bağımlılıkları Yükleyin

```bash
npm install
```

### 5. Environment Dosyasını Oluşturun

```bash
cp env.example .env
# .env dosyasını düzenleyin ve gerekli API key'leri ekleyin
```

### 6. Veritabanını Kurun

```bash
npm run db:setup
npm run db:seed
```

## 📝 Kod Yazma Kuralları

### TypeScript Standartları

- **Strict mode** kullanın
- **Type annotations** ekleyin
- **Interface** ve **type** tanımlarını kullanın
- **Generic types** kullanın uygun yerlerde

### Kod Stili

- **ESLint** kurallarına uyun
- **Prettier** formatını kullanın
- **2 spaces** indentation
- **Single quotes** kullanın
- **Semicolons** ekleyin

### Naming Conventions

```typescript
// ✅ Doğru
const getUserById = (id: number): Promise<User> => { ... }
const MAX_RETRY_COUNT = 3;
const isUserActive = true;

// ❌ Yanlış
const get_user_by_id = (id: number) => { ... }
const maxRetryCount = 3;
const userActive = true;
```

### Error Handling

```typescript
// ✅ Doğru
try {
    const result = await databaseOperation();
    return { success: true, data: result };
} catch (error) {
    console.error('Database operation failed:', error);
    return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
    };
}

// ❌ Yanlış
const result = await databaseOperation();
return result;
```

### Async/Await Kullanımı

```typescript
// ✅ Doğru
async function processData(): Promise<Result> {
    const data = await fetchData();
    const processed = await processData(data);
    return processed;
}

// ❌ Yanlış
function processData(): Promise<Result> {
    return fetchData().then(data => {
        return processData(data);
    });
}
```

## 🧪 Test Yazma

### Test Dosyası Yapısı

```typescript
// tests/database/query-service.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseQueryService } from '../../src/database/query-service';
import { DatabaseManager } from '../../src/database/setup';

describe('DatabaseQueryService', () => {
    let queryService: DatabaseQueryService;
    let dbManager: DatabaseManager;

    beforeEach(async () => {
        dbManager = new DatabaseManager(':memory:');
        await dbManager.initialize();
        queryService = new DatabaseQueryService(dbManager);
    });

    afterEach(async () => {
        await dbManager.close();
    });

    describe('getUsers', () => {
        it('should return all users when no query provided', async () => {
            const result = await queryService.getUsers();
            expect(result.success).toBe(true);
            expect(result.data).toBeDefined();
        });

        it('should filter users by city', async () => {
            const result = await queryService.getUsers({ city: 'İstanbul' });
            expect(result.success).toBe(true);
            expect(result.data?.every(user => user.city === 'İstanbul')).toBe(true);
        });
    });
});
```

### Test Çalıştırma

```bash
# Tüm testleri çalıştır
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Belirli test dosyası
npm test -- tests/database/query-service.test.ts
```

## 🔄 Pull Request Süreci

### 1. Feature Branch'i Güncelleyin

```bash
git checkout main
git pull upstream main
git checkout feature/your-feature-name
git rebase main
```

### 2. Değişiklikleri Commit Edin

```bash
# Değişiklikleri staging'e ekleyin
git add .

# Commit mesajı yazın
git commit -m "feat: add user search functionality

- Add search by name, email, and city
- Implement fuzzy search algorithm
- Add unit tests for search functionality
- Update documentation"

# Branch'i push edin
git push origin feature/your-feature-name
```

### 3. Commit Mesaj Formatı

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: Yeni özellik
- `fix`: Bug düzeltme
- `docs`: Dokümantasyon
- `style`: Kod stili değişiklikleri
- `refactor`: Kod refactoring
- `test`: Test ekleme/düzenleme
- `chore`: Build, config değişiklikleri

**Examples:**
```
feat(auth): add JWT token validation
fix(database): resolve connection timeout issue
docs(api): update endpoint documentation
test(query): add unit tests for filter functions
```

### 4. Pull Request Oluşturun

1. GitHub'da **New Pull Request** butonuna tıklayın
2. **Base branch**: `main`, **Compare branch**: `feature/your-feature-name`
3. **Title**: Açık ve kısa açıklama
4. **Description**: Detaylı açıklama ve değişiklikler
5. **Labels**: Uygun etiketleri ekleyin
6. **Reviewers**: Code review için kişileri ekleyin

### 5. Pull Request Template

```markdown
## 📝 Açıklama

Bu PR'ın amacı ve ne yaptığı hakkında kısa açıklama.

## 🔄 Değişiklik Türü

- [ ] Bug fix (hata düzeltme)
- [ ] New feature (yeni özellik)
- [ ] Breaking change (kırıcı değişiklik)
- [ ] Documentation update (dokümantasyon güncelleme)

## 🧪 Test

- [ ] Unit tests eklendi/güncellendi
- [ ] Integration tests eklendi/güncellendi
- [ ] Manual testing yapıldı

## 📚 Dokümantasyon

- [ ] README güncellendi
- [ ] API docs güncellendi
- [ ] Code comments eklendi

## 🔍 Review Checklist

- [ ] Kod standartlarına uygun
- [ ] Error handling eklenmiş
- [ ] Performance considerations
- [ ] Security considerations
- [ ] Accessibility considerations

## 📸 Screenshots (UI değişiklikleri için)

Eğer UI değişikliği varsa, before/after screenshot'ları ekleyin.

## 🔗 Related Issues

Closes #123
Related to #456
```

## 🐛 Issue Raporlama

### Bug Report Template

```markdown
## 🐛 Bug Açıklaması

Bug'ın ne olduğu hakkında açık ve kısa açıklama.

## 🔄 Tekrar Etme Adımları

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## 📱 Beklenen Davranış

Ne olması gerektiği hakkında açık ve kısa açıklama.

## 📸 Screenshots

Eğer uygunsa, screenshot'lar ekleyin.

## 🖥️ Environment

- OS: [e.g. macOS 12.0]
- Node.js: [e.g. 18.18.0]
- npm: [e.g. 9.0.0]
- Database: [e.g. SQLite 3.40.0]

## 📋 Additional Context

Bug hakkında ek bilgi, log'lar, vb.
```

### Feature Request Template

```markdown
## 🚀 Feature Açıklaması

Yeni özelliğin ne olduğu ve neden gerekli olduğu hakkında açıklama.

## 💡 Önerilen Çözüm

Nasıl implement edilebileceği hakkında öneriler.

## 🔄 Alternatif Çözümler

Düşünülen alternatif çözümler.

## 📱 Additional Context

Ek bilgi, use case'ler, vb.
```

## 📞 İletişim

### Geliştirici Topluluğu

- **GitHub Discussions**: [Link]
- **Discord**: [Link]
- **Email**: canergulsoyy@gmail.com

### Code Review

- **Review Guidelines**: [Link]
- **Review Checklist**: [Link]
- **Review Process**: [Link]

### Mentoring

Yeni geliştiriciler için mentoring programı mevcuttur. İlgileniyorsanız:

1. **Issue** oluşturun
2. **Label**: `good first issue`, `help wanted`
3. **Description**: Deneyim seviyenizi ve ilgi alanlarınızı belirtin

## 🙏 Teşekkürler

Bu projeye katkıda bulunduğunuz için teşekkürler! Her katkı, projeyi daha iyi hale getiriyor.

---

**Not**: Bu rehber sürekli güncellenmektedir. Önerileriniz varsa, lütfen issue açın veya PR gönderin. 
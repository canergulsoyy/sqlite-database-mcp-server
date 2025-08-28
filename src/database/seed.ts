import { DatabaseManager, User, Product, Order } from './setup.js';

async function seedDatabase(): Promise<void> {
    const dbManager = new DatabaseManager();

    try {
        await dbManager.initialize();
        const db = await dbManager.getDatabase();

        console.log('🌱 Veritabanına örnek veriler ekleniyor...');

        // Mevcut verileri kontrol et
        const existingUsers = await db.all('SELECT email FROM users');
        const existingProducts = await db.all('SELECT name FROM products');
        const existingOrders = await db.all('SELECT id FROM orders');

        console.log(`📊 Mevcut veriler: ${existingUsers.length} kullanıcı, ${existingProducts.length} ürün, ${existingOrders.length} sipariş`);

        // Eğer veriler zaten mevcutsa, seed işlemini atla
        if (existingUsers.length > 0 && existingProducts.length > 0) {
            console.log('✅ Veritabanında zaten veriler mevcut. Seed işlemi atlanıyor.');

            // Özet istatistikler
            const userCount = await db.get('SELECT COUNT(*) as count FROM users');
            const productCount = await db.get('SELECT COUNT(*) as count FROM products');
            const orderCount = await db.get('SELECT COUNT(*) as count FROM orders');

            console.log('\n📊 Veritabanı Özeti:');
            console.log(`👥 Toplam Kullanıcı: ${userCount?.count}`);
            console.log(`📦 Toplam Ürün: ${productCount?.count}`);
            console.log(`🛒 Toplam Sipariş: ${orderCount?.count}`);

            return;
        }

        // Users ekle
        const users: Omit<User, 'id' | 'created_at'>[] = [
            { name: 'Ahmet Yılmaz', email: 'ahmet@example.com', age: 28, city: 'İstanbul' },
            { name: 'Fatma Demir', email: 'fatma@example.com', age: 32, city: 'Ankara' },
            { name: 'Mehmet Kaya', email: 'mehmet@example.com', age: 25, city: 'İzmir' },
            { name: 'Ayşe Özkan', email: 'ayse@example.com', age: 29, city: 'Bursa' },
            { name: 'Ali Çelik', email: 'ali@example.com', age: 35, city: 'Antalya' }
        ];

        for (const user of users) {
            try {
                await db.run(
                    'INSERT INTO users (name, email, age, city) VALUES (?, ?, ?, ?)',
                    [user.name, user.email, user.age, user.city]
                );
                console.log(`✅ Kullanıcı eklendi: ${user.name}`);
            } catch (error: any) {
                if (error.code === 'SQLITE_CONSTRAINT') {
                    console.log(`⚠️ Kullanıcı zaten mevcut: ${user.name} (${user.email})`);
                } else {
                    throw error;
                }
            }
        }

        // Products ekle
        const products: Omit<Product, 'id' | 'created_at'>[] = [
            { name: 'iPhone 15 Pro', category: 'Elektronik', price: 45000, stock: 25 },
            { name: 'MacBook Air M2', category: 'Elektronik', price: 35000, stock: 15 },
            { name: 'Nike Air Max', category: 'Spor', price: 2500, stock: 50 },
            { name: 'Samsung Galaxy S24', category: 'Elektronik', price: 32000, stock: 30 },
            { name: 'Adidas Ultraboost', category: 'Spor', price: 2800, stock: 40 },
            { name: 'Sony WH-1000XM5', category: 'Elektronik', price: 8500, stock: 20 },
            { name: 'Puma RS-X', category: 'Spor', price: 1800, stock: 35 },
            { name: 'Canon EOS R6', category: 'Fotoğraf', price: 28000, stock: 10 }
        ];

        for (const product of products) {
            try {
                await db.run(
                    'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
                    [product.name, product.category, product.price, product.stock]
                );
                console.log(`✅ Ürün eklendi: ${product.name}`);
            } catch (error: any) {
                if (error.code === 'SQLITE_CONSTRAINT') {
                    console.log(`⚠️ Ürün zaten mevcut: ${product.name}`);
                } else {
                    throw error;
                }
            }
        }

        // Orders ekle
        const orders: Omit<Order, 'id' | 'created_at'>[] = [
            { user_id: 1, product_id: 1, quantity: 1, total_price: 45000, status: 'completed' },
            { user_id: 2, product_id: 3, quantity: 2, total_price: 5000, status: 'pending' },
            { user_id: 3, product_id: 2, quantity: 1, total_price: 35000, status: 'shipped' },
            { user_id: 4, product_id: 5, quantity: 1, total_price: 2800, status: 'completed' },
            { user_id: 5, product_id: 4, quantity: 1, total_price: 32000, status: 'pending' },
            { user_id: 1, product_id: 6, quantity: 1, total_price: 8500, status: 'completed' },
            { user_id: 2, product_id: 7, quantity: 1, total_price: 1800, status: 'shipped' },
            { user_id: 3, product_id: 8, quantity: 1, total_price: 28000, status: 'pending' }
        ];

        for (const order of orders) {
            try {
                await db.run(
                    'INSERT INTO orders (user_id, product_id, quantity, total_price, status) VALUES (?, ?, ?, ?, ?)',
                    [order.user_id, order.product_id, order.quantity, order.total_price, order.status]
                );
                console.log(`✅ Sipariş eklendi: #${order.user_id} -> #${order.product_id}`);
            } catch (error: any) {
                if (error.code === 'SQLITE_CONSTRAINT') {
                    console.log(`⚠️ Sipariş zaten mevcut: #${order.user_id} -> #${order.product_id}`);
                } else {
                    throw error;
                }
            }
        }

        console.log('🎉 Veritabanı seed işlemi tamamlandı!');

        // Özet istatistikler
        const userCount = await db.get('SELECT COUNT(*) as count FROM users');
        const productCount = await db.get('SELECT COUNT(*) as count FROM products');
        const orderCount = await db.get('SELECT COUNT(*) as count FROM orders');

        console.log('\n📊 Veritabanı Özeti:');
        console.log(`👥 Toplam Kullanıcı: ${userCount?.count}`);
        console.log(`📦 Toplam Ürün: ${productCount?.count}`);
        console.log(`🛒 Toplam Sipariş: ${orderCount?.count}`);

    } catch (error) {
        console.error('❌ Seed işlemi başarısız:', error);
        throw error;
    } finally {
        await dbManager.close();
    }
}

// Standalone çalıştırma için
if (import.meta.url === `file://${process.argv[1]}`) {
    seedDatabase().catch(console.error);
} 
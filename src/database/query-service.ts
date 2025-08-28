import { Database } from 'sqlite';
import { DatabaseManager, User, Product, Order } from './setup.js';

export interface QueryResult {
    success: boolean;
    data?: any;
    error?: string;
    count?: number;
}

export interface UserQuery {
    name?: string;
    city?: string;
    minAge?: number;
    maxAge?: number;
    email?: string;
}

export interface ProductQuery {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
}

export interface OrderQuery {
    userId?: number;
    productId?: number;
    status?: string;
    minTotal?: number;
    maxTotal?: number;
}

export class DatabaseQueryService {
    private dbManager: DatabaseManager;

    constructor(dbManager: DatabaseManager) {
        this.dbManager = dbManager;
    }

    async getUsers(query: UserQuery = {}): Promise<QueryResult> {
        try {
            const db = await this.dbManager.getDatabase();
            let sql = 'SELECT * FROM users WHERE 1=1';
            const params: any[] = [];

            if (query.name) {
                sql += ' AND name LIKE ?';
                params.push(`%${query.name}%`);
            }

            if (query.city) {
                sql += ' AND city LIKE ?';
                params.push(`%${query.city}%`);
            }

            if (query.minAge) {
                sql += ' AND age >= ?';
                params.push(query.minAge);
            }

            if (query.maxAge) {
                sql += ' AND age <= ?';
                params.push(query.maxAge);
            }

            if (query.email) {
                sql += ' AND email LIKE ?';
                params.push(`%${query.email}%`);
            }

            sql += ' ORDER BY created_at DESC';

            const users = await db.all<User[]>(sql, params);
            return {
                success: true,
                data: users,
                count: users.length
            };
        } catch (error) {
            return {
                success: false,
                error: `Kullanıcılar getirilemedi: ${error instanceof Error ? error.message : error}`
            };
        }
    }

    async getProducts(query: ProductQuery = {}): Promise<QueryResult> {
        try {
            const db = await this.dbManager.getDatabase();
            let sql = 'SELECT * FROM products WHERE 1=1';
            const params: any[] = [];

            if (query.name) {
                sql += ' AND name LIKE ?';
                params.push(`%${query.name}%`);
            }

            if (query.category) {
                sql += ' AND category = ?';
                params.push(query.category);
            }

            if (query.minPrice) {
                sql += ' AND price >= ?';
                params.push(query.minPrice);
            }

            if (query.maxPrice) {
                sql += ' AND price <= ?';
                params.push(query.maxPrice);
            }

            if (query.inStock !== undefined) {
                if (query.inStock) {
                    sql += ' AND stock > 0';
                } else {
                    sql += ' AND stock = 0';
                }
            }

            sql += ' ORDER BY price ASC';

            const products = await db.all<Product[]>(sql, params);
            return {
                success: true,
                data: products,
                count: products.length
            };
        } catch (error) {
            return {
                success: false,
                error: `Ürünler getirilemedi: ${error instanceof Error ? error.message : error}`
            };
        }
    }

    async getOrders(query: OrderQuery = {}): Promise<QueryResult> {
        try {
            const db = await this.dbManager.getDatabase();
            let sql = `
                SELECT 
                    o.*,
                    u.name as user_name,
                    u.email as user_email,
                    p.name as product_name,
                    p.category as product_category
                FROM orders o
                JOIN users u ON o.user_id = u.id
                JOIN products p ON o.product_id = p.id
                WHERE 1=1
            `;
            const params: any[] = [];

            if (query.userId) {
                sql += ' AND o.user_id = ?';
                params.push(query.userId);
            }

            if (query.productId) {
                sql += ' AND o.product_id = ?';
                params.push(query.productId);
            }

            if (query.status) {
                sql += ' AND o.status = ?';
                params.push(query.status);
            }

            if (query.minTotal) {
                sql += ' AND o.total_price >= ?';
                params.push(query.minTotal);
            }

            if (query.maxTotal) {
                sql += ' AND o.total_price <= ?';
                params.push(query.maxTotal);
            }

            sql += ' ORDER BY o.created_at DESC';

            const orders = await db.all(sql, params);
            return {
                success: true,
                data: orders,
                count: orders.length
            };
        } catch (error) {
            return {
                success: false,
                error: `Siparişler getirilemedi: ${error instanceof Error ? error.message : error}`
            };
        }
    }

    async getDatabaseStats(): Promise<QueryResult> {
        try {
            const db = await this.dbManager.getDatabase();

            const userCount = await db.get('SELECT COUNT(*) as count FROM users');
            const productCount = await db.get('SELECT COUNT(*) as count FROM products');
            const orderCount = await db.get('SELECT COUNT(*) as count FROM orders');

            const totalRevenue = await db.get('SELECT SUM(total_price) as total FROM orders WHERE status = "completed"');
            const avgOrderValue = await db.get('SELECT AVG(total_price) as avg FROM orders');

            const topProducts = await db.all(`
                SELECT 
                    p.name,
                    p.category,
                    COUNT(o.id) as order_count,
                    SUM(o.total_price) as total_revenue
                FROM products p
                LEFT JOIN orders o ON p.id = o.product_id
                GROUP BY p.id
                ORDER BY order_count DESC
                LIMIT 5
            `);

            const cityStats = await db.all(`
                SELECT 
                    u.city,
                    COUNT(DISTINCT u.id) as user_count,
                    COUNT(o.id) as order_count,
                    SUM(o.total_price) as total_revenue
                FROM users u
                LEFT JOIN orders o ON u.id = o.user_id
                GROUP BY u.city
                ORDER BY user_count DESC
            `);

            return {
                success: true,
                data: {
                    summary: {
                        totalUsers: userCount?.count || 0,
                        totalProducts: productCount?.count || 0,
                        totalOrders: orderCount?.count || 0,
                        totalRevenue: totalRevenue?.total || 0,
                        avgOrderValue: avgOrderValue?.avg || 0
                    },
                    topProducts,
                    cityStats
                }
            };
        } catch (error) {
            return {
                success: false,
                error: `İstatistikler getirilemedi: ${error instanceof Error ? error.message : error}`
            };
        }
    }

    async executeCustomQuery(sql: string, params: any[] = []): Promise<QueryResult> {
        try {
            const db = await this.dbManager.getDatabase();

            // Güvenlik kontrolü - sadece SELECT sorgularına izin ver
            const trimmedSql = sql.trim().toLowerCase();
            if (!trimmedSql.startsWith('select')) {
                return {
                    success: false,
                    error: 'Sadece SELECT sorgularına izin verilir'
                };
            }

            const result = await db.all(sql, params);
            return {
                success: true,
                data: result,
                count: result.length
            };
        } catch (error) {
            return {
                success: false,
                error: `Özel sorgu çalıştırılamadı: ${error instanceof Error ? error.message : error}`
            };
        }
    }
} 
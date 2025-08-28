import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    city: string;
    created_at: string;
}

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    created_at: string;
}

export interface Order {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    total_price: number;
    status: string;
    created_at: string;
}

export class DatabaseManager {
    private db: Database | null = null;
    private dbPath: string;

    constructor(dbPath: string = './data/app.db') {
        this.dbPath = dbPath;
    }

    async initialize(): Promise<void> {
        try {
            // Veritabanı dizinini oluştur
            const dbDir = path.dirname(this.dbPath);
            await this.ensureDirectoryExists(dbDir);

            // Veritabanını aç
            this.db = await open({
                filename: this.dbPath,
                driver: sqlite3.Database
            });

            // Tabloları oluştur
            await this.createTables();
            console.log('✅ Veritabanı başarıyla başlatıldı');
        } catch (error) {
            console.error('❌ Veritabanı başlatılamadı:', error);
            throw error;
        }
    }

    private async ensureDirectoryExists(dirPath: string): Promise<void> {
        const fs = await import('fs/promises');
        try {
            await fs.access(dirPath);
        } catch {
            await fs.mkdir(dirPath, { recursive: true });
        }
    }

    private async createTables(): Promise<void> {
        if (!this.db) throw new Error('Veritabanı başlatılmamış');

        // Users tablosu
        await this.db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                age INTEGER,
                city TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Products tablosu
        await this.db.exec(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                price REAL NOT NULL,
                stock INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Orders tablosu
        await this.db.exec(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                total_price REAL NOT NULL,
                status TEXT DEFAULT 'pending',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (product_id) REFERENCES products (id)
            )
        `);

        console.log('✅ Tablolar oluşturuldu');
    }

    async getDatabase(): Promise<Database> {
        if (!this.db) {
            throw new Error('Veritabanı başlatılmamış. Önce initialize() çağırın.');
        }
        return this.db;
    }

    async close(): Promise<void> {
        if (this.db) {
            await this.db.close();
            this.db = null;
        }
    }
}

// Standalone çalıştırma için
if (import.meta.url === `file://${process.argv[1]}`) {
    const dbManager = new DatabaseManager();
    dbManager.initialize()
        .then(() => {
            console.log('Veritabanı kurulumu tamamlandı');
            return dbManager.close();
        })
        .catch(console.error);
} 
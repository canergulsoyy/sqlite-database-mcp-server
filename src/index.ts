import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { DatabaseManager } from "./database/setup.js";
import { DatabaseQueryService } from "./database/query-service.js";

// MCP Server oluştur
const server = new McpServer({
    name: "database-mcp-server",
    version: "1.0.0"
});

// Database manager ve query service
let dbManager: DatabaseManager;
let queryService: DatabaseQueryService;

// Database başlatma
async function initializeDatabase(): Promise<void> {
    try {
        dbManager = new DatabaseManager();
        await dbManager.initialize();
        queryService = new DatabaseQueryService(dbManager);
        console.log('✅ Veritabanı başarıyla başlatıldı');
    } catch (error) {
        console.error('❌ Veritabanı başlatılamadı:', error);
        throw error;
    }
}

// Sağlık kontrolü aracı
server.registerTool(
    "health_check",
    {
        title: "Database Health Check",
        description: "Veritabanı ve sunucu sağlık kontrolü",
        inputSchema: {}
    },
    async () => {
        try {
            if (!dbManager) {
                return { content: [{ type: "text", text: "❌ Veritabanı başlatılmamış" }] };
            }

            const db = await dbManager.getDatabase();
            const result = await db.get('SELECT 1 as test');

            if (result?.test === 1) {
                return { content: [{ type: "text", text: "✅ Veritabanı bağlantısı başarılı" }] };
            } else {
                return { content: [{ type: "text", text: "⚠️ Veritabanı bağlantısında sorun" }] };
            }
        } catch (error) {
            return { content: [{ type: "text", text: `❌ Veritabanı hatası: ${error instanceof Error ? error.message : error}` }] };
        }
    }
);

// Kullanıcıları getir aracı
server.registerTool(
    "get_users",
    {
        title: "Kullanıcıları Getir",
        description: "Veritabanından kullanıcı bilgilerini getirir",
        inputSchema: {
            name: z.string().optional().describe("Kullanıcı adında arama yapılacak metin"),
            city: z.string().optional().describe("Şehir adında arama yapılacak metin"),
            minAge: z.number().optional().describe("Minimum yaş"),
            maxAge: z.number().optional().describe("Maksimum yaş"),
            email: z.string().optional().describe("Email adresinde arama yapılacak metin")
        }
    },
    async (params) => {
        console.log('\n👥 **MCP Server: Kullanıcı Getirme**');
        console.log('   Parametreler:', JSON.stringify(params, null, 2));

        try {
            const result = await queryService.getUsers(params);

            if (result.success) {
                const text = `Kullanıcılar (${result.count} adet):\n\n${result.data?.map((user: any) =>
                    `👤 ${user.name} (${user.age} yaş)\n   📧 ${user.email}\n   🏙️ ${user.city}\n`
                ).join('\n')}`;

                console.log('✅ Kullanıcılar başarıyla getirildi');
                return { content: [{ type: "text", text }] };
            } else {
                console.log('❌ Kullanıcılar getirilemedi:', result.error);
                return { content: [{ type: "text", text: `❌ Hata: ${result.error}` }] };
            }
        } catch (error) {
            console.error('❌ Beklenmeyen hata:', error);
            return { content: [{ type: "text", text: `❌ Beklenmeyen hata: ${error instanceof Error ? error.message : error}` }] };
        }
    }
);

// Ürünleri getir aracı
server.registerTool(
    "get_products",
    {
        title: "Ürünleri Getir",
        description: "Veritabanından ürün bilgilerini getirir",
        inputSchema: {
            name: z.string().optional().describe("Ürün adında arama yapılacak metin"),
            category: z.string().optional().describe("Ürün kategorisi"),
            minPrice: z.number().optional().describe("Minimum fiyat"),
            maxPrice: z.number().optional().describe("Maksimum fiyat"),
            inStock: z.boolean().optional().describe("Stokta olup olmadığı")
        }
    },
    async (params) => {
        console.log('\n📦 **MCP Server: Ürün Getirme**');
        console.log('   Parametreler:', JSON.stringify(params, null, 2));

        try {
            const result = await queryService.getProducts(params);

            if (result.success) {
                const text = `Ürünler (${result.count} adet):\n\n${result.data?.map((product: any) =>
                    `📦 ${product.name}\n   🏷️ ${product.category}\n   💰 ${product.price} TL\n   📊 Stok: ${product.stock}\n`
                ).join('\n')}`;

                console.log('✅ Ürünler başarıyla getirildi');
                return { content: [{ type: "text", text }] };
            } else {
                console.log('❌ Ürünler getirilemedi:', result.error);
                return { content: [{ type: "text", text: `❌ Hata: ${result.error}` }] };
            }
        } catch (error) {
            console.error('❌ Beklenmeyen hata:', error);
            return { content: [{ type: "text", text: `❌ Beklenmeyen hata: ${error instanceof Error ? error.message : error}` }] };
        }
    }
);

// Siparişleri getir aracı
server.registerTool(
    "get_orders",
    {
        title: "Siparişleri Getir",
        description: "Veritabanından sipariş bilgilerini getirir",
        inputSchema: {
            userId: z.number().optional().describe("Kullanıcı ID'si"),
            productId: z.number().optional().describe("Ürün ID'si"),
            status: z.string().optional().describe("Sipariş durumu (pending, shipped, completed)"),
            minTotal: z.number().optional().describe("Minimum toplam tutar"),
            maxTotal: z.number().optional().describe("Maksimum toplam tutar")
        }
    },
    async (params) => {
        console.log('\n🛒 **MCP Server: Sipariş Getirme**');
        console.log('   Parametreler:', JSON.stringify(params, null, 2));

        try {
            const result = await queryService.getOrders(params);

            if (result.success) {
                const text = `Siparişler (${result.count} adet):\n\n${result.data?.map((order: any) =>
                    `🛒 Sipariş #${order.id}\n   👤 ${order.user_name} (${order.user_email})\n   📦 ${order.product_name}\n   📊 Miktar: ${order.quantity}\n   💰 Toplam: ${order.total_price} TL\n   📋 Durum: ${order.status}\n`
                ).join('\n')}`;

                console.log('✅ Siparişler başarıyla getirildi');
                return { content: [{ type: "text", text }] };
            } else {
                console.log('❌ Siparişler getirilemedi:', result.error);
                return { content: [{ type: "text", text: `❌ Hata: ${result.error}` }] };
            }
        } catch (error) {
            console.error('❌ Beklenmeyen hata:', error);
            return { content: [{ type: "text", text: `❌ Beklenmeyen hata: ${error instanceof Error ? error.message : error}` }] };
        }
    }
);

// Veritabanı istatistikleri aracı
server.registerTool(
    "get_database_stats",
    {
        title: "Veritabanı İstatistikleri",
        description: "Veritabanından genel istatistikleri getirir",
        inputSchema: {}
    },
    async () => {
        console.log('\n📊 **MCP Server: İstatistik Getirme**');

        try {
            const result = await queryService.getDatabaseStats();

            if (result.success) {
                const stats = result.data;
                const text = `📊 Veritabanı İstatistikleri\n\n` +
                    `👥 Toplam Kullanıcı: ${stats.summary.totalUsers}\n` +
                    `📦 Toplam Ürün: ${stats.summary.totalProducts}\n` +
                    `🛒 Toplam Sipariş: ${stats.summary.totalOrders}\n` +
                    `💰 Toplam Gelir: ${stats.summary.totalRevenue} TL\n` +
                    `📈 Ortalama Sipariş: ${Math.round(stats.summary.avgOrderValue)} TL\n\n` +
                    `🏆 En Popüler Ürünler:\n${stats.topProducts.map((p: any, i: number) =>
                        `${i + 1}. ${p.name} (${p.order_count} sipariş, ${p.total_revenue} TL)`
                    ).join('\n')}\n\n` +
                    `🏙️ Şehir Bazında İstatistikler:\n${stats.cityStats.map((c: any) =>
                        `${c.city}: ${c.user_count} kullanıcı, ${c.order_count} sipariş, ${c.total_revenue} TL`
                    ).join('\n')}`;

                console.log('✅ İstatistikler başarıyla getirildi');
                return { content: [{ type: "text", text }] };
            } else {
                console.log('❌ İstatistikler getirilemedi:', result.error);
                return { content: [{ type: "text", text: `❌ Hata: ${result.error}` }] };
            }
        } catch (error) {
            console.error('❌ Beklenmeyen hata:', error);
            return { content: [{ type: "text", text: `❌ Beklenmeyen hata: ${error instanceof Error ? error.message : error}` }] };
        }
    }
);

// Özel SQL sorgusu aracı (sadece SELECT)
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
        console.log('\n🔍 **MCP Server: Özel Sorgu Çalıştırma**');
        console.log('   SQL:', sql);
        console.log('   Parametreler:', params);

        try {
            const result = await queryService.executeCustomQuery(sql, params);

            if (result.success) {
                const text = `Sorgu Sonucu (${result.count} kayıt):\n\n${JSON.stringify(result.data, null, 2)}`;

                console.log('✅ Sorgu başarıyla çalıştırıldı');
                return { content: [{ type: "text", text }] };
            } else {
                console.log('❌ Sorgu çalıştırılamadı:', result.error);
                return { content: [{ type: "text", text: `❌ Hata: ${result.error}` }] };
            }
        } catch (error) {
            console.error('❌ Beklenmeyen hata:', error);
            return { content: [{ type: "text", text: `❌ Beklenmeyen hata: ${error instanceof Error ? error.message : error}` }] };
        }
    }
);

// Ana fonksiyon
async function main() {
    try {
        // Veritabanını başlat
        await initializeDatabase();

        // MCP Server'ı başlat
        const transport = new StdioServerTransport();
        await server.connect(transport);

        console.log('🚀 Database MCP Server başarıyla başlatıldı');
    } catch (error) {
        console.error('❌ Server başlatılamadı:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🔄 Kapatılıyor...');
    if (dbManager) {
        await dbManager.close();
    }
    process.exit(0);
});

main().catch((err) => {
    console.error(err);
    process.exit(1);
}); 
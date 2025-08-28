import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import OpenAI from "openai";
import { z } from "zod";

// Tool tanımları
const USER_QUERY_SCHEMA = z.object({
    name: z.string().optional().describe("Kullanıcı adında arama yapılacak metin"),
    city: z.string().optional().describe("Şehir adında arama yapılacak metin"),
    minAge: z.number().optional().describe("Minimum yaş"),
    maxAge: z.number().optional().describe("Maksimum yaş"),
    email: z.string().optional().describe("Email adresinde arama yapılacak metin")
});

const PRODUCT_QUERY_SCHEMA = z.object({
    name: z.string().optional().describe("Ürün adında arama yapılacak metin"),
    category: z.string().optional().describe("Ürün kategorisi"),
    minPrice: z.number().optional().describe("Minimum fiyat"),
    maxPrice: z.number().optional().describe("Maksimum fiyat"),
    inStock: z.boolean().optional().describe("Stokta olup olmadığı")
});

const ORDER_QUERY_SCHEMA = z.object({
    userId: z.number().optional().describe("Kullanıcı ID'si"),
    productId: z.number().optional().describe("Ürün ID'si"),
    status: z.string().optional().describe("Sipariş durumu"),
    minTotal: z.number().optional().describe("Minimum toplam tutar"),
    maxTotal: z.number().optional().describe("Maksimum toplam tutar")
});

export class DatabaseLLMClient {
    private mcpClient: Client;
    private openai: OpenAI;
    private transport?: StdioClientTransport;
    private isInitialized = false;

    constructor(private mcpServerPath: string) {
        this.mcpClient = new Client({
            name: "database-llm-client",
            version: "1.0.0"
        });

        // OpenRouter konfigürasyonu
        const openrouterApiKey = process.env.OPENROUTER_API_KEY;
        const openrouterBaseUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";

        if (!openrouterApiKey) {
            throw new Error("OPENROUTER_API_KEY environment variable bulunamadı!");
        }

        this.openai = new OpenAI({
            apiKey: openrouterApiKey,
            baseURL: openrouterBaseUrl,
            defaultHeaders: {
                "HTTP-Referer": "https://github.com/canergulsoyy/database-mcp-server",
                "X-Title": "Database MCP Server"
            }
        });
    }

    async initialize(): Promise<void> {
        try {
            // MCP Server'a bağlan
            this.transport = new StdioClientTransport({
                command: "node",
                args: [this.mcpServerPath]
            });

            await this.mcpClient.connect(this.transport);
            this.isInitialized = true;

            console.log('🔗 MCP Server bağlantısı kuruldu');
            console.log('🤖 OpenRouter LLM bağlantısı kuruldu (gpt-oss-20b:free)');
        } catch (error) {
            throw new Error(`MCP Server bağlantısı başarısız: ${error instanceof Error ? error.message : error}`);
        }
    }

    async listTools(): Promise<any[]> {
        if (!this.isInitialized) {
            throw new Error("Client henüz başlatılmadı");
        }

        try {
            const tools = await this.mcpClient.listTools();
            return tools.tools || [];
        } catch (error) {
            throw new Error(`Araçlar listelenemedi: ${error instanceof Error ? error.message : error}`);
        }
    }

    async processQuestion(question: string): Promise<string> {
        if (!this.isInitialized) {
            throw new Error("Client henüz başlatılmadı");
        }

        try {
            // 1. OpenRouter ile soruyu analiz et ve uygun tool'u seç
            const toolSelection = await this.analyzeQuestionWithLLM(question);

            // 2. MCP Server'dan tool'u çağır
            const toolResult = await this.callMCPTool(toolSelection);

            // 3. Sonucu OpenRouter ile yorumla ve Türkçe doğal dil yanıtı oluştur
            const finalResponse = await this.generateNaturalLanguageResponse(question, toolResult);

            return finalResponse;

        } catch (error) {
            throw new Error(`Soru işlenemedi: ${error instanceof Error ? error.message : error}`);
        }
    }

    private async analyzeQuestionWithLLM(question: string): Promise<{
        toolName: string;
        parameters: any;
    }> {
        console.log('\n🔍 **LLM Parse Süreci Başlıyor**');
        console.log('📝 Kullanıcı sorusu:', question);

        const prompt = `
        Sen bir veritabanı asistanısın. Kullanıcının sorusunu analiz et ve uygun MCP tool'unu seç.
        
        Mevcut tool'lar:
        - get_users: Kullanıcı bilgilerini getirir (name, city, age, email parametreleri ile)
        - get_products: Ürün bilgilerini getirir (name, category, price, stock parametreleri ile)
        - get_orders: Sipariş bilgilerini getirir (userId, productId, status, total parametreleri ile)
        - get_database_stats: Genel veritabanı istatistiklerini getirir
        - execute_custom_query: Özel SQL sorguları çalıştırır (sadece SELECT)
        
        Kullanıcı sorusu: "${question}"
        
        Yanıtını şu JSON formatında ver:
        {
            "toolName": "tool_adı",
            "parameters": {
                // Tool'a özel parametreler
            }
        }
        
        Örnekler:
        - "İstanbul'da yaşayan kullanıcıları göster" → get_users, city: "İstanbul"
        - "Elektronik kategorisindeki ürünleri listele" → get_products, category: "Elektronik"
        - "Tamamlanan siparişleri göster" → get_orders, status: "completed"
        - "Veritabanı istatistiklerini göster" → get_database_stats
        - "En pahalı 5 ürünü getir" → execute_custom_query, sql: "SELECT * FROM products ORDER BY price DESC LIMIT 5"
        
        Önemli:
        - Tool adını doğru seç
        - Parametreleri uygun şekilde ayarla
        - Sadece JSON formatında yanıt ver, başka açıklama ekleme
        `;

        console.log('🤖 OpenRouter\'a gönderilen prompt:');
        console.log(prompt);

        const completion = await this.openai.chat.completions.create({
            model: "gpt-oss-20b:free",
            messages: [
                {
                    role: "system",
                    content: "Sen bir veritabanı asistanısın. Sadece JSON formatında yanıt ver."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.1,
            max_tokens: 500
        });

        const response = completion.choices[0]?.message?.content;
        if (!response) {
            throw new Error("OpenRouter'dan yanıt alınamadı");
        }

        console.log('🤖 OpenRouter\'dan gelen ham yanıt:');
        console.log(response);

        try {
            // JSON parse et
            console.log('\n🔧 **JSON Parse Süreci**');
            const parsed = JSON.parse(response);
            console.log('✅ JSON parse başarılı:');
            console.log('   Tool Name:', parsed.toolName);
            console.log('   Parameters:', parsed.parameters);

            // Tool validation
            console.log('\n🔍 **Tool Validation**');
            const validTools = ['get_users', 'get_products', 'get_orders', 'get_database_stats', 'execute_custom_query'];

            if (!validTools.includes(parsed.toolName)) {
                throw new Error(`Geçersiz tool adı: ${parsed.toolName}`);
            }

            console.log('✅ Tool adı geçerli:', parsed.toolName);

            return {
                toolName: parsed.toolName,
                parameters: parsed.parameters || {}
            };
        } catch (error) {
            console.error('❌ Parse hatası:', error);
            throw new Error(`Tool seçimi parse edilemedi: ${error instanceof Error ? error.message : error}`);
        }
    }

    private async callMCPTool(toolSelection: {
        toolName: string;
        parameters: any;
    }): Promise<any> {
        console.log('\n🚀 **MCP Tool Call Süreci**');
        console.log('   Tool Name:', toolSelection.toolName);
        console.log('   Parameters:', toolSelection.parameters);

        try {
            console.log('📡 MCP Server\'a tool çağrısı yapılıyor...');
            const result = await this.mcpClient.callTool({
                name: toolSelection.toolName,
                arguments: toolSelection.parameters
            });

            console.log('✅ MCP Tool call başarılı:');
            console.log('   Result:', JSON.stringify(result, null, 2));

            return result;
        } catch (error) {
            console.error('❌ MCP Tool call hatası:', error);
            throw new Error(`MCP Tool çağrısı başarısız: ${error instanceof Error ? error.message : error}`);
        }
    }

    private async generateNaturalLanguageResponse(
        originalQuestion: string,
        toolResult: any
    ): Promise<string> {
        console.log('\n🎨 **Natural Language Response Generation**');
        console.log('   Original Question:', originalQuestion);
        console.log('   Tool Result:', JSON.stringify(toolResult, null, 2));

        const prompt = `
        Sen bir veritabanı asistanısın. MCP tool'undan gelen teknik veriyi kullanarak, 
        kullanıcının orijinal sorusuna Türkçe doğal dilde yanıt ver.
        
        Kullanıcının orijinal sorusu: "${originalQuestion}"
        
        Tool'dan gelen veri: ${JSON.stringify(toolResult, null, 2)}
        
        Lütfen:
        1. Veriyi anlaşılır Türkçe ile açıkla
        2. Sayısal verileri kullanıcı dostu şekilde sun
        3. Gerekirse ek bilgiler ekle (ör: "Bu sonuçlara göre...")
        4. Sadece Türkçe yanıt ver, JSON formatında değil
        5. Yanıtı kısa ve öz tut
        6. Eğer veri yoksa bunu nazikçe belirt
        
        Yanıt:
        `;

        console.log('🤖 OpenRouter\'a gönderilen response generation prompt:');
        console.log(prompt);

        const completion = await this.openai.chat.completions.create({
            model: "gpt-oss-20b:free",
            messages: [
                {
                    role: "system",
                    content: "Sen bir veritabanı asistanısın. Sadece Türkçe doğal dilde yanıt ver."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 400
        });

        const response = completion.choices[0]?.message?.content;
        if (!response) {
            throw new Error("Doğal dil yanıtı oluşturulamadı");
        }

        console.log('✅ Natural language response oluşturuldu:');
        console.log('   Response:', response);

        return response;
    }

    async cleanup(): Promise<void> {
        if (this.isInitialized) {
            try {
                await this.mcpClient.close();
                if (this.transport) {
                    this.transport.close();
                }
                this.isInitialized = false;
                console.log('🧹 Client temizlendi');
            } catch (error) {
                console.error('Temizlik hatası:', error);
            }
        }
    }
} 
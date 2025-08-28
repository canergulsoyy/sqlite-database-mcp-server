#!/usr/bin/env node

/**
 * Database MCP Server Test Client
 * 
 * Bu dosya, MCP Server'ın temel işlevselliğini test etmek için kullanılır.
 * Standalone olarak çalıştırılabilir.
 */

import { DatabaseLLMClient } from './dist/client/weather-client.js';
import dotenv from 'dotenv';

// Environment variables yükle
dotenv.config();

async function testClient() {
    console.log('🧪 Database MCP Server Test Client Başlatılıyor...\n');

    // Environment variables kontrolü
    if (!process.env.OPENROUTER_API_KEY) {
        console.error('❌ OPENROUTER_API_KEY environment variable bulunamadı!');
        console.log('📝 .env dosyasına OPENROUTER_API_KEY=your_openrouter_api_key_here ekleyin');
        process.exit(1);
    }

    const mcpServerPath = process.env.MCP_SERVER_PATH || './dist/index.js';
    console.log('🔧 MCP Server Path:', mcpServerPath);

    try {
        // Client'ı başlat
        const client = new DatabaseLLMClient(mcpServerPath);
        await client.initialize();

        console.log('✅ MCP Server bağlantısı başarılı!');

        // Mevcut tool'ları listele
        const tools = await client.listTools();
        console.log('🔧 Mevcut araçlar:', tools.map(t => t.name).join(', '));

        // Test soruları
        const testQuestions = [
            "Veritabanı istatistiklerini göster",
            "İstanbul'da yaşayan kullanıcıları göster",
            "Elektronik kategorisindeki ürünleri listele",
            "Tamamlanan siparişleri göster",
            "En pahalı 3 ürünü getir"
        ];

        console.log('\n🧪 Test soruları başlatılıyor...\n');

        for (let i = 0; i < testQuestions.length; i++) {
            const question = testQuestions[i];
            console.log(`\n${'─'.repeat(60)}`);
            console.log(`🧪 Test ${i + 1}/${testQuestions.length}: ${question}`);
            console.log(`${'─'.repeat(60)}`);

            try {
                const startTime = Date.now();
                const response = await client.processQuestion(question);
                const endTime = Date.now();
                const duration = endTime - startTime;

                console.log(`✅ Yanıt (${duration}ms):`);
                console.log(response);
            } catch (error) {
                console.error(`❌ Hata:`, error instanceof Error ? error.message : error);
            }

            // Test'ler arası bekleme
            if (i < testQuestions.length - 1) {
                console.log('\n⏳ Sonraki test için bekleniyor...');
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        console.log('\n🎉 Tüm testler tamamlandı!');

        // Client'ı temizle
        await client.cleanup();

    } catch (error) {
        console.error('❌ Test başarısız:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

// Standalone çalıştırma için
if (import.meta.url === `file://${process.argv[1]}`) {
    testClient().catch(console.error);
} 
---
name: 🤖 MCP
about: Report MCP (Model Context Protocol) issues or suggest improvements
title: '[MCP] '
labels: ['mcp', 'protocol', 'llm', 'needs-triage']
assignees: ''
---

## 🤖 MCP Issue

### 🔍 Issue Type

<!-- Uygun olanları işaretleyin -->

- [ ] 🚫 Connection failure
- [ ] ❌ Tool execution error
- [ ] 🔧 Protocol compliance issue
- [ ] 📊 Performance problem
- [ ] 🚀 Tool registration issue
- [ ] 💡 MCP improvement suggestion
- [ ] 📝 MCP documentation
- [ ] 🔍 LLM integration issue

## 📋 Details

### MCP Problem

<!-- MCP sorununu detaylı açıklayın -->

### Current State

<!-- Mevcut durum nedir? -->

### Expected State

<!-- Nasıl olması gerekiyor? -->

### Impact

<!-- Bu sorunun etkisi nedir? -->

- [ ] MCP Server unusable
- [ ] LLM integration broken
- [ ] Tools not accessible
- [ ] Performance degraded
- [ ] Other: <!-- specify -->

## 🔍 Technical Details

### MCP Environment

<!-- MCP ortamı bilgileri -->

- **MCP Version**: <!-- e.g. 1.3.0 -->
- **Protocol**: <!-- e.g. stdio, tcp, websocket -->
- **Transport**: <!-- e.g. StdioServerTransport -->
- **Node.js Version**: <!-- e.g. 18.18.0 -->
- **MCP SDK Version**: <!-- e.g. @modelcontextprotocol/sdk@1.3.0 -->

### Affected Components

<!-- Etkilenen bileşenler -->

- [ ] MCP Server
- [ ] MCP Client
- [ ] Tool registration
- [ ] Tool execution
- [ ] Protocol communication
- [ ] LLM integration
- [ ] Error handling
- [ ] Other: <!-- specify -->

### MCP Tools

<!-- MCP araçları -->

```typescript
// Current tools
server.registerTool(
    "health_check",
    {
        title: "Database Health Check",
        description: "Veritabanı ve sunucu sağlık kontrolü",
        inputSchema: {}
    },
    async () => { /* implementation */ }
);

// Issues identified
// 1. Tool not responding
// 2. Schema validation failed
// 3. Execution timeout
```

## 🚫 Connection Issues

### Connection Failure Details

<!-- Bağlantı hatası detayları -->

```bash
# Connection attempt
npm run client:dev

# Error message
Error: Failed to connect to MCP Server
Error: Connection timeout after 30 seconds

# Stack trace
at DatabaseLLMClient.connect (src/client/weather-client.ts:45:15)
at DatabaseLLMClient.initialize (src/client/weather-client.ts:23:15)
```

### Transport Issues

<!-- Transport sorunları -->

- [ ] stdio transport failed
- [ ] TCP connection refused
- [ ] WebSocket connection failed
- [ ] Protocol handshake failed
- [ ] Other: <!-- specify -->

### Authentication Issues

<!-- Kimlik doğrulama sorunları -->

- [ ] API key invalid
- [ ] Authentication failed
- [ ] Permission denied
- [ ] Rate limit exceeded
- [ ] Other: <!-- specify -->

## ❌ Tool Issues

### Tool Execution Errors

<!-- Araç çalıştırma hataları -->

```typescript
// Tool execution attempt
const result = await client.callTool("get_users", { city: "İstanbul" });

// Error message
Error: Tool execution failed
Error: Database connection error

// Expected result
// Should return users in İstanbul
```

### Tool Registration Issues

<!-- Araç kayıt sorunları -->

- [ ] Tool not found
- [ ] Schema validation failed
- [ ] Tool execution timeout
- [ ] Tool crashed
- [ ] Other: <!-- specify -->

### Tool Schema Issues

<!-- Araç şema sorunları -->

```typescript
// Schema definition
inputSchema: {
    name: z.string().optional().describe("Kullanıcı adında arama yapılacak metin"),
    city: z.string().optional().describe("Şehir adında arama yapılacak metin")
}

// Issues identified
// 1. Schema too restrictive
// 2. Missing validation
// 3. Description unclear
```

## 🔧 Protocol Issues

### Protocol Compliance

<!-- Protokol uyumluluğu -->

- [ ] MCP version mismatch
- [ ] Protocol violation
- [ ] Message format error
- [ ] Response timeout
- [ ] Other: <!-- specify -->

### Communication Issues

<!-- İletişim sorunları -->

```typescript
// Communication attempt
const response = await server.handleRequest({
    jsonrpc: "2.0",
    id: "1",
    method: "tools/call",
    params: { name: "get_users", arguments: {} }
});

// Issues encountered
// 1. Invalid JSON-RPC format
// 2. Method not found
// 3. Parameter validation failed
```

## 📊 Performance Issues

### Tool Execution Performance

<!-- Araç çalıştırma performansı -->

- **Execution Time**: <!-- e.g. 5 seconds -->
- **Expected Time**: <!-- e.g. < 1 second -->
- **Memory Usage**: <!-- e.g. 256MB -->
- **CPU Usage**: <!-- e.g. 85% -->

### LLM Integration Performance

<!-- LLM entegrasyon performansı -->

- **API Response Time**: <!-- e.g. 3 seconds -->
- **Token Processing**: <!-- e.g. 1000 tokens/second -->
- **Context Window**: <!-- e.g. 4096 tokens -->
- **Rate Limiting**: <!-- e.g. 100 requests/minute -->

## 🚀 Tool Registration Issues

### Tool Discovery

<!-- Araç keşfi -->

```typescript
// Tool listing attempt
const tools = await client.listTools();

// Issues encountered
// 1. Tools not listed
// 2. Tool descriptions missing
// 3. Tool schemas incomplete
// 4. Tool categories missing
```

### Tool Metadata

<!-- Araç metadata'sı -->

- [ ] Title missing
- [ ] Description unclear
- [ ] Schema incomplete
- [ ] Examples missing
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
# Check MCP Server status
npm run dev

# Check MCP Client connection
npm run client:dev

# Check tool registration
# Look for tool registration logs

# Check protocol communication
# Monitor stdio/tcp traffic
```

### Common Issues

<!-- Yaygın sorunlar -->

- [ ] Server not running
- [ ] Client connection failed
- [ ] Tool not registered
- [ ] Schema validation failed
- [ ] Protocol version mismatch
- [ ] Other: <!-- specify -->

## 📝 Checklist

- [ ] Issue type seçildi
- [ ] MCP sorunu detaylı açıklandı
- [ ] Mevcut ve beklenen durum belirtildi
- [ ] Etki analizi yapıldı
- [ ] MCP ortamı bilgileri sağlandı
- [ ] Etkilenen bileşenler belirtildi
- [ ] MCP araçları eklendi
- [ ] Bağlantı sorunları detaylandırıldı
- [ ] Araç sorunları belirtildi
- [ ] Protokol sorunları kontrol edildi
- [ ] Performans metrikleri eklendi
- [ ] Araç kayıt sorunları belirtildi
- [ ] Çözüm önerileri sunuldu
- [ ] Troubleshooting adımları eklendi
- [ ] Uygun etiketler eklendi

## 🎯 Priority

<!-- Öncelik seviyesi -->

- [ ] 🔴 Critical - MCP Server completely unusable
- [ ] 🟠 High - Significant MCP issues
- [ ] 🟡 Medium - Some MCP problems
- [ ] 🔵 Low - Minor MCP improvements

## 🏷️ Labels

<!-- Uygun etiketleri ekleyin -->
- [ ] `mcp`
- [ ] `protocol`
- [ ] `llm`
- [ ] `tools`
- [ ] `integration`
- [ ] `performance`
- [ ] `communication`
- [ ] `schema`

---

## 🤖 MCP Commitment

Database MCP Server is committed to maintaining a reliable and compliant MCP implementation. We believe that good MCP practices lead to better LLM integration and tool accessibility.

**Remember**: MCP is the bridge between your application and LLMs. Proper tool registration, schema validation, and error handling are essential.

For MCP support:
- **Email**: mcp@yourdomain.com
- **Documentation**: [MCP Guide](link-to-mcp-guide)
- **Resources**: [Model Context Protocol](https://modelcontextprotocol.io/) 
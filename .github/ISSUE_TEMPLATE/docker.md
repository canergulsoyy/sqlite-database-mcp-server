---
name: 🐳 Docker
about: Report Docker issues or suggest improvements
title: '[DOCKER] '
labels: ['docker', 'containerization', 'needs-triage']
assignees: ''
---

## 🐳 Docker Issue

### 🔍 Issue Type

<!-- Uygun olanları işaretleyin -->

- [ ] 🚫 Build failure
- [ ] ❌ Container won't start
- [ ] 🔧 Configuration issue
- [ ] 📊 Performance problem
- [ ] 🚀 Multi-stage build issue
- [ ] 💡 Docker improvement suggestion
- [ ] 📝 Docker documentation
- [ ] 🔍 Environment issue

## 📋 Details

### Docker Problem

<!-- Docker sorununu detaylı açıklayın -->

### Current State

<!-- Mevcut durum nedir? -->

### Expected State

<!-- Nasıl olması gerekiyor? -->

### Impact

<!-- Bu sorunun etkisi nedir? -->

- [ ] Development blocked
- [ ] Deployment failed
- [ ] Performance degraded
- [ ] Resource usage increased
- [ ] Other: <!-- specify -->

## 🔍 Technical Details

### Docker Environment

<!-- Docker ortamı bilgileri -->

- **Docker Version**: <!-- e.g. 24.0.0 -->
- **Docker Compose Version**: <!-- e.g. 2.20.0 -->
- **OS**: <!-- e.g. Ubuntu 22.04, macOS 12.0, Windows 11 -->
- **Architecture**: <!-- e.g. x86_64, ARM64 -->
- **Docker Desktop**: <!-- Yes/No -->

### Affected Components

<!-- Etkilenen bileşenler -->

- [ ] Dockerfile
- [ ] docker-compose.yml
- [ ] Multi-stage builds
- [ ] Volume mounts
- [ ] Network configuration
- [ ] Environment variables
- [ ] Health checks
- [ ] Other: <!-- specify -->

### Container Information

<!-- Container bilgileri -->

- **Container Name**: <!-- e.g. database-mcp-server -->
- **Image Tag**: <!-- e.g. latest, 1.0.0, development -->
- **Base Image**: <!-- e.g. node:18-alpine -->
- **Port Mappings**: <!-- e.g. 3000:3000 -->
- **Volume Mounts**: <!-- e.g. ./data:/app/data -->

## 🚫 Build Issues

### Build Failure Details

<!-- Build hatası detayları -->

```bash
# Build command
docker build -t database-mcp-server .

# Error message
Step 5/15 : COPY --from=builder /app/dist ./dist
COPY failed: stat /var/lib/docker/tmp/docker-builder1234567890/app/dist: no such file or directory

# Build context
# Context: /path/to/project
# Dockerfile: /path/to/project/Dockerfile
```

### Build Context

<!-- Build context bilgileri -->

- **Build Context**: <!-- e.g. . -->
- **Dockerfile Path**: <!-- e.g. ./Dockerfile -->
- **Build Arguments**: <!-- e.g. NODE_ENV=production -->
- **Target Stage**: <!-- e.g. production, development, test -->

### Multi-stage Build Issues

<!-- Multi-stage build sorunları -->

- [ ] Stage dependencies missing
- [ ] Build context too large
- [ ] Cache invalidation issues
- [ ] Stage order problems
- [ ] Other: <!-- specify -->

## ❌ Runtime Issues

### Container Startup Problems

<!-- Container başlatma sorunları -->

```bash
# Run command
docker run -d --name database-mcp-server database-mcp-server:latest

# Error message
Error response from daemon: OCI runtime create failed: container_linux.go:380: starting container process caused: exec: "npm": executable file not found in $PATH

# Container logs
docker logs database-mcp-server
```

### Health Check Issues

<!-- Health check sorunları -->

```bash
# Health check status
docker inspect database-mcp-server --format='{{.State.Health.Status}}'

# Health check logs
docker inspect database-mcp-server --format='{{range .State.Health.Log}}{{.Output}}{{end}}'
```

### Resource Issues

<!-- Kaynak sorunları -->

- **Memory Usage**: <!-- e.g. 512MB -->
- **CPU Usage**: <!-- e.g. 25% -->
- **Disk Usage**: <!-- e.g. 1.2GB -->
- **Network Usage**: <!-- e.g. 10MB/s -->

## 🔧 Configuration Issues

### Dockerfile Problems

<!-- Dockerfile sorunları -->

```dockerfile
# Current Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production  # ❌ Missing source code copy

# Issues identified
# 1. Missing source code copy before npm ci
# 2. No build step
# 3. Incorrect target stage reference
```

### Docker Compose Issues

<!-- Docker Compose sorunları -->

```yaml
# Current docker-compose.yml
services:
  database-mcp-server:
    build:
      context: .
      dockerfile: Dockerfile
      target: production  # ❌ Target stage doesn't exist
    environment:
      - NODE_ENV=production
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}  # ❌ Variable not set
```

### Environment Variables

<!-- Environment variables sorunları -->

- [ ] Missing required variables
- [ ] Incorrect variable names
- [ ] Variable not set in .env
- [ ] Variable format issues
- [ ] Other: <!-- specify -->

## 📊 Performance Issues

### Build Performance

<!-- Build performansı -->

- **Build Time**: <!-- e.g. 5 minutes -->
- **Build Cache Hit Rate**: <!-- e.g. 60% -->
- **Image Size**: <!-- e.g. 256MB -->
- **Layer Count**: <!-- e.g. 15 layers -->

### Runtime Performance

<!-- Runtime performansı -->

- **Startup Time**: <!-- e.g. 30 seconds -->
- **Memory Usage**: <!-- e.g. 128MB -->
- **CPU Usage**: <!-- e.g. 15% -->
- **Network Latency**: <!-- e.g. 50ms -->

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
# Check container status
docker ps -a

# Inspect container
docker inspect database-mcp-server

# Check container logs
docker logs database-mcp-server

# Execute into container
docker exec -it database-mcp-server sh

# Check image layers
docker history database-mcp-server

# Check build cache
docker builder prune
```

### Common Issues

<!-- Yaygın sorunlar -->

- [ ] Permission denied
- [ ] Port already in use
- [ ] Volume mount issues
- [ ] Network connectivity
- [ ] Resource constraints
- [ ] Other: <!-- specify -->

## 📝 Checklist

- [ ] Issue type seçildi
- [ ] Docker sorunu detaylı açıklandı
- [ ] Mevcut ve beklenen durum belirtildi
- [ ] Etki analizi yapıldı
- [ ] Docker ortamı bilgileri sağlandı
- [ ] Etkilenen bileşenler belirtildi
- [ ] Container bilgileri eklendi
- [ ] Build sorunları detaylandırıldı
- [ ] Runtime sorunları belirtildi
- [ ] Konfigürasyon sorunları kontrol edildi
- [ ] Performans metrikleri eklendi
- [ ] Çözüm önerileri sunuldu
- [ ] Troubleshooting adımları eklendi
- [ ] Uygun etiketler eklendi

## 🎯 Priority

<!-- Öncelik seviyesi -->

- [ ] 🔴 Critical - Container completely unusable
- [ ] 🟠 High - Significant container issues
- [ ] 🟡 Medium - Some container problems
- [ ] 🔵 Low - Minor container improvements

## 🏷️ Labels

<!-- Uygun etiketleri ekleyin -->
- [ ] `docker`
- [ ] `containerization`
- [ ] `build`
- [ ] `runtime`
- [ ] `performance`
- [ ] `configuration`
- [ ] `deployment`
- [ ] `devops`

---

## 🐳 Docker Commitment

Database MCP Server is committed to providing reliable and efficient Docker containers. We believe that good containerization practices lead to consistent deployments and better developer experience.

**Remember**: Docker is not just about packaging, it's about consistency, portability, and efficiency.

For Docker support:
- **Email**: docker@yourdomain.com
- **Documentation**: [Docker Guide](link-to-docker-guide)
- **Resources**: [Container Best Practices](link-to-container-best-practices) 
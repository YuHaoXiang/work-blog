---
title: DNS
---

# DNS (域名系统)

## 记录类型

| 类型 | 含义 |
|------|------|
| A | IPv4 地址 |
| AAAA | IPv6 地址 |
| CNAME | 规范名称 (别名) |
| MX | 邮件交换服务器 |
| TXT | 文本记录 |
| NS | 域名服务器 |
| SOA | 授权起始 |
| PTR | 反向解析 |
| SRV | 服务记录 |

## 解析流程

```
浏览器缓存 → 系统hosts → 本地DNS缓存 → 根域名服务器 → 
顶级域名服务器 → 权威域名服务器 → 返回IP
```

## 常用命令

### dig

```bash
# 查询 A 记录
dig example.com

# 指定 DNS 服务器
dig @8.8.8.8 example.com

# 查看详细过程
dig +trace example.com

# 反向解析
dig -x 93.184.216.34
```

### nslookup

```bash
nslookup example.com
nslookup -type=mx example.com
```

### host

```bash
host example.com
host -t CNAME www.example.com
```

## DNS 污染/劫持

- DNS 欺骗：返回虚假 IP
- DNS 劫持：重定向到其他服务器

## 优化策略

- DNS 缓存
- DNS 预解析 (`<link rel="dns-prefetch">`)
- 使用 CDN
- Anycast

---
title: HTTP 与 HTTPS
---

# HTTP 协议

## 请求方法

| 方法 | 含义 |
|------|------|
| GET | 获取资源 |
| POST | 提交数据 |
| PUT | 更新资源 |
| DELETE | 删除资源 |
| PATCH | 部分更新 |
| HEAD | 获取头部 |

## 状态码

| 分类 | 含义 |
|------|------|
| 1xx | 信息性 |
| 2xx | 成功 |
| 3xx | 重定向 |
| 4xx | 客户端错误 |
| 5xx | 服务器错误 |

### 常见状态码

```
200 OK
201 Created
204 No Content
301 Moved Permanently
302 Found
304 Not Modified
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
```

## HTTP/1.1 特性

- 持久连接 (Keep-Alive)
- 管道化 (Pipelining)
- 分块传输 (Chunked Transfer)
- 虚拟主机 (Host 头)

## HTTP/2 特性

- 多路复用
- 头部压缩 (HPACK)
- 服务器推送
- 二进制分帧

## HTTPS

### TLS/SSL 握手

```
1. 客户端 → 服务器：ClientHello (支持的加密套件)
2. 服务器 → 客户端：ServerHello + 证书 + 选中的加密套件
3. 客户端 → 服务器：Pre-Master Secret (公钥加密)
4. 双方：生成会话密钥
5. 加密通信开始
```

### 证书类型

- DV (Domain Validation) - 域名验证
- OV (Organization Validation) - 组织验证
- EV (Extended Validation) - 扩展验证

### 中间人攻击防御

- 证书链验证
- 证书吊销检查 (CRL/OCSP)
- 证书固定 (Certificate Pinning)

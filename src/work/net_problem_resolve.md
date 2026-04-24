---
title: 网络问题排查思路
description: Linux上问题排查思路
tag:
    - Network
---

# 网络问题排查思路

## 排查流程

```
1. 物理层 → 2. 数据链路层 → 3. 网络层 → 4. 传输层 → 5. 应用层
```

## 常用工具

| 层级 | 工具 |
|------|------|
| 物理/链路 | ip link, ethtool |
| 网络层 | ping, traceroute, ip addr, ip route |
| 传输层 | netstat, ss, ncat |
| 应用层 | curl, telnet, dig |
| 抓包 | tcpdump, tshark, wireshark |

---

# 抓包实战

## tcpdump

### 基础用法

```bash
# 监听指定网卡
tcpdump -i eth0

# 监听指定端口
tcpdump -i eth0 port 80

# 监听指定主机
tcpdump -i eth0 host 192.168.1.100

# 监听特定协议
tcpdump -i eth0 tcp
tcpdump -i eth0 udp
tcpdump -i eth0 icmp

# 组合条件
tcpdump -i eth0 port 80 and host 192.168.1.100
tcpdump -i eth0 port 80 or port 443

# 保存到文件
tcpdump -i eth0 -w capture.pcap
tcpdump -i eth0 -w capture.pcap -C 100  # 100MB 轮转

# 读取文件
tcpdump -r capture.pcap

# 显示更多详情 (-v, -vv, -vvv)
tcpdump -i eth0 -vv

# 显示时间戳
tcpdump -i eth0 -tttt
```

### 常用过滤表达式

```bash
# 源/目标端口
tcpdump -i eth0 src port 80
tcpdump -i eth0 dst port 80

# 源/目标 IP
tcpdump -i eth0 src 192.168.1.100
tcpdump -i eth0 dst 10.0.0.1

# TCP 标志位
tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0'    # SYN 包
tcpdump -i eth0 'tcp[tcpflags] & tcp-ack != 0'    # ACK 包
tcpdump -i eth0 'tcp[tcpflags] & tcp-fin != 0'    # FIN 包
tcpdump -i eth0 'tcp[tcpflags] & tcp-rst != 0'    # RST 包

# 包大小
tcpdump -i eth0 less 100    # 小于 100 字节
tcpdump -i eth0 greater 1000 # 大于 1000 字节

# 端口范围
tcpdump -i eth0 portrange 80-443

# 排除条件
tcpdump -i eth0 not port 22
tcpdump -i eth0 not host 192.168.1.1
```

### 高级用法

```bash
# 抓取 HTTP 请求体
tcpdump -i eth0 -A port 80

# 抓取 HTTP 请求头
tcpdump -i eth0 -s 0 -A port 80 | grep 'GET\|POST'

# 抓取 DNS 查询
tcpdump -i eth0 -s 0 port 53

# 抓取特定 VLAN
tcpdump -i eth0 vlan 10

# 抓取 TTL 异常包
tcpdump -i eth0 'ip[8] < 64'

# 统计各协议流量
tcpdump -i eth0 -c 1000 -q | tail -20
```

## tshark (命令行 Wireshark)

### 基础用法

```bash
# 实时抓包显示
tshark -i eth0

# 只抓指定数量
tshark -i eth0 -c 100

# 保存到文件
tshark -i eth0 -w capture.pcap

# 读取文件
tshark -r capture.pcap

# 只显示指定字段
tshark -i eth0 -T fields -e ip.src -e ip.dst -e tcp.port

# 过滤语法
tshark -i eth0 -f "tcp port 80"
tshark -r capture.pcap -Y "http.request.method == GET"
```

### 常用过滤

```bash
# HTTP 请求
tshark -i eth0 -Y "http.request"

# HTTP 响应
tshark -i eth0 -Y "http.response"

# DNS 查询
tshark -i eth0 -Y "dns"

# TCP 重传
tshark -i eth0 -Y "tcp.retransmission"

# TCP 握手/挥手
tshark -i eth0 -Y "tcp.flags.syn == 1"
tshark -i eth0 -Y "tcp.flags.fin == 1"

# HTTP 2xx/4xx/5xx
tshark -i eth0 -Y "http.response.code == 200"
tshark -i eth0 -Y "http.response.code >= 400"

# 显示 JSON 格式
tshark -r capture.pcap -T json -Y "http"
```

## Wireshark GUI

### 常用显示过滤器

```bash
# IP 相关
ip.src == 192.168.1.100
ip.dst == 10.0.0.1
ip.addr == 192.168.1.100    # 源或目标

# 端口
tcp.port == 80
tcp.srcport == 8080
udp.dstport == 53

# 协议
http
dns
tcp
arp

# HTTP
http.request.method == "GET"
http.request.uri contains "/api/"
http.response.code == 200

# TCP 标志
tcp.flags.syn == 1
tcp.flags.ack == 1
tcp.flags.reset == 1

# 组合
ip.src == 192.168.1.100 && tcp.port == 80
http.request && ip.addr == 192.168.1.100
```

### 常用技巧

- **Follow TCP Stream**: 右键 → Follow → TCP Stream，看完整会话
- **Expert Information**: 分析 → Expert Information，查看异常
- **Statistics**: 统计菜单，流量分析
- **Endpoints**: 统计 → Endpoints，查看端点
- **IO Graphs**: 统计 → IO Graphs，流量可视化

---

# 常见场景

## 场景 1：连接超时

```bash
# 1. 检查链路连通性
ping -c 5 目标IP

# 2. 路由是否正确
traceroute 目标IP
ip route get 目标IP

# 3. 端口是否可达
telnet 目标IP 端口
nc -zv 目标IP 端口

# 4. 抓包分析
# 客户端抓包
tcpdump -i eth0 host 目标IP -w client.pcap
# 服务端抓包
tcpdump -i eth0 port 端口 -w server.pcap
```

**可能原因**：
- 防火墙阻断
- 服务未启动
- 路由错误
- NAT 问题
- SYN backlog 满

## 场景 2：TCP 连接失败

```bash
# 查看握手过程
tcpdump -i eth0 host 目标IP -S
```

**常见问题**：
| 阶段 | 问题 | 原因 |
|------|------|------|
| SYN | 无响应 | 防火墙、服务未监听 |
| SYN-ACK | 未到达 | 路由/NAT 问题 |
| ACK | 无响应 | 防火墙、性能问题 |

## 场景 3：HTTP 响应慢

```bash
# 抓取 HTTP 请求响应
tcpdump -i eth0 -A port 80 | grep -E 'HTTP|Host|Content-Length'

# 使用 tshark 提取响应时间
tshark -i eth0 -Y "http.response" -T fields -e http.request.uri -e http.time
```

**可能原因**：
- DNS 解析慢
- SSL 握手慢 (HTTPS)
- 服务端处理慢
- 网络延迟
- 带宽不足

## 场景 4：DNS 解析异常

```bash
# 抓取 DNS 查询
tcpdump -i eth0 -s 0 port 53 -n

# 查看具体查询内容
tcpdump -i eth0 -s 0 port 53 -n -v
```

**常见问题**：
- DNS 服务器不可达
- 缓存污染
- 递归查询超时
- CNAME 循环

## 场景 5：SSL/TLS 问题

```bash
# 抓取 TLS 握手
tcpdump -i eth0 host 目标IP -w tls.pcap

# Wireshark 中配置 SSL 解密
# Edit → Preferences → Protocols → TLS → (设置密钥)
```

**常见问题**：
- 证书过期/无效
- 协议版本不匹配
- 加密套件不兼容
- SNI 问题

## 场景 6：大量 TIME_WAIT

```bash
# 查看状态统计
ss -ant | awk '{print $1}' | sort | uniq -c | sort -rn

# 抓包确认
tcpdump -i eth0 'tcp[tcpflags] & tcp-fin != 0'
```

**优化方案**：
- 开启 `tcp_tw_reuse`
- 调整 `tcp_max_tw_buckets`
- 使用连接池
- HTTP Keep-Alive

## 场景 7：ARP 问题

```bash
# 抓取 ARP 包
tcpdump -i eth0 arp

# 查看 ARP 表
arp -a
ip neigh show
```

**常见问题**：
- ARP 欺骗
- ARP 缓存过期
- 网关配置错误

## 场景 8：网络负载高

```bash
# 统计流量
iftop -i eth0

# 查看连接数
ss -s

# 抓取包大小分布
tcpdump -i eth0 -c 1000 | awk '{print length($0)}' | sort -n | uniq -c

# 统计各 IP 流量
tcpdump -i eth0 -n | awk '{print $3}' | cut -d: -f1 | sort | uniq -c | sort -rn
```

---

# 性能分析

## 关键指标

| 指标 | 含义 | 正常值 |
|------|------|--------|
| RTT | 往返延迟 | < 50ms (同城) |
| Bandwidth-Delay Product | 带宽延迟积 | - |
| Retransmission | 重传率 | < 1% |
| Out-of-Order | 乱序率 | < 1% |

## tcpdump 统计

```bash
# 统计包数量
tcpdump -i eth0 -c 1000 -q

# 统计协议分布
tcpdump -i eth0 -q | awk '{print $5}' | cut -d. -f1 | sort | uniq -c | sort -rn

# 统计 IP 流量
tcpdump -i eth0 -n | awk '{print $3}' | cut -d. -f1-4 | sort | uniq -c | sort -rn | head -20
```

---

# 最佳实践

1. **先抓包再分析** - 不要凭猜测下结论
2. **客户端和服务端同时抓** - 对比分析
3. **过滤条件要精确** - 减少噪音
4. **保存原始 pcap** - 方便回溯分析
5. **注意文件大小** - 大文件用轮转
6. **生产环境谨慎** - 避免影响性能

```bash
# 生产环境推荐用法
tcpdump -i eth0 -w /tmp/capture.pcap -C 50 -W 10 -s 0 &
# -C 50: 每个文件 50MB
# -W 10: 最多 10 个文件轮转
# -s 0: 抓完整包
```

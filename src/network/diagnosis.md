---
title: 网络诊断工具
---

# 网络诊断工具

## ping - 连通性测试

```bash
# 基本用法
ping 8.8.8.8
ping example.com

# 指定次数
ping -c 4 8.8.8.8

# 指定间隔
ping -i 2 8.8.8.8

# 记录路由
ping -R 8.8.8.8
```

**TTL 含义**：
- TTL=64：Linux/Mac
- TTL=128：Windows
- TTL=255：网络设备

## traceroute/tracert - 路由追踪

```bash
# Linux
traceroute 8.8.8.8
traceroute -I 8.8.8.8  # 使用 ICMP

# Windows
tracert 8.8.8.8

# 跳过 DNS 解析
traceroute -n 8.8.8.8

# 指定最大跳数
traceroute -m 15 8.8.8.8
```

## netstat - 网络状态

```bash
# 查看所有连接
netstat -an

# 查看监听端口
netstat -tuln

# 查看进程关联
netstat -tulnp

# 查看路由表
netstat -rn

# 查看网卡统计
netstat -i

# 查看 TCP 连接
netstat -tn
```

## ss - Socket 统计

```bash
# 查看监听端口
ss -tuln

# 查看 TCP 连接
ss -tn

# 查看进程关联
ss -tnp

# 查看详细统计
ss -s

# 过滤状态
ss -tn state established
```

## telnet - 端口测试

```bash
# 测试端口连通性
telnet 192.168.1.1 80

# SMTP 测试
telnet mail.example.com 25
```

## nc (netcat) - 网络瑞士军刀

```bash
# 端口扫描
nc -zv 192.168.1.1 1-1000

# 简单聊天
nc -l 9999        # 服务端
nc 192.168.1.1 9999  # 客户端

# 文件传输
nc -l 9999 < file.txt    # 发送
nc 192.168.1.1 9999 > file.txt  # 接收
```

## curl - HTTP 请求

```bash
# GET 请求
curl https://example.com

# 显示头部
curl -I https://example.com

# POST 请求
curl -X POST -d "data" https://example.com

# 带认证
curl -u user:pass https://example.com

# 保存响应
curl -o filename https://example.com
```

## mtr - 网络诊断组合

```bash
# 实时路由追踪
mtr 8.8.8.8

# 生成报告
mtr -r -c 10 8.8.8.8
```

## ip - IP 命令

```bash
# 查看 IP 地址
ip addr

# 查看路由表
ip route

# 查看网卡状态
ip link

# 添加 IP
ip addr add 192.168.1.100/24 dev eth0
```

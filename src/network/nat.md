---
title: NAT 与 ACL
---

# NAT (网络地址转换)

## 类型

| 类型 | 描述 |
|------|------|
| 静态 NAT | 1:1 映射，固定公网 IP |
| 动态 NAT | 池中分配，1:1 映射 |
| PAT | 端口地址转换，多:1 (最常用) |

## 原理

```
内网主机 (192.168.1.100:8080) 
    ↓ 发起请求
NAT 设备 (公网 IP:1.1.1.1:10000)
    ↓ 转发
目标服务器
    ↓ 响应
NAT 设备 → 内网主机
```

## iptables NAT

```bash
# 开启 IP 转发
echo 1 > /proc/sys/net/ipv4/ip_forward

# SNAT (源地址转换)
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -j MASQUERADE

# DNAT (目的地址转换)
iptables -t nat -A PREROUTING -d 1.1.1.1 -p tcp --dport 80 -j DNAT --to-destination 192.168.1.100:80

# 查看 NAT 表
iptables -t nat -L -n -v
```

## 端口映射

```bash
# 映射内网 Web 服务
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.1.10:80

# 映射 SSH
iptables -t nat -A PREROUTING -p tcp --dport 2222 -j DNAT --to-destination 192.168.1.10:22
```

---

# ACL (访问控制列表)

## 常见场景

```bash
# 禁止特定 IP 访问 80 端口
iptables -A INPUT -p tcp -s 192.168.1.100 --dport 80 -j DROP

# 仅允许特定网段
iptables -A INPUT -p tcp -s 192.168.1.0/24 --dport 22 -j ACCEPT

# 禁止 ping
iptables -A INPUT -p icmp --icmp-type echo-request -j DROP

# 限制连接数 (防 CC)
iptables -A INPUT -p tcp --dport 80 -m connlimit --connlimit-above 20 -j DROP

# 端口白名单
iptables -A INPUT -p tcp --dport 8080 -s 10.0.0.0/8 -j ACCEPT
```

## 常用参数

```
-A   追加规则
-I   插入规则
-D   删除规则
-L   列出规则
-n   数字显示
-v   详细信息
-t   指定表 (filter/nat/mangle)
-j   跳转目标 (ACCEPT/DROP/REJECT/LOG)
-p   协议 (tcp/udp/icmp)
-s   源地址
-d   目的地址
--dport  目的端口
--sport  源端口
```
